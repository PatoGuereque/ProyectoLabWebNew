import express from 'express';
import { foundObjectRepository } from '../database';

const foundObject = express();

foundObject.get('/objects/list', async (_req, res) => {
  const objects = await foundObjectRepository.getFoundObjects();
  const activeObjects = objects.filter((object) => object.status === 'active');

  res.status(200).json({
    objects: activeObjects,
  });
});

foundObject.post('/objects/create', async (_req, res) => {
  // Posts
  foundObjectRepository.createFoundObject(_req.body);
  res.status(200).json(_req.body);
});

foundObject.get('/objects/get/:id', async (_req, res) => {
  const objectWithId = await foundObjectRepository.getObjectWithId(
    _req.params.id
  );
  res.status(200).json({
    object: objectWithId,
  });
});

export default foundObject;
