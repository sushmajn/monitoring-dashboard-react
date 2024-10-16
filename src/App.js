import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductionPage from './pages/ProductionPage';
import Home from './pages/Home';
import MachinePage from './pages/MachinePage';
import EnvironmentPage from './pages/EnvironmentPage';
import QualityControlPage from './pages/QualityControlPage';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import CreateEmployeeProfile from './pages/CreateEmployeeProfile';
import UpdateProfile from './pages/UpdateProfile';
import DeleteProfile from './pages/DeleteProfile';
import EmployeeList from './pages/EmployeeList';
import Layout from './pages/Layout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="/machines" element={<MachinePage />} />
            <Route path="/environment" element={<EnvironmentPage />} />
            <Route path="/quality" element={<QualityControlPage />} />
            <Route path="/createProfile" element={<CreateEmployeeProfile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/deleteProfile" element={<DeleteProfile />} />
            <Route path="/employee-list" element={<EmployeeList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
