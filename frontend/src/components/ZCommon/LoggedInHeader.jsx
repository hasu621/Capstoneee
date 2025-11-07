import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoggedInHeader.css';

// Using a white logo for dark headers
const LOGO_ICON = '/path/to/shield-icon-white.svg'; 

const LoggedInHeader = ({ theme, user }) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/'); // Go back to landing page
    };

    // --- Dynamic Styles based on theme prop ---
    const headerStyle = {
        backgroundColor: theme.primary,
        borderBottom: `1px solid ${theme.dark}`
    };
    const searchStyle = { backgroundColor: theme.lightBg };
    const textStyle = { color: theme.text };
    const userAvatarStyle = { border: `2px solid ${theme.text}` };
    const iconButtonStyle = { color: theme.text };

    return (
        <header className="universal-header" style={headerStyle}>
            <div className="universal-header-logo" style={textStyle}>
                <img src={LOGO_ICON} alt="Frames Logo" className="header-logo-icon" />
                <span>FRAMES</span>
            </div>
            
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
                <button className="icon-button" style={iconButtonStyle}>
                    <i className="fas fa-bell"></i>
                    {user.notifications > 0 && (
                        <span className="notification-dot" style={{borderColor: theme.primary}}>
                            {user.notifications}
                        </span>
                    )}
                </button>
                
                {/* --- THIS IS THE LOGOUT BUTTON --- */}
                <button 
                    className="header-logout-button" 
                    onClick={handleLogout} 
                    style={iconButtonStyle}
                >
                    <i className="fas fa-sign-out-alt"></i>
                </button>
                {/* --- END LOGOUT BUTTON --- */}
                
                <div className="user-menu" style={textStyle}>
                    <img 
                        src={user.avatar} 
                        alt="User Avatar" 
                        className="user-avatar" 
                        style={userAvatarStyle} 
                    />
                    <span className="user-role">{user.name}</span>
                    <i className="fas fa-chevron-down dropdown-icon"></i>
                </div>
            </div>
        </header>
    );
};

export default LoggedInHeader;

