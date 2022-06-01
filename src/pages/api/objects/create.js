import { getSession } from 'next-auth/react';
import handler, {
  initValidation,
  post,
  check,
  authRequired,
} from '../../../middlewares/handler';
import prisma from '../../../lib/prisma';

const validator = initValidation([
  check('category').isInt().notEmpty(),
  check('location').isInt().notEmpty(),
  check('dateFound').isISO8601(),
  check('imageBase64').isString().notEmpty(),
]);

export default handler
  .use(authRequired)
  .use(post(validator))

  .post(async (req, res) => {
    const session = await getSession({ req });
    const { category, dateFound, imageBase64, location } = req.body;

    await prisma.foundObject.create({
      data: {
        dateFound,
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
  });
