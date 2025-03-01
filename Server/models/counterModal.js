const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 1002 }, // Starting value
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
