//const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
// /const AppError = require("../utils/AppError");
//const Patient = require("../models/patientModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/users/userModel");
const PatientUser = require("../models/users/patientUserModel");
const Priviledge = require("../models/priviledgesModel");
const validator = require("validator");

const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.patientSignup = catchAsync(async (req, res) => {
  const patient = await PatientUser.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    mobileNo: req.body.mobileNo,
  });
  const token = signToken(patient._id);
  res.status(201).json({
    status: "success",
    token,
    data: patient,
  });
});

exports.patientLogin = catchAsync(async (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return next(
      new AppError("Please provide email/mobile_no and password", 400)
    );
  }
  const isEmail = validator.isEmail(login);
  const query = isEmail ? { email: login } : { mobileNo: login };
  const patient = await PatientUser.findOne(query).select("+password");

  if (
    !patient ||
    !(await patient.correctPassword(password, patient.password))
  ) {
    return next(new AppError("Incorrect email / mobileno or password", 401));
  }
  const token = signToken(patient._id);
  res.status(200).json({
    status: "success",
    token,
    data: patient,
  });
});

exports.userLogin = catchAsync(async (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return next(
      new AppError("Please provide email or username and password", 400)
    );
  }
  const isEmail = validator.isEmail(login);
  const query = isEmail ? { email: login } : { username: login };
  const user = await User.findOne(query).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email/username or password", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});

// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return next(
//       new AppError("You are not Logged in! Please Login to get access", 401)
//     );
//   }
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await PatientUser.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no longer exists", 401)
//     );
//   }
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please login again", 401)
//     );
//   }
//   req.user = currentUser;

//   next();
// });

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not Logged in! Please Login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Try finding the user in either `PatientUser` or `User` model
  let currentUser;
  // try {
  //   currentUser = await Promise.all([
  //     PatientUser.findById(decoded.id),
  //     User.findById(decoded.id),
  //   ]);
  // } catch (error) {
  //   return next(new AppError("User not found", 401));
  // }
  currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    currentUser = await PatientUser.findById(decoded.id);
  }

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  if (
    currentUser.changedPasswordAfter &&
    currentUser.changedPasswordAfter(decoded.iat)
  ) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }

  // Check if privileges are cached

  req.user = currentUser;

  next();
});

exports.authorize = (module, permission) => {
  return async (req, res, next) => {
    console.log(req.user.roles);
    const results = await Priviledge.aggregate([
      { $unwind: "$permissions" }, // Flatten the permissions array
      {
        $match: {
          "permissions.module": module,
          "permissions.priviledges": { $in: [permission] },
        },
      },
      {
        $group: {
          _id: null,
          roles: { $addToSet: "$role" }, // Collect unique roles
        },
      },
      {
        $project: { _id: 0, roles: 1 }, // Remove _id from output
      },
    ]);

    const roles = results.length > 0 ? results[0].roles : [];
    console.log(roles);
    if (!roles.some((role) => req.user.roles.includes(role))) {
      return next(
        new AppError("You are not authorized to access this route", 403)
      );
    }
    // req.user.roles.forEach(() => {});
    // const priviledge = await Priviledge.findOne({ role: req.user.role });
    // if (!priviledge) {
    //   return next(
    //     new AppError("You are not authorized to access this route", 403)
    //   );
    // }
    next();
  };
};
