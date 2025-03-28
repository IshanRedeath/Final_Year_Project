const Doctor = require("../models/doctorModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    status: "success",
    results: doctors.length,
    data: doctors,
  });
});

exports.postDoctor = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);
  res.status(201).json({
    status: "success",
    data: newDoctor,
    message: "Doctor created successfully",
  });
});
