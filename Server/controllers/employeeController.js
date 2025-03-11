const Employee = require("../models/employeeModel");
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
