const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema(
  {
    docId: { unique: true, type: String, required: true, maxlength: 7 },
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
    specialization: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Specialization",
          required: true,
        },
        name: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    experience: {
      type: String,
    },
    qualification: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      maxlength: 150,
    },
    timeSlots: [
      {
        timeSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" },
        dayOfWeek: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        startTime: {
          type: String,
          required: true,
        },
      },
    ],
    availability: [
      {
        type: Date,
      },
    ],
    isApproved: {
      type: String,
      default: "pending",
      enum: ["approved", "pending", "rejected"],
    },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    deletedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
