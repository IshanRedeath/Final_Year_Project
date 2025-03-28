const express = require("express");
const doctorController = require("../controllers/doctorController");

const router = express.Router();

router
  .route("/")
  .get(doctorController.getAllDoctors)
  .post(doctorController.postDoctor);

module.exports = router;
