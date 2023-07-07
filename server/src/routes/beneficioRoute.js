const express = require("express");
const router = express.Router();

const beneficioController = require("../controllers/beneficioController");

router.get("/list", beneficioController.list);
router.get("/get/:beneficioId", beneficioController.get);
router.post("/create", beneficioController.create);
router.put("/update/:beneficioId", beneficioController.update);
router.post("/delete", beneficioController.delete);

module.exports = router;