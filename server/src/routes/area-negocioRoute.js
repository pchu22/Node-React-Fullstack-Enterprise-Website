const express = require("express");
const router = express.Router();

const areaNegocioController = require("../controllers/area-negocioController");

router.get("/list", areaNegocioController.list);
router.get("/get/:areaNegocioId", areaNegocioController.get);
router.post("/create", areaNegocioController.create);
router.put("/update/:areaNegocioId", areaNegocioController.update);
router.post("/delete", areaNegocioController.delete);

module.exports = router;