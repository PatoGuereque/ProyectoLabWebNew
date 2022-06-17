import { authRequired } from '../../../../middlewares/auth-required';
import prisma from '../../../../lib/prisma';

const handler = async (req, res) => {
  const { id } = req.query;

  if(!session || (session && !req.session.user.roles.includes('admin'))) {
    return res.status(403).json({
      message: 'You are not authorized to perform this action',
    });  
  }

  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Invalid id parameter',
    });
  }

  const object = await prisma.user.put({
    where: {
      id: parseInt(id),
    },
    data: {
        roles: 'user'
    }
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
