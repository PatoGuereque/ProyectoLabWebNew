import { check, validationResult } from 'express-validator';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';

const initValidation = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    console.log(errors)
    if (errors.isEmpty()) return next();
    const err = [];
    errors.array().map((error) => err.push(error.msg));

    //status: 400 Bad Request
    res.status(400).json({ success: false, data: null, error: err });
  };
};

const authRequired = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
}

const post = (middleware) => {
  return nextConnect().post(middleware);
};

const get = (middleware) => {
  return nextConnect().get(middleware);
};

const handler = nextConnect();
export default handler;
export { initValidation, post, get, check, authRequired };
