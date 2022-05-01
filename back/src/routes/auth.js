import express from 'express';
import passport from 'passport';

import('../controllers/auth-controller');

const auth = express();

auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/',
  })
);

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default auth;
