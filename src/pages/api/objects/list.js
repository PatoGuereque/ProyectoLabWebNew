import handler, { authRequired } from '../../../middlewares/handler';
import prisma from '../../../lib/prisma';

export default handler.use(authRequired).get(async (req, res) => {
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
});
