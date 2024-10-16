import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const Home = () => {
  const [activeForm, setActiveForm] = useState('login'); 
  const [activeLink, setActiveLink] = useState('home'); 
  const [showMessage, setShowMessage] = useState(false); 

  const activeStyle = {
    textDecoration: 'underline',
  };

  const handleProtectedLinkClick = (link) => {
    setActiveForm('login'); 
    setActiveLink(link); 
    setShowMessage(true); 
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/home">Monitoring Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  setActiveForm('login');
                  setActiveLink('home'); 
                  setShowMessage(false); 
                }}
                style={activeLink === 'home' ? activeStyle : undefined}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => handleProtectedLinkClick('production')}
                style={activeLink === 'production' ? activeStyle : undefined}
              >
                Production
              </Nav.Link>
              <Nav.Link
                onClick={() => handleProtectedLinkClick('machines')}
                style={activeLink === 'machines' ? activeStyle : undefined}
              >
                Machines
              </Nav.Link>
              <Nav.Link
                onClick={() => handleProtectedLinkClick('environment')}
                style={activeLink === 'environment' ? activeStyle : undefined}
              >
                Environment
              </Nav.Link>
              <Nav.Link
                onClick={() => handleProtectedLinkClick('quality')}
                style={activeLink === 'quality' ? activeStyle : undefined}
              >
                Quality
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link
                onClick={() => {
                  setActiveForm('register');
                  setActiveLink('register'); 
                  setShowMessage(false); 
                }}
                style={activeForm === 'register' ? activeStyle : undefined}
              >
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="text-center mt-5">
        <Row>
          <Col>
            <h2>Welcome to the Monitoring Dashboard</h2>
          </Col>
        </Row>

        <Row className="mt-4 justify-content-center">
          <Col md={10} lg={10}>
            {showMessage && (
              <p className="text-danger">Please log in to access this page.</p>
            )}

            {activeForm === 'login' ? <Login /> : <Register />}
          </Col>
        </Row>
      </Container>

      <footer className="mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Monitoring Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;


