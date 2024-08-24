import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import $api from '../services/api';
import { useNavigate } from 'react-router-dom';
import $toastr from '../services/toastrHelper';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cPassword } = formData;

      if (password !== cPassword) {
        throw new Error('Password and confirm password do not match');
      }

      await $api.post('/api/auth/create/user', {
        name,
        email,
        password
      });

      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        $toastr.onError(err.response.data.msg || 'Login failed. Please try again.');
      }
    }
  };

  return (
    <Container fluid className='vh-100 mt-5'>
      <Row className='justify-content-center w-100'>
        <Col md={6} lg={4} className='d-flex align-items-center'>
          <Card className='w-100'>
            <Card.Body>
              <h3 className='text-center mb-4'>Sign Up</h3>
              <Form onSubmit={handleSignUpSubmit}>
                <Form.Group controlId='formBasicName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formBasicEmail' className='mt-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='formBasicConfirmPassword' className='mt-3'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    name='cPassword'
                    value={formData.cPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.cPassword}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.cPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit' className='w-100 mt-4'>
                  Sign Up
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
