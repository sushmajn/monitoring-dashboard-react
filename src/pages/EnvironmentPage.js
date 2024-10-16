import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const EnvironmentPage = () => {
  const [environmentData, setEnvironmentData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/environment', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setEnvironmentData(response.data);
      } catch (error) {
        console.error('Error fetching environment data:', error);
      }
    })();
  }, []);

  return (
    <Container fluid className="mt-4">
      <h1 className="mb-4">Environment Data</h1>
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {environmentData.length > 0 ? (
            environmentData.map((data) => (
              <tr key={data._id}>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
                <td>{new Date(data.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Only authorized persons can see this data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EnvironmentPage;

