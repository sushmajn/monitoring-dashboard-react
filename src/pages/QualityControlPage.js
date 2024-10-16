import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Form, Row, Col } from 'react-bootstrap';

const QualityControlPage = () => {
  const [inspectionData, setInspectionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/quality-control', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setInspectionData(response.data);
        setFilteredData(response.data); 
      } catch (err) {
        console.error('Error fetching quality data:', err);
      }
    })();
  }, []);

  // Handle search based on email
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = inspectionData.filter((record) =>
      record.inspectorId?.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Quality Control Data</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Form.Control
            type="text"
            placeholder="Search by Inspector's Email"
            value={searchTerm}
            onChange={handleSearch}
            style={{ maxWidth: '300px' }}
          />
        </Col>
      </Row>
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Product ID</th>
            <th>Defects Found</th>
            <th>Inspection Date/Time</th>
            <th>Corrective Action</th>
            <th>Status</th>
            <th>Inspector</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((record) => (
              <tr
                key={record._id}
                className={record.status === 'fail' ? 'table-danger' : ''}
              >
                <td>{record.productId}</td>
                <td>{record.defectsFound}</td>
                <td>{new Date(record.inspectionDate).toLocaleString()}</td>
                <td>{record.correctiveAction || 'No Action'}</td>
                <td>{record.status}</td>
                <td>{record.inspectorId ? record.inspectorId.email : 'Unknown'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default QualityControlPage;
