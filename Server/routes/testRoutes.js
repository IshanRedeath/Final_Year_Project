const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/", testController.uploadImage, testController.postTestUsers);
module.exports = router;
