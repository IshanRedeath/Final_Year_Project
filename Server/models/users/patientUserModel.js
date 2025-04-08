const mongoose = require("mongoose");
const validator = require("validator");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcryptjs");

const patientUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username not available, try a different one"],
      index: { unique: true },
    },

    email: {
      type: String,
      unique: [true, "Email already exists"],
      index: { sparse: true, unique: true },
      sparse: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide an valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    mobileNo: {
      type: String,
      unique: [true, "Mobile Number already exists"],
      index: { sparse: true, unique: true },
      sparse: true,
      minlength: 10,
      maxlength: 10,
    },
    roles: {
      type: [String],
      default: "patient",
    },
    passwordChangedAt: { type: Date, default: Date.now() },

    pictureUrl: { type: String },
    deletedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
patientUserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

patientUserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

patientUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

patientUserSchema.pre("validate", function (next) {
  if (!(this.email || this.mobileNo)) {
    return next(new AppError("Either Email or Mobile Number required", 400));
  }
  next();
});

const PatientUser = mongoose.model("PatientUser", patientUserSchema);

module.exports = PatientUser;
