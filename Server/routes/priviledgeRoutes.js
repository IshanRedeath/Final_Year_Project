const express = require("express");
const router = express.Router();
const priviledgeController = require("../controllers/priviledgeController");

router
  .route("/")
  .get(priviledgeController.getAllPriviledges)
  .post(priviledgeController.postPriviledge);

router.route("/view").get(priviledgeController.getPriviledgeView);
router
  .route("/:id")
  .get(priviledgeController.getPriviledge)
  .delete(priviledgeController.deletePriviledge)
  .patch(priviledgeController.updatePriviledge)
  .put(priviledgeController.updatePriviledge);

module.exports = router;
