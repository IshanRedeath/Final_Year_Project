const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(
    //authController.protect,
    //authController.authorize("Doctors", "read"),
    userController.getAllUsers
  )
  .post(userController.postUser);
router.route("/login").post(authController.userLogin);
router.route("/patientlogin").post(authController.patientLogin);
router
  .route("/patient/:id")
  .get(userController.getPatient)
  .delete(userController.deletePatient);
router.route("/signup").post(authController.patientSignup);
router.route("/view").get(userController.getUserView);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser)
  .patch(userController.updateUser);

//router.post("/image", upload.single("photo"), userController.postImage);

module.exports = router;
