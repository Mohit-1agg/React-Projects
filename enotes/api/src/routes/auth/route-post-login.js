/**
 * Login a user using POST method: Doesn't require auth '/api/auth/login'
 */

import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import { validateEmail, passwordRequired } from './_validation.js';
import { handleValidationResult } from '../../helper/api.js';
import { compareHashedValue } from '../../../encryption/index.js';
import { JWT_SECRET } from '../../utils/constants.js';
import { ERROR_MESSAGE } from '../../utils/messages.js';

const validations = [validateEmail, passwordRequired];
const router = Router();

export default router.post('/login', ...validations, async (req, res) => {
  try {
    handleValidationResult(req);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: ERROR_MESSAGE.INVALID_CRED });
    }

    const password = compareHashedValue(req.body.password, user.password);
    if (!password) {
      return res.status(400).json({ msg: ERROR_MESSAGE.INVALID_CRED });
    }

    const authToken = jwt.sign({
      user: {
        id: user.id
      }
    }, JWT_SECRET);

    res.status(200).send({
      status: 'OK',
      msg: 'User login successfully',
      data: { authToken }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
