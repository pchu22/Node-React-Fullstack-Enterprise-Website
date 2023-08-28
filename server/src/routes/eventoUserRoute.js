const express = require("express");
const router = express.Router();

const eventoUserController = require("../controllers/eventoUserController");

router.get("/list", eventoUserController.list);
router.get("/get/:eventoId", eventoUserController.get);
router.post("/create", eventoUserController.create);
router.post("/delete", eventoUserController.delete);
router.post("/deleteUserEvento", eventoUserController.deleteUserEvento);

module.exports = router;