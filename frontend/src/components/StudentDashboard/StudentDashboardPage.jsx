import React from 'react';
import './StudentDashboardPage.css'; // New CSS file for this page

// ===========================================
// All Student Dashboard Page Components
// ===========================================

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

// Note: TodayClasses is now its own page (SchedulePage)
// We are leaving these two here as they are "dashboard" widgets.

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


// --- Main Dashboard Page Component ---
const StudentDashboardPage = () => (
    <div className="student-content-grid">
        <WelcomeBanner />
        <StudentSummaryCards />
        {/* TodayClasses component is removed, as it's now on SchedulePage */}
        <StudentRecentAttendance />
        <StudentNotifications />
    </div>
);

export default StudentDashboardPage;