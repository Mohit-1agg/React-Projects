import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { user, login } = authContext;

  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    if (user?.isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    await login(email.current.value, password.current.value);
    navigate('/');
  };

  return (
    <Container fluid className='vh-100 mt-5'>
      <Row className='justify-content-center w-100'>
        <Col md={6} lg={4} className='d-flex align-items-center'>
          <Card className='w-100'>
            <Card.Body>
              <h3 className='text-center mb-4'>Login</h3>
              <Form onSubmit={handleSubmitClick}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' ref={email} placeholder='Enter email' />
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' ref={password} placeholder='Password' />
                </Form.Group>

                <Button variant='primary' type='submit' className='w-100 mt-4'>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
