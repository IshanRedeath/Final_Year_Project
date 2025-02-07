const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
//router.post("/image", upload.single("photo"), userController.postImage);
module.exports = router;
