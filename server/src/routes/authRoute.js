const express = require("express");
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');

const AuthController = require("../controllers/authController");

function generateToken() {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
}

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/primeiroLogin/:userId", AuthController.updatePasswordPrimeiroLogin);
router.post('/ativacao/:verificationToken', AuthController.verificarEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password/:recoverToken', AuthController.mudarPassword);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { prompt: 'select_account', session: false }),
    (req, res) => {
        res.redirect('/homepage');
    }
);

module.exports = router;
