import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';

const UpdateProfile = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);

  const startEditing = (employee) => {
    setEditEmployeeId(employee._id);
    setEmail(employee.email);
    setRole(employee.role);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedData = {
        email,
        role,
      };

      const response = await axios.put(`/employee/${id}`, updatedData, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      setEmployees(employees.map(emp => emp._id === id ? response.data.updatedEmployee : emp));
      alert('Employee profile updated successfully!');

      setEditEmployeeId(null);
      setEmail('');
      setRole('');
    } catch (err) {
      console.error('Error updating employee:', err);
      alert('Failed to update employee profile.');
    }
  };

  const cancelEditing = () => {
    setEditEmployeeId(null);
    setEmail('');
    setRole('');
  };

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Update Employee Profiles</h1>
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
                <td>
                  {editEmployeeId === employee._id ? (
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editEmployeeId === employee._id ? (
                    <Form.Control
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Role (admin, employee, operator)"
                    />
                  ) : (
                    employee.role
                  )}
                </td>
                <td>
                  {editEmployeeId === employee._id ? (
                    <>
                      <Button variant="success" onClick={() => handleUpdate(employee._id)}>Save</Button>
                      <Button variant="secondary" onClick={cancelEditing} className="ms-2">Cancel</Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => startEditing(employee)}>Edit</Button>
                  )}
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

export default UpdateProfile;
