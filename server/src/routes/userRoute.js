const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/list", userController.list);
router.get("/get/:userId", userController.get);
router.post("/create", userController.create);
router.put("/update/:userId", userController.update);
router.post("/delete", userController.delete);
router.put("/deactivate/:userId", userController.deactivate);
router.put("/activate/:userId", userController.activate);

module.exports = router;