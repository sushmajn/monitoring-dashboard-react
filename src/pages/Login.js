import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      login(data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('An error occurred:', error.message);
      setError(error.message); 
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center"> 
        <Col md={6} lg={4}> 
          <h2 className="text-center">Login</h2> 
          <Form onSubmit={handleSubmit} className="mt-3">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button> 
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login
