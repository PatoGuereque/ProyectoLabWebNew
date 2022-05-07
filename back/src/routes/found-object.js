import express from 'express';
import { body, validationResult } from 'express-validator';
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

foundObject.post(
  '/objects/create',
  authRequired,
  body('campus').isString().notEmpty(),
  body('category').isString().notEmpty(),
  body('dateFound').isISO8601(),
  body('imageBase64').isString().notEmpty(),
  body('location').isString().notEmpty(),
  body('status').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(400).json({ error: 'User is not logged in' });
    }

    const { campus, category, dateFound, imageBase64, location, status } =
      req.body;

    await foundObjectRepository.createFoundObject({
      campus,
      category,
      dateFound,
      imageBase64,
      location,
      status,
      reportingUser: req.user.email,
    });
    return res.status(200).json(req.body);
  }
);

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
