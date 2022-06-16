import { authRequired } from '../../../../middlewares/auth-required';
import prisma from '../../../../lib/prisma';

const handler = async (req, res) => {
  const { id } = req.query;
  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Invalid id parameter',
    });
  }

  const object = await prisma.foundObject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      claimedByUser: {
        connect: {
          id: req.session.user.id,
        },
      },
      status: 'CLAIMED',
    },
  });

  if (!object) {
    return res.status(404).json({
      message: `${id} not found in database`,
    });
  }

  return res.status(200).json({
    message: 'Reclaim successful',
  });
};

export default authRequired(handler);
