import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteContext from '../context/NoteContext';
import NoteFormContext from '../context/NoteFormContext';

const AddNote = () => {
  const { addNote, updateNote, errors = {} } = useContext(NoteContext);
  const { addFormType, currentEditNote } = useContext(NoteFormContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    id: null
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tag: '',
      id: null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, description, tag, id } = formData;

    if (addFormType) {
      addNote({ title, description, tag }, resetForm);
    } else {
      updateNote({
        title,
        description,
        tag,
        id
      });
    }
  };

  useEffect(() => {
    if (addFormType) {
      resetForm();
    } else if (currentEditNote) {
      setFormData({
        title: currentEditNote.title,
        description: currentEditNote.description,
        tag: currentEditNote.tag,
        id: currentEditNote._id
      });
    }
  }, [addFormType, currentEditNote]);

  return (
    <>
      <h2 className='text-center'>{addFormType ? 'Add Note' : 'Edit Note'}</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3' controlId='formBasicTitle'>
          <Form.Label className='fw-bold'>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors?.title}
            aria-describedby={errors?.title ? 'title-error' : null}
          />
          <Form.Control.Feedback type='invalid' id='title-error'>
            {errors?.title?.msg}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicDescription'>
          <Form.Label className='fw-bold'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors?.description}
            aria-describedby={errors?.description ? 'description-error' : null}
          />
          <Form.Control.Feedback type='invalid' id='description-error'>
            {errors?.description?.msg}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicTag'>
          <Form.Label className='fw-bold'>Tag</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the tag'
            name='tag'
            value={formData.tag}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          {addFormType ? 'Add Note' : 'Edit Note'}
        </Button>
      </Form>
    </>
  );
};

export default AddNote;
