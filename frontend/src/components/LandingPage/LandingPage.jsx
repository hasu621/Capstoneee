// LandingPage.jsx - Refactored Code

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

import heroImageUrl from '../../assets/images/TUP_Background.jpg';

// ===================================
// --- NEW: Auth Panel Component (*** REFACTORED ***) ---
// ===================================
const AuthPanel = ({ panel, setPanel }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  // --- EDITED: STEP_INDICATORS is now dynamic, depending on the role ---
  const getStepIndicators = (role) => {
      // Admin only needs 3 steps: 1 (Info), 2 (Capture), 3 (Summary)
      if (role === 'admin') return [1, 2, 3];
      // Student/Faculty needs 4 steps: 1 (Info), 2 (Details), 3 (Capture), 4 (Summary)
      return [1, 2, 3, 4];
  };
  const [step, setStep] = useState(1); 
  // --- EDITED 4: Removed selectedCourses state since Step 3 is removed ---
  const [selectedRole, setSelectedRole] = useState(''); 
  const [showRoleSelection, setShowRoleSelection] = useState(false); 
  const signupPanelRef = useRef(null); 

  // Camera capture state/refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [faceCapture, setFaceCapture] = useState(null); 
  
// --- NEW Password States (Needed for validation) ---
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '', 
    streetNumber: '',
    streetName: '',
    barangay: '',
    city: '',
    tupmYear: '',
    tupmSerial: '',
    email: '',
    // --- EDITED 2: Initial value is set ---
    contactNumber: '+63  ', 
    birthday: '',
    // --- EDITED 3: Changed 'course' to 'courseCode' for clarity with dropdown ---
    courseCode: '',
    year: '',
    section: '',
    college: '',
    status: '',
    term: '',
    // --- NEW: Faculty Role Status ---
    facultyStatus: '', // 'head' or 'regular'
    // ---------------------------------
    handledSections: []
  });

  // --- EDITED 3: Sample Courses List (Hardcoded as requested) ---
  const availableCourses = [
    { code: "BSIT", name: "BS Information Technology", college: "COS" },
    { code: "BSCS", name: "BS Computer Science", college: "COS" },
    { code: "BSEE", name: "BS Electrical Engineering", college: "COE" },
    { code: "BSIE", name: "BS Industrial Engineering", college: "COE" },
    { code: "BSA", name: "BS Architecture", college: "CAFA" },
    { code: "BSTM", name: "BS Trade Management", college: "CIT" },
    { code: "BSED", name: "BS Industrial Education", college: "CIE" },
    { code: "BSPS", name: "BS Physics", college: "CLA" },
    // Add more courses based on the provided colleges later if needed
  ];

  // --- EDITED 3: Sample Sections Dropdown Values (Hardcoded as requested) ---
  const availableSections = [
    'BSIT-5A', 'BSIT-5B',
    'BSIT-4A', 'BSIT-4B',
    'BSIT-3A', 'BSIT-3B',
    'BSIT-2A', 'BSIT-2B',
    'BSIT-1A', 'BSIT-1B',
  ];
  
  // --- EDITED 3: College Options Dropdown Values (Hardcoded as requested) ---
  const collegeOptions = [
    { code: "CIT", name: "College of Industrial Technology" },
    { code: "CIE", name: "College of Industrial Education" },
    { code: "COE", name: "College of Engineering" },
    { code: "CLA", name: "College of Liberal Arts" },
    { code: "COS", name: "College of Science" },
    { code: "CAFA", name: "College of Architecture and Fine Arts" },
  ];

  const isLogin = panel === "login";
  const title = isLogin
    ? <>Welcome <span className="auth-title-highlight">Back!</span></>
    : <>Register to your <span className="auth-title-highlight">Class now</span></>;

  const scrollSignupTop = () => {
    if (signupPanelRef.current) {
      signupPanelRef.current.scrollTop = 0;
    }
  };

  const handleNext = () => {
    // --- EDITED 4: Removed Step 3 skip/validation logic ---
    if (step === 1) {
        const { firstName, lastName, email, birthday, contactNumber, tupmYear, tupmSerial, streetNumber, city } = formData;
        
        // Check core fields and address
        if (!firstName || !lastName || !email || !birthday || !streetNumber || !city) {
            alert("Please fill in all required personal information fields.");
            return;
        }

        // TUPM ID Validation (must be 2 chars for year and 4 chars for serial)
        if (tupmYear.length !== 2 || tupmSerial.length !== 4) {
            alert("TUPM ID must be complete: TUPM - YY - ####.");
            return;
        }
        
        // Contact Number Validation (must include space and 10 digits)
        if (contactNumber.length < 14) { // +63 + space + 10 digits = 14
            alert("Contact number must be complete (10 digits after +63 ).");
            return;
        }
    }

    // --- Step 2 Validation (Student/Faculty Specific) ---
    if (step === 2) {
      if (selectedRole === 'student') {
          if (!formData.college || !formData.year || !formData.section || !formData.courseCode) {
              alert("Please fill in all required Student Program details (College, Course, Year, Section).");
              return;
          }
      } else if (selectedRole === 'faculty') {
          // Check for College and new Faculty Status
          if (!formData.college || !formData.facultyStatus) {
              alert("Please select your College and Faculty Status.");
              return;
          }
      }
    }
    
    // --- EDITED: Flow Logic ---
    if (selectedRole === 'admin') {
        // Admin skips Step 2 (Details) directly to Step 3 (Capture)
        if (step === 1) {
            setStep(3); // Skip from 1 to 3
        } else {
            setStep((prev) => prev + 1); // 3 to 4 (Summary)
        }
    } else {
        // Student/Faculty regular flow
        if (step === 2) {
            setStep(3); // 2 to 3 (Capture)
        } else {
            setStep((prev) => prev + 1); // 1 to 2, or 3 to 4
        }
    }
    // -------------------------
    scrollSignupTop();
  };
  
  const handleBack = () => {
    // --- EDITED: Flow Logic ---
    if (selectedRole === 'admin') {
        // Admin flow: 3 (Capture) back to 1 (Info), or 4 (Summary) back to 3 (Capture)
        if (step === 3) {
            setStep(1); // Back from 3 to 1
        } else {
            setStep((prev) => prev - 1); // 4 back to 3
        }
    } else {
        // Student/Faculty flow: 3 back to 2, or 4 back to 3, or 2 back to 1
        if (step === 3) {
            setStep(2); // Back from 3 to 2
        } else {
            setStep((prev) => prev - 1);
        }
    }
    // -------------------------
    scrollSignupTop();
  };

  // --- EDITED 4: Removed handleCourseToggle since Step 3 is removed ---
  // const handleCourseToggle = (courseCode) => { ... }

  /*const handleSectionToggle = (sectionCode) => {
    setFormData((prev) => {
      const current = prev.handledSections || [];
      const next = current.includes(sectionCode)
        ? current.filter((s) => s !== sectionCode)
        : [...current, sectionCode];
      return { ...prev, handledSections: next };
    });
  }; */

  const handleFinish = () => {

    // --- EDITED 3: Password Validation ---
    if (!password || !retypePassword) {
        alert('Password fields are required.');
        return;
    }
    if (password !== retypePassword) {
        alert('Passwords do not match.');
        return;
    }
    if (!faceCapture) {
        alert('Face capture is required.');
        return;
    }
    // ------------------------------------
    // Show alert
    alert('Registration finished, please log in');
    // Close the panel and reset form
    setPanel(null);
    setStep(1);
    // --- EDITED 4: Removed selectedCourses reset ---
    setSelectedRole('');
    setShowRoleSelection(true);
    setFaceCapture(null);
    setPassword(''); // Reset password states
    setRetypePassword('');

    // --- Reset formData state ---
    setFormData({
      firstName: '',
      lastName: '',
      middleName: '', 
      streetNumber: '',
      streetName: '',
      barangay: '',
      city: '',
      tupmYear: '',
      tupmSerial: '',
      email: '',
      // --- EDITED 2: Reset to '+63 ' ---
      contactNumber: '+63  ',
      birthday: '',
      courseCode: '', // --- EDITED 3
      year: '',
      section: '',
      college: '',
      status: '',
      term: '',
      facultyStatus: '', // Reset new field
      handledSections: []
    });
  };

  // Reset role selection when panel changes
  useEffect(() => {
    if (panel === 'login') {
      setSelectedRole('');
      setShowRoleSelection(false);
    } else if (panel === 'signup') {
      setShowRoleSelection(true);
      setSelectedRole('');
    }
  }, [panel]);

  // Start/stop camera when entering/leaving Step 3 (old Step 4)
  useEffect(() => {
    
    // --- FIX: Define functions BEFORE they are called ---
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Unable to access camera', err);
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    if (!isLogin && !showRoleSelection && step === 3) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      // ensure cleanup when unmounting
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isLogin, showRoleSelection, step]);


  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/png');
    setFaceCapture(dataUrl);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleSelection(false);
  };

  const handleLogin = () => {
    // Check if role is admin and redirect
    if (selectedRole === 'admin') {
      navigate('/admin-dashboard');
      setPanel(null); // Close the panel
    } else {
      // For other roles, you can add their redirects here
      // For now, just close the panel or show a message
      alert('Login functionality for other roles coming soon');
    }
  };
  
  // --- Helper function to filter courses by selected college ---
  const filteredCourses = availableCourses.filter(course => course.college === formData.college);

  if (!panel) return null;

  return (
    <>
      {/* ... (Login Panel JSX remains the same) */}
      {isLogin ? (
        <>
          {/* Login: Slide-in overlay (omitted for brevity) */}
          <div
            className={`auth-slider-overlay login-overlay ${panel ? 'visible' : ''}`}
            onClick={() => setPanel(null)}
          ></div>
          <div className={`auth-panel login-panel ${panel ? 'visible' : ''}`}>
             {/* ... (Login Form omitted for brevity) ... */}
            <div className="auth-form-container">
              <h2 className="auth-form-title">{title}</h2>
              <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="role">Role</label>
                <select 
                  className="auth-form-input" 
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Administrator</option>
                  <option value="faculty">Faculty</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="email">Email</label>
                <input className="auth-form-input" type="email" id="email" placeholder="example@tup.edu.ph" />
              </div>
              <div className="auth-form-group">
                <label className="auth-form-label" htmlFor="password">Password</label>
                <div className="auth-password-wrapper">
                  <input 
                    className="auth-form-input" 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    placeholder="••••••••" 
                  />
                  <i 
                    className={`auth-password-icon fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>
              <div className="auth-options-row">
                <label className="auth-checkbox-group">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#forgot" className="auth-forgot-link">Forgot Password?</a>
              </div>
              <button className="auth-submit-button" onClick={handleLogin}>Log In</button>
              <p className="auth-switch-prompt">
                Don't have an account?
                <span onClick={() => setPanel('signup')}>
                  &nbsp;Sign Up
                </span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Signup: Centered Modal Overlay */}
          <div
            className="auth-slider-overlay signup-overlay visible"
            onClick={() => setPanel(null)}
          ></div>
          <div class="signup-overlay visible">
          <div class="signup-panel" ref={signupPanelRef}>
              {showRoleSelection ? (
                // ... (Role Selection JSX omitted for brevity)
                <>
                  <h2 className="auth-form-title">Select Your Role</h2>
                  <p className="role-selection-subtitle">Please choose your role to continue</p>
                  <div className="role-cards-grid-auth">
                    <div 
                      className={`role-card-auth admin ${selectedRole === 'admin' ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect('admin')}
                    >
                      <i className="fas fa-user-shield role-icon-auth"></i>
                      <h3>Administrator</h3>
                      <p>Full system control and oversight.</p>
                    </div>
                    <div 
                      className={`role-card-auth faculty ${selectedRole === 'faculty' ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect('faculty')}
                    >
                      <i className="fas fa-chalkboard-teacher role-icon-auth"></i>
                      <h3>Faculty</h3>
                      <p>Access to academic-related features.</p>
                    </div>
                    <div 
                      className={`role-card-auth student ${selectedRole === 'student' ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect('student')}
                    >
                      <i className="fas fa-user-graduate role-icon-auth"></i>
                      <h3>Student</h3>
                      <p>View personal schedules and campus info.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="auth-form-title">{title}</h2>
                  <div className="selected-role-badge">
                    <span>Role: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
                    <button 
                      className="change-role-btn" 
                      onClick={() => setShowRoleSelection(true)}
                    >
                      Change
                    </button>
                  </div>
                  {/* Step Indicators --- EDITED: Use dynamic steps --- */}
                  <div className="signup-step-indicators">
                    {getStepIndicators(selectedRole).map((n, index) => (
                      // Use index + 1 if you want the displayed number to be 1, 2, 3, 4
                      <div key={n} className={`step-circle ${step > n ? "active" : (step === n ? "active" : "")}`}>
                          {/* Display the step number, adjusted for admin skipping step 2 */}
                          {selectedRole === 'admin' ? index + 1 : n}
                      </div>
                    ))}
                  </div>

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="signup-step-container">
                  <h3 className="step-title">Step 1: Personal Information</h3>
                  <div className="signup-step">
                    <div className="auth-form-group">
                      <label>First Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>Middle Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your middle name" 
                        value={formData.middleName}
                        onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                      />
                    </div>
                    {/* --- EDITED 1: TUPM ID Layout adjustment (CSS will fix the line issue) --- */}
                    <div className="auth-form-group">
                      <label>TUPM ID Number</label>
                      <div className="tupm-id-wrapper">
                        <span className="tupm-prefix">TUPM -</span>
                        <input 
                          type="text" 
                          placeholder="YY"
                          maxLength="2"
                          value={formData.tupmYear}
                          onChange={(e) => setFormData({...formData, tupmYear: e.target.value})}
                          className="tupm-year-input"
                        />
                        <span className="tupm-sep">-</span>
                        <input 
                          type="text" 
                          placeholder="####"
                          maxLength="4"
                          value={formData.tupmSerial}
                          onChange={(e) => setFormData({...formData, tupmSerial: e.target.value})}
                          className="tupm-serial-input"
                        />
                      </div>
                    </div>
                    {/* -------------------------------------------------------------------------- */}
                    <div className="auth-form-group full-width">
                      <label>Birthday (MM/DD/YYYY)</label>
                      <input 
                        type="date" 
                        placeholder="MM/DD/YYYY" 
                        value={formData.birthday}
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                        className="birthday-input"
                      />
                    </div>
                    <div className="auth-form-group full-width">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        placeholder="example@tup.edu.ph"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    {/* --- EDITED 2: Contact Number limit and prefix enforcement --- */}
                    <div className="auth-form-group full-width">
                      <label>Contact Number (10 digits after +63)</label>
                      <input 
                        type="tel" 
                        placeholder="9xx xxx xxxx" // Updated placeholder
                        value={formData.contactNumber}
                        onChange={(e) => {
                            let value = e.target.value;
                            // Enforce +63 prefix and limit total length to 13 (+63 + 10 digits)
                            const fixedPrefix = '+63 ';

                            // 1. Ensure the prefix +63  is always present
                            if (!value.startsWith(fixedPrefix)) {
                              // If user types anything, force it to start with the prefix and clean up
                                value = fixedPrefix + value.replace(/[^0-9]/g, '').substring(3); // Keep only new numbers;
                            // Edge case: if value is too short, reset to fixed prefix
                                if (value.length < fixedPrefix.length) {
                                    value = fixedPrefix;
                                }
                            }

                            // 2. Limit total length to 14 characters (+63 + space + 10 numbers)
                            if (value.length > 14) { 
                                value = value.substring(0, 14);
                            }
                            setFormData({...formData, contactNumber: value})
                        }}
                      />
                    </div>
                    {/* ----------------------------------------------------------------- */}
                    <div className="auth-form-group">
                      <label>Street Number</label>
                      <input 
                        type="text" 
                        placeholder="Unit/House No."
                        value={formData.streetNumber}
                        onChange={(e) => setFormData({...formData, streetNumber: e.target.value})}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>Street Name</label>
                      <input 
                        type="text" 
                        placeholder="Street Name"
                        value={formData.streetName}
                        onChange={(e) => setFormData({...formData, streetName: e.target.value})}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>Barangay</label>
                      <input 
                        type="text" 
                        placeholder="Barangay"
                        value={formData.barangay}
                        onChange={(e) => setFormData({...formData, barangay: e.target.value})}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label>City/Municipality</label>
                      <input 
                        type="text" 
                        placeholder="City/Municipality"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <button className="auth-submit-button" onClick={handleNext}>
                    Next
                  </button>
                </div>
              )}

              {/* Step 2: Details (varies by role) - Refactored Student Section */}
              {step === 2 && (
                <div className="signup-step-container">
                  <h3 className="step-title">
                    {selectedRole === 'student' && 'Step 2: Program Student Details'}
                    {selectedRole === 'faculty' && 'Step 2: Faculty Details'}
                    {selectedRole === 'admin' && 'Step 2: Admin Details'}
                  </h3>
                  <div className="signup-step">
                    {selectedRole === 'student' && (
                      <>
                        {/* --- EDITED 3: 1. College Dropdown (First Field) --- */}
                        <div className="auth-form-group full-width">
                          <label>College</label>
                          <select
                            value={formData.college}
                            onChange={(e) => setFormData({...formData, college: e.target.value, courseCode: ''})} // Reset course on college change
                          >
                            <option value="">Select College</option>
                            {collegeOptions.map(col => (
                                <option key={col.code} value={col.code}>{col.name} [{col.code}]</option>
                            ))}
                          </select>
                        </div>
                        {/* --------------------------------------------------- */}
                        
                        <div className="auth-form-group">
                          <label>Year</label>
                          <select
                            value={formData.year}
                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                          >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5">5th Year</option>
                          </select>
                        </div>
                        
                        {/* --- EDITED 3: 2. Section Dropdown --- */}
                        <div className="auth-form-group">
                          <label>Section</label>
                          <select 
                            value={formData.section}
                            onChange={(e) => setFormData({...formData, section: e.target.value})}
                          >
                            <option value="">Select Section</option>
                            {availableSections.map(sec => (
                                <option key={sec} value={sec}>{sec}</option>
                            ))}
                          </select>
                        </div>
                        {/* ----------------------------------- */}

                        {/* --- EDITED 3: 3. Course Dropdown (Dependent on College) --- */}
                        <div className="auth-form-group full-width">
                            <label>Course</label>
                            <select 
                                value={formData.courseCode}
                                onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                                disabled={!formData.college} // Disable if no college is selected
                            >
                                <option value="">Select Course (Based on College)</option>
                                {filteredCourses.map(course => (
                                    <option key={course.code} value={course.code}>{course.name} ({course.code})</option>
                                ))}
                            </select>
                        </div>
                        {/* -------------------------------------------------------- */}

                        <div className="auth-form-group">
                          <label>Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                          >
                            <option value="">Select Status</option>
                            <option value="regular">Regular</option>
                            <option value="irregular">Irregular</option>
                          </select>
                        </div>
                        
                        {/* --- EDITED 3: 4. Added Third Term --- */}
                        <div className="auth-form-group">
                          <label>Term</label>
                          <select
                            value={formData.term}
                            onChange={(e) => setFormData({...formData, term: e.target.value})}
                          >
                            <option value="">Select Term</option>
                            <option value="first-sem">First Semester</option>
                            <option value="second-sem">Second Semester</option>
                            <option value="third-term">Third Semester (Irregular)</option>
                          </select>
                        </div>

                        
                        {/* ----------------------------------- */}
                      </>
                    )}

                    {/* --- EDITED 6: Faculty - Removed Handled Sections, kept College only --- */}
                    {selectedRole === 'faculty' && (
                      <>
                        <div className="auth-form-group full-width">
                          <label>College</label>
                          <select
                            value={formData.college}
                            onChange={(e) => setFormData({...formData, college: e.target.value})}
                          >
                            <option value="">Select College</option>
                            {collegeOptions.map(col => (
                                <option key={col.code} value={col.code}>{col.name} [{col.code}]</option>
                            ))}
                          </select>
                        </div>

                        {/* --- EDITED: New Faculty Status Dropdown --- */}
                        <div className="auth-form-group full-width">
                          <label>Faculty Role</label>
                          <select
                            value={formData.facultyStatus}
                            onChange={(e) => setFormData({...formData, facultyStatus: e.target.value})}
                          >
                            <option value="">Select Role</option>
                            <option value="regular">Regular Faculty Member</option>
                            <option value="head">Department Head</option>
                          </select>
                        </div>
                        
                      </>
                    )}

                    {/* --- EDITED 5: Admin - Removed College Selection --- */}
                    {selectedRole === 'admin' && (
                      <div className="auth-form-group full-width">
                          <p>Administrators have system-wide privileges.</p>
                      </div>
                    )}
                  </div>
                  <div className="step-buttons">
                    <button className="auth-back-button" onClick={handleBack}>Back</button>
                    <button className="auth-submit-button" onClick={handleNext}>Next</button>
                  </div>
                </div>
              )}

              {/* --- EDITED 4: Step 3 is now the Face Capture (Old Step 4) --- */}
              {step === 3 && (
                <div className="signup-step-container">
                  <h3 className="step-title">Step 3: Capture Your Face</h3>
                  <div className="camera-capture-section">
                    <div className="camera-preview">
                      <video ref={videoRef} playsInline muted className="camera-video" />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                    <div className="camera-actions">
                      <button className="auth-submit-button" onClick={handleCapture}>Capture</button>
                      <button className="auth-back-button" onClick={() => setFaceCapture(null)}>Reset</button>
                    </div>
                    {faceCapture && (
                      <div className="captured-preview">
                        <img src={faceCapture} alt="Captured face" className="captured-image" />
                      </div>
                    )}
                  </div>
                  <div className="step-buttons">
                    <button className="auth-back-button" onClick={handleBack}>Back</button>
                    <button className="auth-submit-button" onClick={handleNext} disabled={!faceCapture}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 4: Information Summary & Password Setup */}
              {step === 4 && (
                <div className="signup-step-container">
                  <h3 className="step-title">Step 4: Information Summary & Password Setup</h3>
                  
                  {/* Information Summary */}
                  <div className="summary-section">
                    <h4 className="summary-title summary-title-gray">Registration Summary</h4>
                    <div className="summary-content">
                        {/* ... (Summary Items omitted for brevity) ... */}
                        <div className="summary-item">
                            <span className="summary-label">Name:</span>
                            <span className="summary-value">
                              {formData.firstName || 'N/A'} {formData.middleName || ''} {formData.lastName || 'N/A'}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Email Address:</span>
                            <span className="summary-value">{formData.email || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Contact Number:</span>
                            <span className="summary-value">{formData.contactNumber || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Birthday:</span>
                            <span className="summary-value">{formData.birthday || 'N/A'}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">TUPM ID:</span>
                            <span className="summary-value">
                              {(formData.tupmYear || formData.tupmSerial)
                                ? `TUPM - ${formData.tupmYear || 'YY'} - ${formData.tupmSerial || '####'}`
                                : 'N/A'}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Role:</span>
                            <span className="summary-value">
                              {selectedRole || 'N/A'}
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Address:</span>
                            <span className="summary-value">
                                {`${formData.streetNumber}, ${formData.streetName}, Brgy. ${formData.barangay}, ${formData.city}`}
                            </span>
                        </div>
                        
                        {/* Student Course/College/Year Summary */}
                        {selectedRole === 'student' && (
                            <>
                              <div className="summary-item">
                                  <span className="summary-label">College:</span>
                                  <span className="summary-value">{formData.college || 'N/A'}</span>
                              </div>
                              <div className="summary-item">
                                  <span className="summary-label">Course:</span>
                                  <span className="summary-value">{formData.courseCode || 'N/A'}</span>
                              </div>
                              <div className="summary-item">
                                  <span className="summary-label">Year/Section:</span>
                                  <span className="summary-value">{formData.year} Year / {formData.section}</span>
                              </div>
                            </>
                        )}
                        
                        {/* Faculty Summary (Only College remains) */}
                        {selectedRole === 'faculty' && (
                            <div className="summary-item">
                                <span className="summary-label">College:</span>
                                <span className="summary-value">{formData.college || 'N/A'}</span>
                            </div>
                        )}
                      
                        <div className="summary-item">
                          <span className="summary-label">Face Capture:</span>
                          <span className="summary-value">{faceCapture ? 'Captured' : 'Not captured'}</span>
                        </div>
                    </div>
                  </div>

                  {/* Password Setup */}
                  <div className="password-setup-section">
                    <h4 className="summary-title summary-title-gray">Set Up Password</h4>
                    <div className="signup-step">
                      <div className="auth-form-group full-width">
                        <label>Password</label>
                        <div className="auth-password-wrapper">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <i
                            className={`auth-password-icon fas ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={() => setShowPassword(!showPassword)}
                          ></i>
                        </div>
                      </div>
                      <div className="auth-form-group full-width">
                        <label>Retype Password</label>
                        <div className="auth-password-wrapper">
                          <input
                            type={showRetypePassword ? "text" : "password"}
                            placeholder="Retype your password"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                          />
                          <i
                            className={`auth-password-icon fas ${
                              showRetypePassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={() => setShowRetypePassword(!showRetypePassword)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="step-buttons">
                    <button className="auth-back-button" onClick={handleBack}>Back</button>
                    {/* --- EDITED 3: handleFinish now handles final validation --- */}
                    <button className="auth-submit-button" onClick={handleFinish}>Finish</button>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
// ... (rest of the components: Header, HeroSection, FeatureCard, FeaturesSection, LandingPage)

// ===================================
// --- Header Component ---
// ===================================
const Header = ({ setPanel }) => (
  <header className="header">
    <div className="logo">
      {/* <img src={logoIconUrl} alt="Frames Icon" className="logo-icon" /> */}
      <span>FRAMES</span>
    </div>
    <nav className="nav-links">
      {/* These are now buttons that set the panel state */}
      <button onClick={() => setPanel('login')} className="login-link">Login</button>
      <button onClick={() => setPanel('signup')} className="get-started-button">Get Started</button>
    </nav>
  </header>
);

// ===================================
// --- Hero Section (*** EDITED ***) ---
// ===================================
const HeroSection = () => ( 
  <section className="hero-section" style={{ backgroundImage: `url(${heroImageUrl})` }}>
    <div className="hero-overlay">
      <div className="hero-content">
        <h1 className="hero-title">FRA<span className="hero-title-red">MES</span></h1> {/* EDITED: Added span for 'MES' */}
        <p>
          Revolutionary campus security powered by Raspberry Pi, featuring facial recognition, gesture control, and Real-time monitoring for a safer, smarter educational environment.
        </p>
        <div className="cta-buttons">
          <Link to="/select-role" className="cta-primary">
            <i className="fas fa-lock"></i> Access Portal
          </Link>
          <button className="cta-secondary">
            <i className="fas fa-play-circle"></i> Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ===================================
// --- Features Section ---
// ===================================
const FeatureCard = ({ iconClass, title, description }) => (
    <div className="feature-card">
      <div className="icon-container">
        <i className={iconClass}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
  
const FeaturesSection = () => (
    <section className="features-section">
      <h2>Advanced Features for Campus Security</h2>
      <p className="features-subtitle">
        Our comprehensive system combines cutting-edge AI technology with reliable hardware to deliver unparalleled campus monitoring and access control capabilities.
      </p>
      <div className="features-grid">
        <FeatureCard 
          iconClass="fas fa-user-shield" 
          title="Facial Recognition" 
          description="Advanced AI-powered facial recognition for secure access control and automated attendance tracking across campus facilities."
        />
        <FeatureCard 
          iconClass="fas fa-hand-paper" 
          title="Gesture Control" 
          description="Intuitive hand gesture controls for contactless interaction with campus systems, enhancing hygiene and user experience."
        />
        <FeatureCard 
          iconClass="fas fa-video" 
          title="Real-time Monitoring" 
          description="Continuous surveillance and monitoring of campus activities with instant alerts and comprehensive security coverage."
        />
        <FeatureCard 
          iconClass="fas fa-bell" 
          title="Emergency Alerts" 
          description="Instant emergency notification system with automated threat detection and rapid response coordination capabilities."
        />
      </div>
    </section>
  );

// ===================================
// --- Main Landing Page ---
// ===================================
const LandingPage = () => {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="landing-page">
      <Header setPanel={setActivePanel} />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <AuthPanel panel={activePanel} setPanel={setActivePanel} />
    </div>
  );
};

export default LandingPage;
