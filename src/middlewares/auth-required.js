import { getSession } from 'next-auth/react';

const authRequired = (handler) => async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  req.session = session;
  return handler(req, res);
};

export { authRequired };
