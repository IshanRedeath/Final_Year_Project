const User = require("../models/users/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Employee = require("../models/employeeModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ "user.id": req.params.id }).select(
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
  // if (!req.body.userId) {
  //   const counter = await Counter.findByIdAndUpdate(
  //     // incrementing the counter for userId generation.
  //     "67c09c3b695f1828a9174e9b",
  //     { $inc: { seq: 1 } },
  //     { new: true, upsert: true }
  //   );
  //   req.body.userId = `EM${counter.seq.toString()}`;
  // }
  const person = await Employee.findOne({ empId: req.body.user.id });
  if (person) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
      message: "User created successfully",
    });
  } else {
    return next(
      new AppError(`No employee found with ID, ${req.body.user.id}`, 404)
    );
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let user;
  //Array class with isArray method to check whether the id is an array
  if (typeof id === "object" || Array.isArray(id)) {
    console.log("hello world 1");
    user = await User.deleteMany({ _id: { $in: id } }); //$in to check whether the id is 'IN' the array
  } else if (id.length === 7) {
    console.log("hello world 2");
    user = await User.findOneAndDelete({ "user.id": id }); // for 'EM1001' format id
  } else {
    console.log("hello world 3");
    user = await User.findByIdAndDelete(id); // for mongoDb generated objectId
  }

  if (!user) {
    return next(new AppError(`No user found with ID, ${id}`, 404));
  }
  console.log("User deleted successfully");
  res.status(204).json({
    status: "success",
    message: "User deleted successfully",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // remove empty string values from req.body for prevent errors in validation while patching.
  Object.entries(req.body).forEach(([key, value]) =>
    value === "" ? delete req.body[key] : null
  );

  const user = await User.findOneAndUpdate(
    { "user.id": req.params.id },
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
