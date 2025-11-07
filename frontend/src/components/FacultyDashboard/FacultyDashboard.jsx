import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './FacultyDashboard.css';
import LoggedInHeader from '../ZCommon/LoggedInHeader'; // <-- IMPORT UNIVERSAL HEADER

// --- PLACEHOLDERS (UPDATE THESE PATHS) ---
const FACULTY_AVATAR = '/path/to/faculty-avatar.png';

// --- THEME & USER DEFINITION ---
const facultyTheme = {
    primary: '#dc3545', // Primary Red
    dark: '#c82333',
    lightBg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF'
};

const facultyUser = {
    name: 'Dr. Sarah Johnson',
    avatar: FACULTY_AVATAR,
    notifications: 2
};

// ===========================================
// 1. Faculty Sidebar Component
// ===========================================
const FacultySidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', view: 'dashboard' },
        { name: 'My Classes', icon: 'fas fa-book-reader', view: 'classes' },
        { name: 'Attendance', icon: 'fas fa-user-check', view: 'attendance' },
        { name: 'Reports', icon: 'fas fa-chart-bar', view: 'reports', notification: 2 },
        { name: 'Profile', icon: 'fas fa-user-circle', view: 'profile' },
    ];

    return (
        <aside className="faculty-sidebar">
            <div className="faculty-sidebar-toggle">
                <i className="fas fa-bars"></i>
            </div>
            <div className="faculty-role-tag">
                Faculty Member
            </div>
            <nav className="faculty-nav">
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
// 2. All REAL Faculty Components (Restored)
// ===========================================

// --- Faculty Dashboard View ---
const FacultyDashboardView = () => (
    <div className="faculty-content-grid">
        <FacultySummaryCards />
        <TodaySchedule />
        <RecentAttendance />
        <ClassroomAlerts />
    </div>
);

const FacultySummaryCard = ({ iconClass, title, value, subValue, subValueColor, iconBgClass }) => (
    <div className="card summary-card">
        <div className={`summary-icon-container ${iconBgClass}`}>
            <i className={iconClass}></i>
        </div>
        <div className="summary-content">
            <div className="summary-title">{title}</div>
            <div className="summary-value">{value}</div>
            {subValue && (
                <div className="summary-sub-value" style={{ color: subValueColor }}>
                    {subValue}
                </div>
            )}
        </div>
    </div>
);

const FacultySummaryCards = () => (
    <div className="summary-cards-container">
        <FacultySummaryCard iconClass="fas fa-calendar-day" title="Today's Classes" value="5" subValue="2 upcoming" subValueColor="#1a73e8" iconBgClass="f-classes-bg" />
        <FacultySummaryCard iconClass="fas fa-user-check" title="Attendance Rate" value="87%" subValue="+3% vs last week" subValueColor="#28a745" iconBgClass="f-attendance-bg" />
        <FacultySummaryCard iconClass="fas fa-users" title="Total Students" value="156" subValue="Across 3 courses" subValueColor="#555" iconBgClass="f-students-bg" />
        <FacultySummaryCard iconClass="fas fa-bell" title="Pending Alerts" value="2" subValue="Requires attention" subValueColor="#dc3545" iconBgClass="f-alerts-bg" />
    </div>
);

const ScheduleItem = ({ time, title, details, showMonitor }) => (
    <div className="schedule-item">
        <div className="schedule-time-dot">
            <span className="dot"></span>
            <span className="time">{time}</span>
        </div>
        <div className="schedule-details">
            <span className="schedule-title">{title}</span>
            <span className="schedule-meta">{details}</span>
        </div>
        <div className="schedule-actions">
            <button className="schedule-button view-button">
                <i className="fas fa-eye"></i> View
            </button>
            {showMonitor && (
                <button className="schedule-button monitor-button">
                    <i className="fas fa-video"></i> Monitor
                </button>
            )}
        </div>
    </div>
);

const TodaySchedule = () => (
    <div className="card today-schedule">
        <h3>Today's Schedule</h3>
        <div className="schedule-list">
            <ScheduleItem time="09:00 - 10:30" title="Computer Science 101" details="Room A-205 • 32 students" showMonitor={false} />
            <ScheduleItem time="11:00 - 12:30" title="Data Structures" details="Room B-301 • 28 students" showMonitor={false} />
            <ScheduleItem time="02:00 - 03:30" title="Algorithms" details="Room A-205 • 25 students" showMonitor={true} />
            <ScheduleItem time="04:00 - 05:30" title="Software Engineering" details="Lab C-102 • 30 students" showMonitor={true} />
        </div>
    </div>
);

const AttendanceItem = ({ title, time, ratio, percent, percentColor }) => (
    <div className="attendance-item">
        <div className="attendance-details">
            <span className="attendance-title">{title}</span>
            <span className="attendance-time">{time}</span>
        </div>
        <div className="attendance-stats">
            <span className="attendance-ratio">{ratio}</span>
            <span className="attendance-percent" style={{ color: percentColor }}>{percent}</span>
        </div>
    </div>
);

const RecentAttendance = () => (
    <div className="card recent-attendance">
        <h3>Recent Attendance</h3>
        <AttendanceItem title="Computer Science 101" time="Today, 9:00 AM" ratio="30/32" percent="94%" percentColor="#28a745" />
        <AttendanceItem title="Data Structures" time="Yesterday, 11:00 AM" ratio="26/28" percent="93%" percentColor="#28a745" />
        <AttendanceItem title="Algorithms" time="Yesterday, 2:00 PM" ratio="22/25" percent="88%" percentColor="#ffc107" />
    </div>
);

const ClassroomAlerts = () => (
    <div className="card classroom-alerts">
        <h3>Classroom Alerts</h3>
        <div className="alert-item">
            <span className="alert-type yellow"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>High occupancy in Room A-205</strong></div>
                <div className="alert-time">15 min ago</div>
            </div>
        </div>
        <div className="alert-item">
            <span className="alert-type blue"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>New student registered for CS 101</strong></div>
                <div className="alert-time">1 hour ago</div>
            </div>
        </div>
        <div className="alert-item">
            <span className="alert-type green"></span>
            <div className="alert-details">
                <div className="alert-description"><strong>Perfect attendance recorded</strong></div>
                <div className="alert-time">2 hours ago</div>
            </div>
        </div>
    </div>
);

// --- My Classes View ---
const MyClasses = () => (
    <div className="card classes-container">
        <h2>My Classes</h2>
        <div className="classes-grid">
            <div className="class-card"><h3>Computer Science 101</h3><p>32 Students</p><button className="schedule-button view-button">View Roster</button></div>
            <div className="class-card"><h3>Data Structures</h3><p>28 Students</p><button className="schedule-button view-button">View Roster</button></div>
            <div className="class-card"><h3>Algorithms</h3><p>25 Students</p><button className="schedule-button view-button">View Roster</button></div>
            <div className="class-card"><h3>Software Engineering</h3><p>30 Students</p><button className="schedule-button view-button">View Roster</button></div>
        </div>
    </div>
);

// --- Attendance View ---
const Attendance = () => (
    <div className="card attendance-container">
        <h2>Attendance Management</h2>
        <p>Detailed attendance view goes here...</p>
    </div>
);

// --- Faculty Reports View ---
const FacultyReports = () => (
    <div className="card reports-container">
        <h2>My Reports</h2>
        <p>Faculty-specific reports go here...</p>
    </div>
);

// --- Faculty Profile View ---
const FacultyProfile = () => (
    <div className="card profile-container">
        <h2>My Profile</h2>
        <p>Faculty profile editing form goes here...</p>
    </div>
);

// ===========================================
// 3. Main FacultyDashboard Component (The Parent)
// ===========================================
const FacultyDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <FacultyDashboardView />;
            case 'classes':
                return <MyClasses />;
            case 'attendance':
                return <Attendance />;
            case 'reports':
                return <FacultyReports />;
            case 'profile':
                return <FacultyProfile />;
            default:
                return <FacultyDashboardView />;
        }
    };

    return (
        <div className="dashboard-container">
            <LoggedInHeader theme={facultyTheme} user={facultyUser} />
            <div className="dashboard-body">
                <FacultySidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="main-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;

