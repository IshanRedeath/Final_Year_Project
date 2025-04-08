const User = require("../models/users/userModel");
const Patient = require("../models/users/patientUserModel");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

const handlerFactory = require("./handlerFactory");

exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
exports.postUser = handlerFactory.createOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.getUserView = catchAsync(async (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ status: "fail", message: "No ID provided" });
  }
  let ids = req.query.id.split(",");

  ids = ids.map((id) => new mongoose.Types.ObjectId(id)); // Convert to ObjectId array
  const view = await User.aggregate([
    { $match: { _id: { $in: ids } } },
    {
      $project: {
        _id: 0,
        Id: "$user.id",
        Full_Name: "$user.fullname",
        Username: "$username",
        Email: "$email",
        Roles: "$roles",
        Status: "$status",
        Registered_Date: {
          $dateToString: { format: "%Y-%m-%d %H:%M ", date: "$createdAt" },
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    results: view.length,
    data: view,
  });
});

exports.getPatient = handlerFactory.getOne(Patient);
exports.deletePatient = handlerFactory.deleteOne(Patient);
