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

//google authentication
router.get('/google', passport.authenticate('google', {
    scope: ["profile", "email"]
}))

//google callback function to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user)
})
module.exports = router;
