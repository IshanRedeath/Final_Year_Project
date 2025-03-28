const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/active", employeeController.getDoctorsEmployeeNames);

module.exports = router;
