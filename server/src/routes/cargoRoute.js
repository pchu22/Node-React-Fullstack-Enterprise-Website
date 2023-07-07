const express = require("express");
const router = express.Router();

const CargoController = require("../controllers/cargoController");

router.get("/list", CargoController.list);

module.exports = router;
