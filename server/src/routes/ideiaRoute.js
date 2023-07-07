const express = require("express");
const router = express.Router();

const ideiaController = require("../controllers/ideiaController");

router.get("/list", ideiaController.list);
router.get("/get/:ideiaId", ideiaController.get);
router.post("/create", ideiaController.create);
router.put("/update/:ideiaId", ideiaController.update);
router.post("/delete", ideiaController.delete);

module.exports = router;