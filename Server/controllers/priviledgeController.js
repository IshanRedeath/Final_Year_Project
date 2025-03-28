const Priviledge = require("../models/priviledgesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");
//const catchAsync = require("../utils/catchAsync");

const handlerFactory = require("./handlerFactory");

exports.getPriviledge = handlerFactory.getOne(Priviledge);
exports.getAllPriviledges = handlerFactory.getAll(Priviledge);
exports.postPriviledge = handlerFactory.createOne(Priviledge);
exports.deletePriviledge = handlerFactory.softDeleteOne(Priviledge);
exports.updatePriviledge = handlerFactory.updateOne(Priviledge);

exports.getPriviledgeView = catchAsync(async (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json({ status: "fail", message: "No ID provided" });
  }
  let ids = req.query.id.split(",");
  ids = ids.map((id) => new mongoose.Types.ObjectId(id)); // Convert to ObjectId array

  const doc = await Priviledge.aggregate([
    { $match: { _id: { $in: ids } } }, // Correct format for id
    {
      $unwind: "$permissions",
    },
    {
      $project: {
        _id: 0,
        Role: "$role",
        Module: "$permissions.module",
        Priviledges: "$permissions.priviledges",
        "Created Date": {
          $dateToString: { format: "%Y-%m-%d %H:%M ", date: "$createdAt" },
        },
      },
    },
  ]);
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    length: doc.length,

    data: doc,
  });
});

// exports.getAllPriviledges = catchAsync(async (req, res) => {
//   const priviledges = await Priviledge.aggregate([
//     { $match: { deletedAt: { $eq: null } } },
//     {
//       $project: {
//         _id: 1,
//         role: 1,
//         permissions: { $objectToArray: "$permissions" }, // Convert permissions object to array
//         createdAt: 1,
//       },
//     },
//     {
//       $unwind: "$permissions",
//     },
//   ]);
// });
