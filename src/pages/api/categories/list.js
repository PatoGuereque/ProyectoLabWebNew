import { authRequired } from '../../../middlewares/auth-required';
import prisma from '../../../lib/prisma';

const handler = async (_req, res) => {
  const categories = await prisma.category.findMany({});

  return res.status(200).json({
    categories,
  });
};

export default authRequired(handler);
