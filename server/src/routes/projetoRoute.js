const express = require("express");
const router = express.Router();

const projetoController = require("../controllers/projetoController");

router.get("/list", projetoController.list);
router.get("/get/:projetoId", projetoController.get);
router.post("/create", projetoController.create);
router.put("/update/:projetoId", projetoController.update);
router.post("/delete", projetoController.delete);

module.exports = router;
