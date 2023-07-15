const express = require("express");
const router = express.Router();
const passport = require('passport');

const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/primeiroLogin/:userId", AuthController.updatePasswordPrimeiroLogin);
router.post('/ativacao/:verificationToken', AuthController.verificarEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password/:recoverToken', AuthController.mudarPassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect',passport.authenticate('google'), AuthController.googleLegoin);

module.exports = router;
