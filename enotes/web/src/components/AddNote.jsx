import React, { useContext, useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteContext from '../context/NoteContext';
import NoteFormContext from '../context/NoteFormContext';

const AddNote = () => {
  const noteContext = useContext(NoteContext);
  const noteFormContext = useContext(NoteFormContext);

  const { addNote, updateNote, errors } = noteContext;
  const { addFormType, currentEditNote } = noteFormContext;

  const title = useRef(null);
  const description = useRef(null);
  const tag = useRef(null);
  const [editNoteId, setEditNoteId] = useState(null);

  const resetForm = () => {
    title.current.value = '';
    description.current.value = '';
    tag.current.value = '';
    setEditNoteId(null);
  };

  const handleAddNoteClick = (e) => {
    e.preventDefault();
    addNote({
      title: title.current.value,
      description: description.current.value,
      tag: tag.current.value
    }, resetForm);
  };

  const handleEditNoteClick = () => {
    updateNote({
      id: editNoteId,
      title: title.current.value,
      description: description.current.value,
      tag: tag.current.value
    });
  };

  useEffect(() => {
    if (addFormType) {
      // If we're adding a new note, reset the form fields
      resetForm();
    } else if (currentEditNote) {
      // If we're editing a note, populate the form with existing note data
      title.current.value = currentEditNote.title;
      description.current.value = currentEditNote.description;
      tag.current.value = currentEditNote.tag;
      setEditNoteId(currentEditNote._id);
    }
  }, [addFormType, currentEditNote]);

  return (
    <>
      <h2 className='text-center'>{addFormType ? 'Add Notes' : 'Edit Note'}</h2>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className='mb-3' controlId='formBasicTitle'>
          <Form.Label className='fw-bold'>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter the title' ref={title} isInvalid={!!errors.title} />
          <Form.Control.Feedback type='invalid'>{errors.title ? errors.title.msg : ''}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicDescription'>
          <Form.Label className='fw-bold'>Description</Form.Label>
          <Form.Control type='text' placeholder='Enter the description' ref={description} isInvalid={!!errors.description} />
          <Form.Control.Feedback type='invalid'>{errors.description ? errors.description.msg : ''}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicTag'>
          <Form.Label className='fw-bold'>Tag</Form.Label>
          <Form.Control type='text' placeholder='Enter the tag' ref={tag} />
        </Form.Group>

        <Button variant='primary' type='submit' onClick={addFormType ? handleAddNoteClick : handleEditNoteClick}>
          {addFormType ? 'Add note' : 'Edit note'}
        </Button>
      </Form>
    </>
  );
};

export default AddNote;
