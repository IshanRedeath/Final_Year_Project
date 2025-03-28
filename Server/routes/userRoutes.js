const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").get(userController.getAllUsers).post(userController.postUser);
router.route("/view").get(userController.getUserView);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser)
  .patch(userController.updateUser);
//router.post("/image", upload.single("photo"), userController.postImage);

module.exports = router;
