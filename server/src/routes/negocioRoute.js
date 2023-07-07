const express = require("express");
const router = express.Router();

const negocioController = require("../controllers/negocioController");

router.get("/list", negocioController.list);
router.get("/get/:negocioId", negocioController.get);
router.post("/create", negocioController.create);
router.put("/update/:negocioId", negocioController.update);
router.post("/delete", negocioController.delete);

module.exports = router;