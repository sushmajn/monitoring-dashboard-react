import React, { useEffect, useState, useContext } from 'react';
import  {AuthContext}  from '../context/AuthContext'; 
import axios from 'axios'; 
import { Container, Table, Button } from 'react-bootstrap';

const DeleteProfile = () => {
  const [employees, setEmployees] = useState([]); 
  const { isAuthenticated, userRole } = useContext(AuthContext); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees', {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setEmployees(response.data); 
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees(); 
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employee/${id}`, {
        headers: { Authorization: localStorage.getItem('token') } 
      });

      setEmployees(employees.filter((employee) => employee._id !== id));
      alert('Employee profile deleted successfully!');
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee profile.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
    }
  }, [isAuthenticated, userRole]);

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Delete Employee Profiles</h1>
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default DeleteProfile;
