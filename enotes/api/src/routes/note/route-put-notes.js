/**
 * Create a user using POST method: Doesn't require auth '/api/auth/createUser'
 */

import { Router } from 'express';

import Note from '../../models/Note.js';
import { fetchUser } from '../../../middleware/auth.js';
import { ERROR_MESSAGE } from '../../utils/messages.js';

const router = Router();

export default router.put('/update/note/:id', fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: ERROR_MESSAGE.NOTE_NOT_FOUND });
    }

    if (note.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: ERROR_MESSAGE.NOT_AUTHORIZED });
    }

    const updateNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.status(200).send({
      status: 'OK',
      msg: 'Note updated successfully',
      data: updateNote
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
