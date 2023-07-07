const express = require("express");
const router = express.Router();

const tipoProjetoController = require("../controllers/tipo-projetoController");

router.get("/list", tipoProjetoController.list);
router.get("/get/:tipoProjetoId", tipoProjetoController.get);
router.post("/create", tipoProjetoController.create);
router.put("/update/:tipoProjetoId", tipoProjetoController.update);
router.post("/delete", tipoProjetoController.delete);

module.exports = router;