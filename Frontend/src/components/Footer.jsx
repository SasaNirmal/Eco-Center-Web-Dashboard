
import React from 'react';
import './Footer.css'; // Make sure to create and link a CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Left Section: Company Logo and Description */}
      <div className="footer-section company-info">
        <h2 className="footer-logo">Eco Center.</h2>
        <p className="footer-description">
        Welcome to our Vegetable Centre, your source for fresh, organic, and locally grown produce. We ensure the highest quality and support sustainable farming practices for a healthier community.
        </p>
        
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="footer-section company-links">
        <h3 className="footer-title">Company</h3>
        <ul className="footer-list">
          <li><a href="#">Home</a></li>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">AboutnUs</a></li>
         
        </ul>
      </div>

      {/* Right Section: Contact Information */}
      <div className="footer-section get-in-touch">
        <h3 className="footer-title">Get in Touch</h3>
        <p>0112223339</p>
        <p>contact@ecocenter.com</p>
      </div>
    </footer>
  );
};

export default Footer;

