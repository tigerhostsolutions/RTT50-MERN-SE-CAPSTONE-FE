// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileDashboard from './components/Dashboard/ProfileDashboard';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';
import './pages/css/styles.css';

function App() {
  return (
      <Router >
        <div className = "App" >
          {/* Navigation */}
          <header >
            <nav >
              <ul >
                <li >
                  <NavLink exact to = "/" activeClassName = "active" >
                    Home
                  </NavLink >
                </li >
                <li >
                  <NavLink to = "/register" activeClassName = "active" >
                    Register
                  </NavLink >
                </li >
                <li >
                  <NavLink to = "/login" activeClassName = "active" >
                    Login
                  </NavLink >
                </li >
                <li >
                  <NavLink to = "/dashboard" activeClassName = "active" >
                    Dashboard
                  </NavLink >
                </li >
              </ul >
            </nav >
            <h1 >Social Match Makers</h1 >
          </header >

          <Routes >
            {/*Public Routes*/}
            <Route path = "/home" element = {<Home />} />
            <Route path = "/register" element = {<Registration />} />
            <Route path = "/login" element = {<Login />} />

            {/*Protected Routes*/}
            <Route path = "/dashboard" element = {
              <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute >
            } />

            <Route path = "/dashboard/profile" element = {
              <ProtectedRoute >
                <ProfileDashboard />
              </ProtectedRoute >
            } />
          </Routes >
        </div >
      </Router >
  );
}

export default App;