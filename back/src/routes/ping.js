import express from 'express';

const ping = express();

ping.use('/ping', (_req, res) => {
  res.status(200).json({
    pong: new Date().getTime(),
  });
});

export default ping;
