const mongoose = require("mongoose");
const validator = require("validator");

// const slugify = require("slugify");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    required: true,
    unique: true,
    minlength: 6,
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
  lastLogin: { type: Date },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
