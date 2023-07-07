const express = require("express");
const router = express.Router();

const investimentoController = require("../controllers/investimentoController");

router.get("/list", investimentoController.list);
router.get("/get/:investimentoId", investimentoController.get);
router.post("/create", investimentoController.create);
router.put("/update/:investimentoId", investimentoController.update);
router.post("/delete", investimentoController.delete);

module.exports = router;