import express from 'express';
import { foundObjectRepository } from '../database';
import { authRequired } from '../middleware/auth-required';

const foundObject = express();

foundObject.get('/objects/list', async (_req, res) => {
  const objects = await foundObjectRepository.getFoundObjects();
  const activeObjects = objects.filter((object) => object.status === 'active');

  res.status(200).json({
    objects: activeObjects,
  });
});

foundObject.post('/objects/create', async (req, res) => {
  await foundObjectRepository.createFoundObject(req.body);
  res.status(200).json(req.body);
});

foundObject.get('/objects/get/:id', async (req, res) => {
  const objectWithId = await foundObjectRepository.getObjectWithId(
    req.params.id
  );
  res.status(200).json({
    object: objectWithId,
  });
});

foundObject.post('/objects/desactivar/:id', authRequired, async (req, res) => {
  const deactivated = await foundObjectRepository.deactivateObject(
    req.params.id,
    req.user.email
  );
  res.status(200).json({
    object: deactivated,
  });
});

export default foundObject;
