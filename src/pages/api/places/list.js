import handler, { authRequired } from '../../../middlewares/handler';
import prisma from '../../../lib/prisma';

export default handler.use(authRequired).get(async (req, res) => {
  const places = await prisma.location.findMany({});

  return res.status(200).json({
    places,
  });
});
