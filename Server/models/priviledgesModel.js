const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

const priviledgeSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        module: {
          type: String,
          required: true,
        },
        priviledges: {
          type: [String],
          required: true,
          enum: ["create", "read", "update", "delete"],
        },
      },
    ],
    deletedAt: {
      type: Date,
      default: null, // Soft delete field
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // Automatically adds `createdAt` & `updatedAt`
);
// Add a compound index to ensure that each role can only have one unique module
priviledgeSchema.pre("validate", function (next) {
  const permisArray = this.permissions.map((permission) => permission.module);

  const isDuplicated = Object.values(
    permisArray.reduce(
      (acc, item) => ((acc[item] = (acc[item] || 0) + 1), acc),
      {}
    )
  ).some((count) => count > 1);
  if (isDuplicated) {
    next(new AppError("Each role can only have one unique module", 400));
  }
  next();
});
priviledgeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.permissions) return next(); // Skip validation if permissions are not being updated

  const permisArray = update.permissions.map((permission) => permission.module);

  const isDuplicated = Object.values(
    permisArray.reduce(
      (acc, item) => ((acc[item] = (acc[item] || 0) + 1), acc),
      {}
    )
  ).some((count) => count > 1);

  if (isDuplicated) {
    return next(new AppError("Each role can only have one unique module", 400));
  }

  next();
});

// Uncomment this if you want to enforce soft delete filtering globally on queries
priviledgeSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $eq: null } });
  next();
});

const Priviledge = mongoose.model("Priviledge", priviledgeSchema);
module.exports = Priviledge;
