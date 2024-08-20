import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import NoteContext from '../context/NoteContext';

const NoteItem = ({ note, onEdit, showFullWidth }) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;
  const { title, description, tag } = note;

  const onDelete = (id) => {
    deleteNote(id);
  };

  return (
    <Col xs={showFullWidth ? 12 : 4} className='my-3'>
      <Card className='h-100'>
        <Card.Body>
          <div className='d-flex justify-content-between align-items-center'>
            <Card.Title>{title}</Card.Title>
            <div className='d-flex'>
              <button className='btn btn-link p-0' onClick={() => onEdit(note)}>
                <FaEdit className='text-primary' />
              </button>
              <button className='btn btn-link p-0' onClick={() => onDelete(note._id)}>
                <RiDeleteBin5Line className='text-danger' />
              </button>
            </div>
          </div>
          <Card.Text>{description}</Card.Text>
          <span className='fw-italic'>{tag}</span>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteItem;
