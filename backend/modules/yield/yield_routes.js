const express = require("express");
const router = express.Router();
const yieldController = require("./yield_controller");

// GET /yields
router.get("/", yieldController.getYields);

module.exports = router;
