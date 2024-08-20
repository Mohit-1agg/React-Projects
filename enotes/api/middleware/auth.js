import { JWT_SECRET, xHeaderHttpToken } from '../src/utils/constants.js';
import { ERROR_MESSAGE } from '../src/utils/messages.js';
import jwt from 'jsonwebtoken';

export const fetchUser = (req, res, next) => {
  try {
    const token = req.header(xHeaderHttpToken);
    if (!token) {
      res.status(400).send({ msg: ERROR_MESSAGE.TOKEN_MISSING });
    }

    const verifyToken = jwt.verify(token, JWT_SECRET);
    req.user = verifyToken.user;
    next();
  } catch (err) {
    throw new Error({
      status: 401,
      message: 'Invalid Token'
    });
  }
}
;
