import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const CreateEmployeeProfile = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      await axios.post('/create-employee', 
        { email, role },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      );
      alert('Profile created successfully');
      setEmail('');
      setRole('');
      navigate('/employee-list');
    } catch (error) {
      setLoading(false); 
      if (error.response && error.response.data && error.response.data.error) {
        setError(`Error: ${error.response.data.error}`); 
      } else {
        setError('An unexpected error occurred'); 
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-start"> 
      <Row className="w-100 mt-5"> 
        <Col md={6} lg={4} className="mx-auto">
          <h2 className="text-center">Create Employee Profile</h2>
          <Form onSubmit={handleSubmit} className="mt-3">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="operator">Operator</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100" disabled={loading}>
              {loading ? 'Creating...' : 'Create Profile'}
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEmployeeProfile;
