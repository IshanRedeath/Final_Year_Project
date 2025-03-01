const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
const Test = mongoose.model("Test", testSchema);

module.exports = Test;
