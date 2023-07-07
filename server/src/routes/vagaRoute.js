const express = require("express");
const router = express.Router();

const vagaController = require("../controllers/vagaController");

router.get("/list", vagaController.list);
router.get("/get/:vagaId", vagaController.get);
router.post("/create", vagaController.create);
router.put("/update/:vagaId", vagaController.update);
router.post("/delete", vagaController.delete);

module.exports = router;