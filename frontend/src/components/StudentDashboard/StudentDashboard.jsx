import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import LoggedInHeader from '../ZCommon/LoggedInHeader'; // <-- IMPORT UNIVERSAL HEADER

// --- PLACEHOLDERS (UPDATE THESE PATHS) ---
const STUDENT_AVATAR = '/path/to/student-avatar.png';

// --- THEME & USER DEFINITION ---
const studentTheme = {
    primary: '#dc3545', // Primary Red
    dark: '#c82333',
    lightBg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF'
};

const studentUser = {
    name: 'Michael Chen',
    avatar: STUDENT_AVATAR,
    notifications: 3
};

// ===========================================
// 1. Student Sidebar Component
// ===========================================
const StudentSidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', view: 'dashboard' },
        { name: 'My Profile', icon: 'fas fa-user-circle', view: 'profile' },
        { name: 'Attendance History', icon: 'fas fa-history', view: 'attendance' },
        { name: 'Access Requests', icon: 'fas fa-door-open', view: 'access' },
        { name: 'Notifications', icon: 'fas fa-bell', view: 'notifications', notification: 3 },
        { name: 'Help', icon: 'fas fa-question-circle', view: 'help' },
    ];

    return (
        <aside className="student-sidebar">
            <div className="student-sidebar-toggle">
                <i className="fas fa-bars"></i>
            </div>
            <div className="student-role-tag">
                Student
            </div>
            <nav className="student-nav">
                <ul>
                    {navItems.map((item) => (
                        <li 
                          key={item.name} 
                          className={activeView === item.view ? 'active' : ''}
                          onClick={() => setActiveView(item.view)}
                        >
                            <a href="#">
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                                {item.notification && <span className="notification-badge">{item.notification}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                SmartCampus v2.1.0
            </div>
        </aside>
    );
};

// ===========================================
// 2. All Student Dashboard Components
// ===========================================

// --- Main Dashboard View ---
const StudentDashboardView = () => (
    <div className="student-content-grid">
        <WelcomeBanner />
        <StudentSummaryCards />
        <TodayClasses />
        <StudentRecentAttendance />
        <StudentNotifications />
    </div>
);

const WelcomeBanner = () => (
    <div className="card welcome-banner">
        <div className="welcome-avatar">
            <i className="fas fa-user"></i>
        </div>
        <div className="welcome-info">
            <h3>Welcome back, Michael!</h3>
            <p>Student ID: 2024001</p>
            <p>Face Registration: <span className="status-tag yellow">Pending Completion</span></p>
        </div>
        <button className="complete-registration-button">
            <i className="fas fa-id-card"></i> Complete Registration
        </button>
    </div>
);

const StudentSummaryCard = ({ iconClass, value, title, iconBgClass }) => (
    <div className="card student-summary-card">
        <div className={`summary-icon-container ${iconBgClass}`}>
            <i className={iconClass}></i>
        </div>
        <div className="summary-value">{value}</div>
        <div className="summary-title">{title}</div>
    </div>
);

const StudentSummaryCards = () => (
    <div className="student-summary-cards-container">
        <StudentSummaryCard iconClass="fas fa-user-check" value="89%" title="Attendance Rate" iconBgClass="s-attendance-bg" />
        <StudentSummaryCard iconClass="fas fa-book" value="6" title="Enrolled Courses" iconBgClass="s-courses-bg" />
        <StudentSummaryCard iconClass="fas fa-door-open" value="2" title="Access Requests" iconBgClass="s-access-bg" />
        <StudentSummaryCard iconClass="fas fa-bell" value="3" title="New Notifications" iconBgClass="s-notifications-bg" />
    </div>
);

const ClassItem = ({ time, title, details, status, statusColor }) => (
    <div className="class-item">
        <div className="class-time-dot">
            <span className="dot"></span>
            <span className="time">{time}</span>
        </div>
        <div className="class-details">
            <span className="class-title">{title}</span>
            <span className="class-meta">{details}</span>
        </div>
        <div className="class-status">
            <span style={{ color: statusColor }}>{status}</span>
        </div>
    </div>
);

const TodayClasses = () => (
    <div className="card today-classes">
        <h3>Today's Classes</h3>
        <ClassItem 
            time="09:00 AM" 
            title="Computer Science 101" 
            details="Room A-205 • Dr. Sarah Johnson" 
            status="✓ Present" 
            statusColor="#28a745"
        />
        <ClassItem 
            time="11:00 AM" 
            title="Mathematics" 
            details="Room B-103 • Prof. John Smith" 
            status="In Progress" 
            statusColor="#dc3545"
        />
        <ClassItem 
            time="02:00 PM" 
            title="Physics Lab" 
            details="Lab C-201 • Dr. Emily Brown" 
            status="" 
            statusColor=""
        />
        <ClassItem 
            time="04:00 PM" 
            title="English Literature" 
            details="Room D-305 • Ms. Lisa Wilson" 
            status="" 
            statusColor=""
        />
    </div>
);

const StudentAttendanceItem = ({ day, details, percent, percentColor }) => (
    <div className="student-attendance-item">
        <div className="attendance-details">
            <span className="attendance-day">{day}</span>
            <span className="attendance-time">{details}</span>
        </div>
        <div className="attendance-stats">
            <span className="attendance-percent" style={{ color: percentColor, backgroundColor: `${percentColor}20` }}>
                {percent}
            </span>
        </div>
    </div>
);

const StudentRecentAttendance = () => (
    <div className="card student-recent-attendance">
        <h3>Recent Attendance</h3>
        <StudentAttendanceItem day="Today" details="1/2 classes attended" percent="50%" percentColor="#dc3545" />
        <StudentAttendanceItem day="Yesterday" details="3/3 classes attended" percent="100%" percentColor="#28a745" />
        <StudentAttendanceItem day="Nov 20" details="3/4 classes attended" percent="75%" percentColor="#ffc107" />
        <StudentAttendanceItem day="Nov 19" details="2/2 classes attended" percent="100%" percentColor="#28a745" />
    </div>
);

const StudentNotificationItem = ({ text, time, type }) => (
    <div className="student-notification-item">
        <span className={`alert-type ${type}`}></span>
        <div className="alert-details">
            <div className="alert-description">{text}</div>
            <div className="alert-time">{time}</div>
        </div>
    </div>
);

const StudentNotifications = () => (
    <div className="card student-notifications">
        <h3>Notifications</h3>
        <StudentNotificationItem 
            text="Assignment due tomorrow for CS 101" 
            time="2 hours ago" 
            type="red" 
        />
        <StudentNotificationItem 
            text="Access granted to Library Study Room" 
            time="1 day ago" 
            type="green" 
        />
        <StudentNotificationItem 
            text="Low attendance warning for Physics" 
            time="2 days ago" 
            type="yellow" 
        />
    </div>
);


// --- Mockup Components for other views ---
const MyProfile = () => (
    <div className="card profile-container">
        <h2>My Profile</h2>
        <p>Student profile editing form goes here...</p>
    </div>
);

const AttendanceHistory = () => (
    <div className="card attendance-container">
        <h2>Attendance History</h2>
        <p>A detailed view or calendar of all past attendance records goes here...</p>
    </div>
);

const AccessRequests = () => (
    <div className="card access-container">
        <h2>My Access Requests</h2>
        <p>A list of past and pending requests to access rooms or labs goes here...</p>
    </div>
);

const NotificationsHistory = () => (
    <div className="card notifications-container">
        <h2>All Notifications</h2>
        <p>A list of all past notifications goes here...</p>
    </div>
);

const HelpCenter = () => (
    <div className="card help-container">
        <h2>Help & Support</h2>
        <p>FAQs and support contact information go here...</p>
    </div>
);

// ===========================================
// 3. Main StudentDashboard Component (The Parent)
// ===========================================
const StudentDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <StudentDashboardView />;
            case 'profile':
                return <MyProfile />;
            case 'attendance':
                return <AttendanceHistory />;
            case 'access':
                return <AccessRequests />;
            case 'notifications':
                return <NotificationsHistory />;
            case 'help':
                return <HelpCenter />;
            default:
                return <StudentDashboardView />;
        }
    };

    return (
        <div className="dashboard-container">
            <LoggedInHeader theme={studentTheme} user={studentUser} />
            <div className="dashboard-body">
                <StudentSidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="main-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
