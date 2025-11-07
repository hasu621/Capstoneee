import React from 'react';
import { Link } from 'react-router-dom'; // Correct Link import
import './RoleSelection.css';

const RoleSelection = () => {
  return (
    <div className="role-selection-container">
      <h1 className="role-selection-title">Select Your Role</h1>
      <p className="role-selection-subtitle">Please choose your access level to proceed to the dashboard.</p>
      <div className="role-cards-grid">
        <Link to="/admin-dashboard" className="role-card admin">
          <i className="fas fa-user-shield role-icon"></i>
          <h2>Administrator</h2>
          <p>Full system control and oversight.</p>
        </Link>
        <Link to="/faculty-dashboard" className="role-card faculty">
          <i className="fas fa-chalkboard-teacher role-icon"></i>
          <h2>Faculty</h2>
          <p>Access to academic-related features.</p>
        </Link>
        <Link to="/student-dashboard" className="role-card student">
          <i className="fas fa-user-graduate role-icon"></i>
          <h2>Student</h2>
          <p>View personal schedules and campus info.</p>
        </Link>
      </div>
    </div>
  );
};

export default RoleSelection;
// CSS remains the same as previously provided