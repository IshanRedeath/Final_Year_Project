const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,

    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  mobileNo: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  fee: {
    type: Number,
    required: true,
    maxlength: 5,
    minlength: 3,
  },
  specialization: {
    type: Array,
    required: true,
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    maxlength: 50,
  },
  availability: [
    {
      type: Date,
      required: true,
    },
  ],
  isApproved: {
    type: String,
    default: "pending",
    enum: ["approved", "pending", "rejected"],
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date },
  deletedAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
