const Employee = require("../models/employeeModel");
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: {
        employees,
      },
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
      "emp_no fullname -_id"
    );
    res.status(200).json({
      status: "success",
      results: employeeNames.length,
      data: {
        employeeNames,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error!",
    });
  }
};
