const monggose = require("mongoose");

const specializationSchema = new monggose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Specialization name already exists, please check again"],
  },
  desc: {
    type: String,
    required: true,
  },
});

const Specialization = monggose.model("Specialization", specializationSchema);

module.exports = Specialization;
