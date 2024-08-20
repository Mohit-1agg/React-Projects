import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import $api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cPassword = useRef(null);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.current.value !== cPassword.current.value) {
        throw new Error('Password and confirm password not matched');
      }

      await $api.post('/api/auth/create/user', {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value
      });

      navigate('/');
    } catch (err) {
      if (err.message) {
        console.error('error message', err.message);
      } else {
        console.log('sign up err response', err.response.data);
        // setErrors(err.data);
      }
    }
  };

  return (
    <Container fluid className='vh-100 mt-5'>
      <Row className='justify-content-center w-100'>
        <Col md={6} lg={4} className='d-flex align-items-center'>
          <Card className='w-100'>
            <Card.Body>
              <h3 className='text-center mb-4'>SignUp</h3>
              <Form onSubmit={handleSignUpSubmit}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='name' placeholder='Enter name' ref={name} />
                </Form.Group>

                <Form.Group controlId='formBasicEmail' className='mt-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' ref={email} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' ref={password} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' placeholder='Confirm Password' ref={cPassword} />
                </Form.Group>

                <Button variant='primary' type='submit' className='w-100 mt-4'>
                  SignUp
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
