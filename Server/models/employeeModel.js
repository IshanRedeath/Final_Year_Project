const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  status: { type: String, required: true },
  fullname: { type: String, required: true, maxlength: 45 },
  empId: { type: String, required: true, unique: true, maxlength: 8 },
  callingName: { type: String, required: true, maxlength: 45 },
  nic: { type: String, required: true, unique: true, maxlength: 12 },
  mobileNo: { type: String, required: true, maxlength: 10 },
  landNo: { type: String, maxlength: 10 },
  email: { type: String, required: true, unique: true, maxlength: 150 },
  address: { type: String, required: true },
  note: { type: String },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
