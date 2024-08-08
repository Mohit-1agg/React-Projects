/**
 * POST: SignUp user '/api/auth/getUser'
 */
import { Router } from 'express';
import User from '../../models/User.js';
import { ERROR_MESSAGE } from '../../utils/messages.js';
import { fetchUser } from '../../../middleware/auth.js';

const router = Router();

export default router.post('/get/user', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ msg: ERROR_MESSAGE.USER_NOT_FOUND });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
