// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <nav className="sidebar-nav">
        <NavLink to="/home" activeClassName="active-link">Home</NavLink>
        <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
        <NavLink to="/about" activeClassName="active-link">About Us</NavLink>
        <NavLink to="/contact" activeClassName="active-link">Contact Us</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
