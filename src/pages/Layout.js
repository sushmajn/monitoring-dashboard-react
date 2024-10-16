import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const { userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const activeStyle = {
    textDecoration: 'underline',
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/dashboard">Monitoring Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {userRole === 'operator' ? (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/quality"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Quality
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/production"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Production
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/machines"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Machines
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/environment"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Environment
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/quality"
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  >
                    Quality
                  </Nav.Link>
                  {userRole === 'admin' && (
                    <>
                      <Nav.Link
                        as={NavLink}
                        to="/createProfile"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                      >
                        Create Profile
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/updateProfile"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                      >
                        Update Profile
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/deleteProfile"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                      >
                        Delete Profile
                      </Nav.Link>
                    </>
                  )}
                </>
              )}
            </Nav>
            <Nav>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

