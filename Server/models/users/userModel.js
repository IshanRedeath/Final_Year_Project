const mongoose = require("mongoose");
const validator = require("validator");
const AppError = require("../../utils/AppError");
const Employee = require("../employeeModel");
const Doctor = require("../doctorModel");
const bcrypt = require("bcryptjs");
// const slugify = require("slugify");

const userSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        unique: [true, "User_ID not valid, please check again"],
        index: { unique: true },
        required: true,
      },
      id: {
        type: String,
        required: true,
        unique: [true, "User ID not valid, please check again"],
        index: { unique: true },
        minlength: 6,
      },
      fullname: {
        type: String,
        required: true,
        minlength: 2,
      },
    },

    username: {
      type: String,
      required: true,
      unique: [true, "Username not available, try a different one"],
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email not available, try a different one"],
      index: { unique: true },
      lowercase: true,
      validate: [validator.isEmail, "Please provide an valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    roles: {
      type: [String],
      required: true,
      // enum: ["admin", "doctor", "employee"],
    },
    pictureUrl: { type: String },

    deletedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    lastLogin: { type: Date },

    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    passwordChangedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

//DOCUMENT MIDDLEWARE
userSchema.post("save", async function (doc, next) {
  await Promise.all([
    Employee.findByIdAndUpdate(doc.user._id, {
      userId: doc._id,
    }),
    Doctor.findByIdAndUpdate(doc.user._id, { userId: doc._id }),
  ]);

  next();
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified, skip the hashing

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

//QUERY MIDDLEWARE
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate(); // Get the update data
  if (!update || !update.user) return next(); // Skip if no user update

  Object.entries(update).forEach(([key, value]) => {
    if (value === "") {
      delete update[key]; // Remove empty fields
    }
  });
  //DOES not allow to change the employee or doctor ids
  const user = await this.model.findById(this.getQuery()._id).select("user");

  if (user && user.user.id !== update.user.id) {
    return next(new AppError("User employee ID cannot be changed", 400));
  }

  next();
});

//update the doctor's or employee's userId as null when the user is deleted
userSchema.post(
  ["deleteOne", "findOneAndDelete", "findByIdAndDelete"],
  async function () {
    const userId = this.getQuery()._id;

    await Promise.all([
      Employee.findOneAndUpdate({ userId }, { $unset: { userId: "" } }),
      Doctor.findOneAndUpdate({ userId }, { $unset: { userId: "" } }),
    ]);
  }
);

// //donit send password in response
// userSchema.pre(["find", "findOne"], function (next) {
//   this.select("-password");
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
