const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema();

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
