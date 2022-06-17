import { authRequired } from '../../../middlewares/auth-required';
import prisma from '../../../lib/prisma';

const handler = async (_req, res) => {
  const users = await prisma.user.findMany({});

  return res.status(200).json({
    users,
  });
};

export default authRequired(handler);
