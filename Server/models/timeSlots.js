const mongoose = require("mongoose");
//const validator = require("validator");

const timeSlotsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Time slot name is required"],
  },
  dayOfWeek: {
    type: String,
    required: [true, "Day of week is required"],
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
    required: [true, "Start time is required"],
    validate: {
      validator: function (value) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // HH:mm format validation
      },
      message: "Start time must be in HH:mm format (24-hour)",
    },
  },
});

const TimeSlots = mongoose.model("TimeSlots", timeSlotsSchema);

module.exports = TimeSlots;
