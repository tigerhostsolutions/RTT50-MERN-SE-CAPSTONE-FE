// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileDashboard from "./components/Dashboard/ProfileDashboard";

import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <h1>BSocial Match Makers</h1>
          <Routes>
            {/*Public Routes*/}
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />

            {/*Protected Routes*/}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <ProfileDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
  );
}

export default App;