import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import HRDashboard from './components/Dashboard/HRDashboard';

function AppRoutes({ isLoggedIn, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLoginSuccess();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLogin} />} />
      <Route path="/:view" element={isLoggedIn ? <HRDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('hrIsLoggedIn') === 'true');

  useEffect(() => {
    localStorage.setItem('hrIsLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
