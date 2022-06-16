import { check } from 'express-validator';
import prisma from '../../../lib/prisma';
import { authRequired } from '../../../middlewares/auth-required';
import { validate } from '../../../middlewares/validator';

const handler = async (req, res) => {
  const session = req.session;
  const { category, dateFound, imageBase64, location, comments } = req.body;

  await prisma.foundObject.create({
    data: {
      dateFound,
      comments,
      image: imageBase64,
      location: {
        connect: {
          id: location,
        },
      },
      category: {
        connect: {
          id: category,
        },
      },
      reportingUser: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });
  return res.status(200).json(req.body);
};

const validator = validate(handler, [
  check('category').isInt().notEmpty(),
  check('location').isInt().notEmpty(),
  check('dateFound').isISO8601(),
  check('imageBase64').isString().notEmpty(),
  check('comments').isString().optional(),
]);

export default authRequired(validator);
