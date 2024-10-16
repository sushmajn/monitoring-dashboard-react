import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
      } catch (err) {
        console.error('Failed to decode token:', err);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, []);

  const login = (token) => {
    if (typeof token === 'string') {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decodedToken.role);
      } catch (err) {
        console.error('Failed to decode token:', err);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      console.error('Invalid token provided:', token);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
