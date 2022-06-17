import { authRequired } from './auth-required';

const roleRequired = (role, handler) =>
  authRequired((req, res) => {
    if(!req.session.user.roles.includes(role)) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });  
    }

    return handler(req, res);
  });

export { roleRequired };
