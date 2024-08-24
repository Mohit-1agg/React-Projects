import Notes from './Notes';
import AddNote from './AddNote';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Home = () => {
  return (
    <Container fluid className='vh-90 mt-5'>
      <Row>
        <Col xs={7} className='px-5'>
          <Notes />
        </Col>
        <Col xs={4} className='p-4 border rounded bg-light h-75'>
          <AddNote />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
