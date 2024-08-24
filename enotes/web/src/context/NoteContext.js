import { createContext, useState } from 'react';
import $api from '../services/api.js';
import { getLocalStorageItem } from '../services/localStorageHelper.js';
import $toastr from '../services/toastrHelper';

const NoteContext = createContext({});

export const NoteContextProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const [errors, setErrors] = useState({});

  // Add a note
  const addNote = async ({ title, description, tag }, cb) => {
    try {
      const newNote = await $api.post('/api/add/note', { title, description, tag }, {
        headers: getLocalStorageItem('core.token')
      });

      cb();
      setNotes([...notes, newNote.data]);
      setErrors({}); // Clear errors on successful submission
      $toastr.onSuccess(newNote.msg);
    } catch (err) {
      setErrors(err.response.data.data);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    const deleteNote = await $api.remove(`/api/delete/note/${id}`, {
      headers: getLocalStorageItem('core.token')
    });

    const newNotes = notes.filter(note => note._id !== id);
    setNotes(newNotes);
    $toastr.onSuccess(deleteNote.msg);
  };

  // Update a note
  const updateNote = async ({ id, title, description, tag }) => {
    const updateNote = await $api.put(`/api/update/note/${id}`, { title, description, tag }, {
      headers: getLocalStorageItem('core.token')
    });

    const updatedNotes = notes.map(note => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }

      return note;
    });

    setNotes(updatedNotes);
    $toastr.onSuccess(updateNote.msg);
  };

  const getNotes = async () => {
    const notes = await $api.get('/api/get/notes', {
      headers: getLocalStorageItem('core.token')
    });
    setNotes(notes?.data || '');
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNotes, errors }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContext
;
