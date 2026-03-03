const express = require("express");
const router = express.Router();
const modulLayananController = require("../controllers/modulLayananController");

router.get("/", modulLayananController.getAllModulLayanan);
router.get("/simple", modulLayananController.getAllModulLayananSimple);
router.get("/:id", modulLayananController.getModulLayananById);

module.exports = router;
