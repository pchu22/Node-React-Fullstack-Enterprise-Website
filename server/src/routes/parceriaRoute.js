const express = require("express");
const router = express.Router();

const parceriaController = require("../controllers/parceriaController");

router.get("/list", parceriaController.list);
router.get("/get/:parceriaId", parceriaController.get);
router.post("/create", parceriaController.create);
router.put("/update/:parceriaId", parceriaController.update);
router.post("/delete", parceriaController.delete);

module.exports = router;