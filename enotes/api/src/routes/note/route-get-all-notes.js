/**
 * Create a user using POST method: Doesn't require auth '/api/auth/createUser'
 */

import { Router } from 'express';

import Note from '../../models/Note.js';
import { fetchUser } from '../../../middleware/auth.js';

const router = Router();

export default router.get('/get/notes', fetchUser, async (req, res) => {
  try {
    const getNotes = await Note.find({ user_id: req.user.id });
    res.status(200).send({ status: 'OK', msg: 'Notes fetched successfully', data: getNotes });
  } catch (err) {
    res.status(500).send(err);
  }
});
