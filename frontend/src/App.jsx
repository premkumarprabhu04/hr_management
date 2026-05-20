import React, { useState } from 'react';
import Login from './components/Login/Login';
import HRDashboard from './components/Dashboard/HRDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For demonstration purposes, we'll auto-login if the login component calls success
  // In a real app, this would be handled by auth state/context
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <HRDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
