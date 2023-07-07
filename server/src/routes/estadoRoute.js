const express = require("express");
const router = express.Router();

const estadoController = require("../controllers/estadoController");

router.get("/list", estadoController.list);

module.exports = router;
