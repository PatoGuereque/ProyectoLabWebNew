import { authRequired } from '../../../middlewares/auth-required';
import prisma from '../../../lib/prisma';

const handler = async (_req, res) => {
  const places = await prisma.location.findMany({});

  return res.status(200).json({
    places,
  });
};

export default authRequired(handler);
