import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdAdd } from 'react-icons/md';

import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import NoteFormContext from '../context/NoteFormContext';
import { TbLayoutGridFilled } from 'react-icons/tb';
import { FaList } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [showFullWidth, setShowFullWidth] = useState(true);
  const [highlightedId, setHighlightedId] = useState(null);

  const noteContext = useContext(NoteContext);
  const noteFormContext = useContext(NoteFormContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { user } = authContext;
  const { notes, getNotes } = noteContext;
  const { changeToEditForm, changeToAddForm, setCurrentEditNote } = noteFormContext;

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate('/login');
      return;
    }

    getNotes();
  }, []);

  const onEdit = (note) => {
    setHighlightedId(note._id);
    setCurrentEditNote(note);
    changeToEditForm();
  };

  const handleAddButton = () => {
    setHighlightedId(null);
    changeToAddForm();
  };

  return (
    <Container className='h-100'>
      <Row>
        <Col xs={10}><h2 className='text-center'>Your Notes</h2></Col>
        <Col>
          <button className='btn btn-light rounded-2 btn-sm border border-1 mx-1' onClick={handleAddButton}>
            <MdAdd className='fs-5' />
          </button>
          <button className='btn btn-light rounded-2 btn-sm border border-1 mx-1' onClick={() => setShowFullWidth(!showFullWidth)}>
            {showFullWidth ? <TbLayoutGridFilled /> : <FaList />}
          </button>
        </Col>
      </Row>
      <Row className='overflow-auto' style={{ maxHeight: '70vh' }}>
        {notes.length > 0 && notes.map(note => {
          return (
            <NoteItem key={note._id} note={note} onEdit={onEdit} selected={highlightedId} showFullWidth={showFullWidth} />
          );
        })}
      </Row>
    </Container>
  );
};

export default Notes;
