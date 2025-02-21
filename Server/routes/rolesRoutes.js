const express = require("express");
const rolesController = require("../controllers/rolesController");
const router = express.Router();

router.get("/", rolesController.getAllRoles);
router.get("/names", rolesController.getRolesNames);
module.exports = router;
