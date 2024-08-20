import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const About = () => {
  return (
    <Container fluid>
      <Row className='mb-4 text-center'>
        <Col>
          <h1 className='display-4 font-weight-bold'>About eNotes</h1>
          <p className='lead text-muted'>Your ultimate note-taking companion</p>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col md={6}>
          <Card className='shadow-sm border-0'>
            {/* <Card.Img variant='top' src='https://via.placeholder.com/600x300' alt='eNotes' /> */}
            <Card.Body>
              <Card.Title className='font-weight-bold'>What is eNotes?</Card.Title>
              <Card.Text>
                eNotes is a powerful and user-friendly application designed to help you organize and manage your notes effortlessly. Whether you're a student, a professional, or just someone who loves to stay organized, eNotes has you covered.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='shadow-sm border-0'>
            <Card.Body>
              <Card.Title className='font-weight-bold'>Features</Card.Title>
              <ul className='list-unstyled'>
                <li><i className='bi bi-check-circle-fill' /> Easy note creation and editing</li>
                <li><i className='bi bi-check-circle-fill' /> Category and tag management</li>
                <li><i className='bi bi-check-circle-fill' /> Search functionality to find notes quickly</li>
                {/* <li><i className='bi bi-check-circle-fill' /> Cloud sync to access notes from any device</li>
                  <li><i className='bi bi-check-circle-fill' /> Customizable themes and settings</li> */}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col>
          <Card className='shadow-sm border-0'>
            <Card.Body>
              <Card.Title className='font-weight-bold'>Our Mission</Card.Title>
              <Card.Text>
                At eNotes, our mission is to empower users to stay organized and focused by providing a seamless and intuitive note-taking experience. We strive to continually improve our app based on user feedback and technological advancements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
