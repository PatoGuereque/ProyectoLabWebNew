import express from 'express';
import passport from 'passport';
import { authRequired } from '../middleware/auth-required';

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
    successRedirect: '/profile',
  })
);

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

auth.get('/test', authRequired, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default auth;
