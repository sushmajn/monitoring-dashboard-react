import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const MachinePage = () => {
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/machines', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setMachineData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching machine data');
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container fluid className="mt-3">
      <h1 className="text-start mb-4">Machine Data</h1> 
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="w-100"> 
          <thead className="table-dark">
            <tr>
              <th>Machine ID</th>
              <th>Status</th>
              <th>Uptime</th>
              <th>Downtime</th>
            </tr>
          </thead>
          <tbody>
            {machineData.length > 0 ? (
              machineData.map((data) => (
                <tr key={data._id}>
                  <td>{data.machineId}</td>
                  <td>{data.status}</td>
                  <td>{data.uptime}</td>
                  <td>{data.downtime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Only authorized personnel can view this data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MachinePage;

