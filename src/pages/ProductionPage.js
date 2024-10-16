import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Container, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';

const ProductionData = () => {
  const [productionData, setProductionData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/production', {
          headers: { Authorization: localStorage.getItem('token') },
        });

        const data = response.data;

        //  (for a 12-hour Indian time format)
        const groupedByHour = data.reduce((acc, item) => {
          const hour = new Date(item.timestamp).getHours() % 12 || 12; 

          const unitsProduced = Number(item.unitsProduced) || 0; 
          const productionRate = Number(item.productionRate) || 0; 

          if (!acc[hour]) {
            acc[hour] = {
              hour,
              unitsProduced: 0,
              productionRate: 0,
              count: 0,
            };
          }

          acc[hour].unitsProduced += unitsProduced;
          acc[hour].productionRate += productionRate;
          acc[hour].count += 1;
          return acc;
        }, {});

        // Convert object into array and calculate averages for each hour
        const hourlyDataArray = Object.values(groupedByHour).map((hourData) => ({
          hour: hourData.hour,
          unitsProduced: hourData.unitsProduced,
          productionRate: hourData.count > 0 ? hourData.productionRate / hourData.count : 0,
        }));

        setHourlyData(hourlyDataArray);
        setProductionData(data); 
      } catch (err) {
        setError('Error fetching production data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <Container fluid className="mt-4">
      <h2 className="mb-4 text-start">Production Data</h2>
      <Row>
        {/* Left side table */}
        <Col md={4}>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Product ID</th>
                <th>Units Produced</th>
                <th>Production Rate</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {productionData.length > 0 ? (
                productionData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.unitsProduced}</td>
                    <td>{item.productionRate}</td>
                    <td>{new Date(item.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Only authorized users can see this data.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>

        <Col md={8}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="hour"
                type="number"
                domain={[0, 12]}
                label={{ value: 'Time (0-12 hrs)', position: 'insideBottomRight', offset: 0 }}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} 
              />

              <YAxis
                label={{ value: 'Units Produced / hr', angle: -90, position: 'insideLeft' }}
                domain={[0, 'auto']}
                tickFormatter={(value) => `${value}`} 
              />

              <Tooltip />
              <Legend />

              {/* Line for Units Produced */}
              <Line
                type="monotone"
                dataKey="unitsProduced"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Units Produced"
              />

              {/* Line for Production Rate */}
              <Line
                type="monotone"
                dataKey="productionRate"
                stroke="#82ca9d"
                name="Production Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductionData;

