const express = require("express");
const router = express.Router();

const candidaturaController = require("../controllers/candidaturaController");

router.get("/list", candidaturaController.list);
router.get("/get/:candidaturaId", candidaturaController.get);
router.post("/create", candidaturaController.candidatar);
router.put("/update/:candidaturaId", candidaturaController.update);
router.post("/delete", candidaturaController.delete);
router.get('/candidatura/check-existence/:vagaId/:userId', candidaturaController.checkExistence);

module.exports = router;