import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/employees', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setEmployees(response.data);
      setFilteredEmployees(response.data); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(`Error: ${error.response.data.error}`);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.email.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h2>Employee List</h2></Col>
        <Col className="text-end">
          <Form.Control
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '300px', marginLeft: 'auto' }}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmployeeList;
