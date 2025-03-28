const Employee = require("../models/employeeModel");
const Doctor = require("../models/doctorModel");
const catchAsync = require("../utils/catchAsync");
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: employees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error!",
    });
  }
};

exports.getActiveEmployeeNames = async (req, res) => {
  try {
    const employeeNames = await Employee.find(
      {
        status: "Active",
        isUser: false,
      },
      "empId fullname -_id"
    );
    const transformedEmployees = employeeNames.map((emp) => ({
      id: emp.empId, // Rename empId to id
      fullname: emp.fullname,
    }));
    res.status(200).json({
      status: "success",
      results: employeeNames.length,
      data: transformedEmployees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error!",
    });
  }
};

exports.getDoctorsEmployeeNames = catchAsync(async (req, res, next) => {
  // Fetch doctors and employees in parallel for better performance
  const [doctors, employees] = await Promise.all([
    Doctor.find({ isApproved: "approved", userId: { $exists: false } }).select(
      "docId fullname _id"
    ),
    Employee.find({ status: "Active", userId: { $exists: false } }).select(
      "empId fullname _id"
    ),
  ]);
  const transformedDoctors = doctors.map((doc) => ({
    _id: doc._id,
    id: doc.docId,
    fullname: doc.fullname,
  }));
  const transformedEmployees = employees.map((emp) => ({
    _id: emp._id,
    id: emp.empId,

    fullname: emp.fullname,
  }));

  res.status(200).json({
    status: "success",
    results: doctors.length + employees.length,
    data: [...transformedEmployees, ...transformedDoctors],
  });
});
