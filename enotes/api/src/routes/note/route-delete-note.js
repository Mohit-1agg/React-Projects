/**
 * Create a user using POST method: Doesn't require auth '/api/auth/createUser'
 */

import { Router } from 'express';

import Note from '../../models/Note.js';
import { fetchUser } from '../../../middleware/auth.js';
import { ERROR_MESSAGE } from '../../utils/messages.js';

const router = Router();

export default router.delete('/delete/note/:id', fetchUser, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: ERROR_MESSAGE.NOTE_NOT_FOUND });
    }

    if (note.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: ERROR_MESSAGE.NOT_AUTHORIZED });
    }

    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    res.status(200).send({
      status: 'OK',
      msg: 'Note deleted successfully',
      data: deleteNote
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
