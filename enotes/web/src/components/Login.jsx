import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { user, login, errors } = authContext;

  useEffect(() => {
    if (user?.isAuthenticated) {
      navigate('/');
    }
  }, [user]);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter email' isInvalid={!!errors.email} />
                  <Form.Control.Feedback type='invalid'>{errors.email ? errors.email.msg : ''}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password' isInvalid={!!errors.password} />
                  <Form.Control.Feedback type='invalid'>{errors.password ? errors.password.msg : ''}</Form.Control.Feedback>
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
