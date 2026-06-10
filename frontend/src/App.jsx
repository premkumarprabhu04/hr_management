import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import HRDashboard from './components/HRDashboard/HRDashboard';

function AppRoutes({ isLoggedIn, role, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();

  const handleLogin = (userRole) => {
    onLoginSuccess(userRole);
    navigate(userRole === 'HR' ? '/hr/dashboard' : '/employee/dashboard');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to={role === 'HR' ? '/hr/dashboard' : '/employee/dashboard'} replace /> : <Login onLoginSuccess={handleLogin} />}
      />
      <Route
        path="/employee/:view?"
        element={isLoggedIn && role === 'EMPLOYEE' ? <EmployeeDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
      />
      <Route
        path="/hr/:view?"
        element={isLoggedIn && role === 'HR' ? <HRDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('appIsLoggedIn') === 'true');
  const [role, setRole] = useState(() => localStorage.getItem('appRole') || '');

  useEffect(() => {
    localStorage.setItem('appIsLoggedIn', isLoggedIn);
    localStorage.setItem('appRole', role);
  }, [isLoggedIn, role]);

  const handleLoginSuccess = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('appIsLoggedIn');
    localStorage.removeItem('appRole');
    localStorage.removeItem('hrDashboardView');
    localStorage.removeItem('hrLeaveActiveTab');
    localStorage.removeItem('hrReportsActiveTab');
    localStorage.removeItem('hrSalaryActiveTab');
    localStorage.removeItem('hrAttendanceViewMode');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes
          isLoggedIn={isLoggedIn}
          role={role}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
