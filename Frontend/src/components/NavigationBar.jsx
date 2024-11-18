// src/components/NavigationBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaBell, FaCog } from 'react-icons/fa'; // Import the necessary icons
import './NavigationBar.css';
import logo from '../assets/images/logo.png'; 

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <img src={logo} alt="Veggie Store Logo" className="logo-image" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <FaHome className="nav-icon" /> <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <FaTachometerAlt className="nav-icon" /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <FaBell className="nav-icon" /> <span>Notiification</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <FaCog className="nav-icon" /> <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
