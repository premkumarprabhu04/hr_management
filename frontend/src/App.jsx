import React, { useState } from 'react';
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
      <Route path="/dashboard" element={isLoggedIn ? <HRDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
