const express = require("express");
const router = express.Router();

const FilialController = require("../controllers/filialController");

router.get("/list", FilialController.list);
router.get("/get/:filialId", FilialController.get);
router.post("/create", FilialController.create);
router.put("/update/:filialId", FilialController.update);
router.post("/delete", FilialController.delete);

module.exports = router;
