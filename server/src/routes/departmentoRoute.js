const express = require("express");
const router = express.Router();

const DepartamentoController = require("../controllers/departamentoController");

router.get("/list", DepartamentoController.list);
router.get("/get/:departamentoId", DepartamentoController.get);
router.post("/create", DepartamentoController.create);
router.put("/update/:departamentoId", DepartamentoController.update);
router.post("/delete", DepartamentoController.delete);

module.exports = router;
