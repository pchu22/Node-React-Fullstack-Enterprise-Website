const express = require("express");
const router = express.Router();

const eventoController = require("../controllers/eventosController");

router.get("/list", eventoController.list);
router.get("/get/:eventoId", eventoController.get);
router.post("/create", eventoController.create);
router.put("/update/:eventoId", eventoController.update);
router.post("/delete", eventoController.delete);

module.exports = router;