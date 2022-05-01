import GoogleStrategy from 'passport-google-oidc';
import passport from 'passport';
import { googleCallback, googleClientId, googleClientSecret } from '../config';
import { userRepository } from '../database';

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallback,
      scope: ['profile', 'email'],
    },
    async (_issuer, profile, callback) => {
      const { id } = profile;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      const currentUser = await userRepository.getUserByEmail({ email });

      if (!currentUser) {
        const newUser = await userRepository.addGoogleUser({
          id,
          email,
          firstName,
          lastName,
        });
        return callback(null, newUser);
      }

      currentUser.lastVisited = new Date();
      return callback(null, currentUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await userRepository.getUserById({ id });
  done(null, currentUser);
});
