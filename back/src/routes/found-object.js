import express from 'express';
import { foundObjectRepository } from '../database';

const foundObject = express();

foundObject.get('/found-objects', async (_req, res) => {
  const objects = await foundObjectRepository.getFoundObjects();
  const activeObjects = objects.filter((object) => object.status === 'active');

  res.status(200).json({
    objects: activeObjects,
  });
});

foundObject.post('/report-objects', async (_req, res) => {
  // Posts
  foundObjectRepository.createFoundObject(_req.body);
  res.status(200).json(_req.body);
});

export default foundObject;
