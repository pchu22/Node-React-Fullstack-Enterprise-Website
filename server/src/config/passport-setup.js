const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./secret');
const User = require('../models/user');

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
    done(null, user.userId);
});

passport.deserializeUser(function (userId, done) {
    User.findById(userId).then((user) => {
        done(null, user);
    }); 
});


passport.use(new GoogleStrategy(
    {
        callbackURL: 'http://softinsa-web-app-carreiras01.onrender.com/auth/google/redirect',
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            console.log("Google ID:", profile.id);

            const existingUser = await User.findOne({ where: { googleId: profile.id } });

            if (existingUser) {
                done(null, { success: true, message: existingUser });
            } else {
                const userWithEmail = await User.findOne({ where: { email: profile.emails[0].value } });

                if (userWithEmail && userWithEmail.googleId === null) {
                    const authError = new Error('Este email já está associado a uma conta Softinsa!');
                    authError.status = 401;
                    done(authError);
                } else {
                    const randomPassword = generateRandomPassword(12);

                    const newUser = new User({
                        googleId: profile.id,
                        primeiroNome: profile.name.givenName,
                        ultimoNome: profile.name.familyName,
                        email: profile.emails[0].value,
                        password: randomPassword,
                        isAtivo: true,
                        isPrimeiroLogin: false,
                        cargoId: 5
                    });

                    const savedUser = await newUser.save();
                    console.log("Novo utilizador criado com sucesso: ", savedUser);

                    done(null, newUser, {
                        message: {
                            userId: savedUser.userId,
                            primeiroNome: savedUser.primeiroNome,
                            ultimoNome: savedUser.ultimoNome,
                            email: savedUser.email,
                            cargoId: savedUser.cargoId,
                        }
                    });
                }
            }
        } catch (err) {
            console.error('Error:', err);
            done(err);
        }
    }
));

