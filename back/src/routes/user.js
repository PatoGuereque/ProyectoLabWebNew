import express from 'express';
import { authRequired } from '../middleware/auth-required';

const user = express();

user.get('/info', authRequired, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default user;
