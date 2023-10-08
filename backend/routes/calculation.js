const express = require("express");
const router = express.Router();
const calculationController = require("../controllers/calculation");

// Authentication routes
router.post("/add", calculationController.add);
router.post("/difference", calculationController.subtract);
router.post("/multiplication", calculationController.multiply);
router.post("/division", calculationController.divide);
router.get("/data", calculationController.calculationData);

module.exports = router;
