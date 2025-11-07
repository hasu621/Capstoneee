import React from 'react';
// Removed unused imports: useEffect, useState, axios, bootstrap
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import RoleSelection from './components/RoleSelection/RoleSelection';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// 1. Import the new FacultyDashboard component
import FacultyDashboard from './components/FacultyDashboard/FacultyDashboard';
// 2. Import the new StudentDashboard component
import StudentDashboard from './components/StudentDashboard/StudentDashboard';

function App() {
  // Removed the message state and useEffect/axios block
  
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-role" element={<RoleSelection />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          
          {/* 3. Added the new route for the StudentDashboard */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

