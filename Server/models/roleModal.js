const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
});

const Roles = mongoose.model("roles", roleSchema);

module.exports = Roles;
