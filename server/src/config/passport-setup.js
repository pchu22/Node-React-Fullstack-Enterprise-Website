const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./secret');
const User = require('../models/user');
const crypto = require('crypto');

function generateRandomPassword(length) {
    var pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    var password = "";

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * pool.length);
        password += pool.charAt(randomIndex);
    }

    return password;
}

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy(
    {
        // Options for the Google strategy
        callbackURL: 'http://softinsa-web-app-carreiras01.onrender.com/auth/google/redirect',
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        scope: ['profile', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ where: { googleId: profile.id } })
            .then(existingUser => {
                if (existingUser) {
                    done(null, { success: true, message: existingUser });
                } else {
                    User.findOne({ where: { email: profile.emails[0].value } })
                        .then(async userWithEmail => {
                            if (userWithEmail && userWithEmail.googleId === null) {
                                const authError = new Error('Este email já está associado a uma conta Softinsa!');
                                authError.status = 401;
                                done(authError);
                            } else {
                                const randomPassword = generateRandomPassword(12);

                                const newUser = new User({
                                    googleId: profile.id,
                                    primeiroNome: profile.givenName,
                                    ultimoNome: profile.familyName,
                                    email: profile.emails[0].value,
                                    password: randomPassword,
                                    googleId: googleId,
                                    isAtivo: true,
                                    isPrimeiroLogin: false,
                                    cargoId: 5
                                });
                                newUser.save().then(user => {
                                    done(null, newUser, {
                                        message: {
                                            userId: user.userId,
                                            primeiroNome: primeiroNome,
                                            ultimoNome: ultimoNome,
                                            email: user.email,
                                            cargoId: user.cargoId,
                                        }
                                    });
                                }).catch(err => done(err));
                            }
                        }).catch(err => done(err));
                }
            }).catch(err => done(err));
    })
);



