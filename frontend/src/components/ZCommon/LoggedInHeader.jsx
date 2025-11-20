import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoggedInHeader.css';

// Using a white logo for dark headers
// Make sure this path is correct in your `public` folder or import it
const LOGO_ICON = '/shield-icon-white.svg'; 

// --- Mock Notification Data ---
const mockNotifications = [
    { id: 1, icon: 'fas fa-user-shield', text: 'New admin alert: Unauthorized access attempt.', time: '5m ago', read: false },
    { id: 2, icon: 'fas fa-chalkboard-teacher', text: 'Prof. Cruz updated CS 101 grades.', time: '1h ago', read: false },
    { id: 3, icon: 'fas fa-calendar-check', text: 'Your room booking for tomorrow is confirmed.', time: '3h ago', read: true },
    { id: 4, icon: 'fas fa-exclamation-triangle', text: 'System Maintenance is scheduled for 8 PM.', time: '1d ago', read: true },
];

const LoggedInHeader = ({ theme, user }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // --- Refs for click-outside detection ---
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    
    const handleLogout = () => {
        navigate('/'); // Go back to landing page
    };

    // --- Toggle Handlers ---
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsNotificationOpen(false); // Close other dropdown
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
        setIsProfileOpen(false); // Close other dropdown
    };

    // --- Click-outside listener ---
    useEffect(() => {
        // Function to handle clicks
        const handleClickOutside = (event) => {
            // Close profile dropdown if click is outside
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            // Close notification dropdown if click is outside
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        // Add event listener to the whole document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove the listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array means this runs once on mount

    // --- Dynamic Styles based on theme prop ---
    const headerStyle = {
        backgroundColor: theme.primary,
        borderBottom: `1px solid ${theme.dark}`
    };
    const searchStyle = { backgroundColor: theme.lightBg };
    const textStyle = { color: theme.text };
    const userAvatarStyle = { border: `2px solid ${theme.text}` };
    const iconButtonStyle = { color: theme.text, backgroundColor: theme.lightBg };
    
    const dropdownStyle = { 
        backgroundColor: '#FFFFFF', 
        border: '1px solid #EEEEEE'
    };
    const dropdownItemStyle = { color: '#333333' };


    return (
        <header className="universal-header" style={headerStyle}>
            
            {/* --- EDITED: Logo and Title are now a Link --- */}
            <Link to="/" className="header-logo-link" style={textStyle}>
                <div className="universal-header-logo">
                    <img src={LOGO_ICON} alt="Frames Logo" className="header-logo-icon" />
                    <span>FRAMES</span>
                </div>
            </Link>
            {/* --- END EDIT --- */}

            <div className="universal-search-bar" style={searchStyle}>
                <i className="fas fa-search" style={{...textStyle, opacity: 0.7}}></i>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    style={textStyle}
                    className="universal-search-input"
                />
            </div>

            <div className="universal-header-actions">
                {/* --- Notification Dropdown --- */}
                <div className="notification-bell-container" ref={notificationRef}>
                    <button 
                        className="icon-button circular-icon-button" 
                        style={iconButtonStyle}
                        onClick={toggleNotifications}
                    >
                        <i className="fas fa-bell"></i>
                        {user.notifications > 0 && (
                            <span className="notification-dot" style={{borderColor: theme.primary}}>
                                {user.notifications}
                            </span>
                        )}
                    </button>

                    {isNotificationOpen && (
                        <div className="notification-dropdown-menu" style={dropdownStyle}>
                            <div className="notification-dropdown-header">
                                <h3>Notifications</h3>
                                <span className="mark-as-read">Mark all as read</span>
                            </div>
                            <div className="notification-list">
                                {mockNotifications.map(notif => (
                                    <div 
                                        key={notif.id} 
                                        className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                                    >
                                        <div className={`notification-icon-bg ${notif.read ? 'read' : ''}`}>
                                            <i className={notif.icon}></i>
                                        </div>
                                        <div className="notification-content">
                                            <p className="notification-text">{notif.text}</p>
                                            <span className="notification-time">{notif.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="notification-dropdown-footer">
                                <Link to="/notifications">View All Notifications</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Profile Dropdown --- */}
                <div className="profile-menu-container" ref={profileRef}>
                    <div 
                        className="user-menu" 
                        style={textStyle} 
                        onClick={toggleProfile}
                    >
                        <img 
                            src={user.avatar} 
                            alt="User Avatar" 
                            className="user-avatar" 
                            style={userAvatarStyle} 
                        />
                        <span className="user-role">{user.name}</span>
                        <i className={`fas fa-chevron-down dropdown-icon ${isProfileOpen ? 'open' : ''}`}></i>
                    </div>

                    {isProfileOpen && (
                        <div className="header-dropdown-menu" style={dropdownStyle}>
                            <Link to="/profile" className="header-dropdown-item" style={dropdownItemStyle}>
                                <i className="fas fa-user"></i> My Profile
                            </Link>
                            <Link to="/help-support" className="header-dropdown-item" style={dropdownItemStyle}>
                                <i className="fas fa-question-circle"></i> Help & Support
                            </Link>
                            <Link to="/settings" className="header-dropdown-item" style={dropdownItemStyle}>
                                <i className="fas fa-cog"></i> Settings
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="header-dropdown-item dropdown-logout-button" 
                                style={dropdownItemStyle}
                            >
                                <i className="fas fa-sign-out-alt"></i> Log-out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default LoggedInHeader;