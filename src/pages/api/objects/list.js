import { authRequired } from '../../../middlewares/auth-required';
import prisma from '../../../lib/prisma';

const handler = async (_req, res) => {
  const objects = await prisma.foundObject.findMany({
    include: {
      category: true,
      location: {
        include: {
          campus: true,
        },
      },
    },
  });

  return res.status(200).json({
    objects,
  });
};

export default authRequired(handler);
