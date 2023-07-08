const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./secret');
const User = require('../models/user');
const crypto = require('crypto');

passport.serializeUser((user, done) => {
    // Serialize user ID and any other necessary information into the session
    done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
    try {
      if (!userId) {
        return done(new Error('O ID do utilizador não foi fornecido!'));
      }
  
      const user = await User.findOne({
        where: { userId }
      });
  
      if (!user) {
        return done(new Error(`O utilizador com o ID ${userId} não foi encontrado`));
      } else {
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
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Generate a hash value from the profile.id using a hash function
          const hash = crypto.createHash('sha256').update(profile.id).digest('hex');
  
          // Extract the first 8 characters of the hash as the modified userId
          const userId = parseInt(hash.substr(0, 8), 16); // Convert the hexadecimal string to an integer
  
          const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });
  
          if (existingUser) {
            console.log('The user already exists! Logging in:', existingUser);
            return done(null, existingUser);
          } else {
            // If the user doesn't exist, create a new one with the modified userId
            const newUser = await User.create({
              userId: userId,
              primeiroNome: profile.name.givenName,
              ultimoNome: profile.name.familyName,
              email: profile.emails[0].value,
              isAtivo: true,
              isPrimeiroLogin: false,
              cargoId: 5
            });
  
            console.log('A new user was created using Google OAuth 2.0:', newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error('Error while trying to authenticate:', error);
          done(error, null);
        }
      }
    )
  );