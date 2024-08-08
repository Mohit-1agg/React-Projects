/**
 * Create a user using POST method: Doesn't require auth '/api/auth/createUser'
 */

import { Router } from 'express';

import Note from '../../models/Note.js';
import { validateTitle, validateDescription } from './_validation.js';
import { handleValidationResult } from '../../helper/api.js';
import { fetchUser } from '../../../middleware/auth.js';

const validations = [validateTitle, validateDescription];
const router = Router();

export default router.post('/add/note', fetchUser, ...validations, async (req, res) => {
  try {
    handleValidationResult(req);

    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user_id: req.user.id
    });

    const saveNote = await note.save();

    res.status(200).send({
      status: 'OK',
      msg: 'Note added successfully',
      data: saveNote
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
