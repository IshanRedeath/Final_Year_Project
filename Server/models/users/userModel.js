const mongoose = require("mongoose");
const validator = require("validator");

// const slugify = require("slugify");

const userSchema = new mongoose.Schema({
  user: {
    id: {
      type: String,
      required: true,
      unique: true,
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
    unique: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: { unique: true },
    lowercase: true,
    validate: [validator.isEmail, "Please provide an valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  roles: {
    type: Array,
    required: true,
  },
  pictureUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date },
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
