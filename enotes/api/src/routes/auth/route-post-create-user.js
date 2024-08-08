/**
 * Create a user using POST method: Doesn't require auth '/api/auth/createUser'
 */

import { Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../../models/User.js';
import { validateName, validateEmail, passwordRequired, validatePassword } from './_validation.js';
import { handleValidationResult } from '../../helper/api.js';
import { generateSaltHashSync } from '../../../encryption/index.js';
import { JWT_SECRET } from '../../utils/constants.js';

const validations = [validateName, validateEmail, passwordRequired, validatePassword];
const router = Router();

export default router.post('/create/user', ...validations, async (req, res) => {
  try {
    handleValidationResult(req);

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).send({ msg: 'User already exists' });
    }

    const password = generateSaltHashSync(req.body.password);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password
    });

    const saveUser = await user.save();

    const authToken = jwt.sign({
      user: {
        id: saveUser.id
      }
    }, JWT_SECRET);

    res.status(200).send({
      status: 'OK',
      msg: 'User added successfully',
      data: { authToken }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
