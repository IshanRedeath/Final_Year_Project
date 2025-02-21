const Roles = require("../models/roleModal");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json({
      status: "success",
      results: roles.length,
      data: roles,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.getRolesNames = async (req, res) => {
  try {
    const roles = await Roles.find({}, "roleId name");
    res.status(200).json({
      status: "success",
      results: roles.length,
      data: roles,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};
