import express from 'express';

const foundObject = express();

foundObject.get('/found-objects', (_req, res) => {
  res.status(200).json({
    pong: new Date().getTime(),
  });
});

export default foundObject;
