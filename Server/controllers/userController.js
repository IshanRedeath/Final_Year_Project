const User = require("../models/users/userModel");
const Counter = require("../models/counterModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.id }).select(
    "-password"
  );
  if (!user) {
    return next(new AppError(`No user found with ID, ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.postUser = catchAsync(async (req, res, next) => {
  if (!req.body.userId) {
    const counter = await Counter.findByIdAndUpdate(
      // incrementing the counter for userId generation.
      "67c09c3b695f1828a9174e9b",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    req.body.userId = `EM${counter.seq.toString()}`;
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
    message: "User created successfully",
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let user;
  if (id.length === 6) {
    user = await User.findOneAndDelete({ userId: id }); // for 'EM1001' format id
  } else {
    user = await User.findByIdAndDelete(id); // for mongoDb generated objectId
  }

  if (!user) {
    return next(new AppError(`No user found with ID, ${id}`, 404));
  }
  console.log("User deleted successfully");
  res.status(200).json({
    status: "success",
    data: null,
    message: "User deleted successfully",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // remove empty string values from req.body for prevent errors in validation while patching.
  Object.entries(req.body).forEach(([key, value]) =>
    value === "" ? delete req.body[key] : null
  );

  const user = await User.findOneAndUpdate(
    { userId: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new AppError(`No user found with ID, ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
    message: "User updated successfully",
  });
});
