import prisma from '../../../lib/prisma';
import { roleRequired } from '../../../middlewares/role-required';

const handler = async (_req, res) => {
  const users = await prisma.user.findMany({});

  return res.status(200).json({
    users,
  });
};

export default roleRequired('admin', handler);
