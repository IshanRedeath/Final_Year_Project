const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  username: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,

    required: true,
  },
  pictureUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
