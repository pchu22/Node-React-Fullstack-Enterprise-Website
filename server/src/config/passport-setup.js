const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./secret');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    // Serialize user ID and any other necessary information into the session
    done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
    try {
        // Fetch user data from the database based on the serialized userId
        const user = await User.findOne({
            where: { userId }
        });

        if (!user) {
            return done(new Error('User not found'));
        } else {
            // Attach the user object to the request
            done(null, user);
        }
    } catch (error) {
        done(error);
    }
});

passport.use(
    new GoogleStrategy(
        {
            // Options for the Google strategy
            callbackURL: 'http://softinsa-web-app-carreiras01.onrender.com/auth/google/redirect',
            clientID: keys.google.clientId,
            clientSecret: keys.google.clientSecret,
            scope: ['profile', 'email'] // Add the 'email' scope
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });

                if (existingUser) {
                    console.log('User already exists:', existingUser);
                    return done(null, existingUser);
                } else {
                    // If the user doesn't exist, create a new one
                    const newUser = await User.create({
                        primeiroNome: profile.name.givenName,
                        ultimoNome: profile.name.familyName,
                        email: profile.emails[0].value // Save the email
                    });

                    console.log('New user created:', newUser);
                    done(null, newUser);
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                done(error, null);
            }
        }
    )
);
