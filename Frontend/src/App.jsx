// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation(); // Get the current location

  // Define paths where the navigation bar should not be shown
  const noNavBarPaths = ['/', '/signup']; // Assuming '/signup' is the registration route

  return (
    <div className="app">
      {/* Render NavigationBar only if the current path is not in noNavBarPaths */}
      {!noNavBarPaths.includes(location.pathname) && <NavigationBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* If you have a separate signup route, add it here */}
        </Routes>
      </div>
      
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
