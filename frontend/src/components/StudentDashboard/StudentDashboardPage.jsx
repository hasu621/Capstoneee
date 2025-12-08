import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './StudentDashboardPage.css';

// --- COMPONENTS (Reusable) ---

const WelcomeBanner = ({ studentName, studentId }) => (
    <div className="card welcome-banner">
        <div className="welcome-avatar">
            <i className="fas fa-user"></i>
        </div>
        <div className="welcome-info">
            <h3>Welcome back, {studentName}!</h3>
            <p>Student ID: {studentId}</p>
            <p>Face Registration: <span className="status-tag green">Registered</span></p>
        </div>
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

const StudentSummaryCards = ({ stats }) => (
    <div className="student-summary-cards-container">
        <StudentSummaryCard iconClass="fas fa-user-check" value={stats.attendanceRate} title="Attendance Rate" iconBgClass="s-attendance-bg" />
        <StudentSummaryCard iconClass="fas fa-book" value={stats.courses} title="Enrolled Courses" iconBgClass="s-courses-bg" />
        <StudentSummaryCard iconClass="fas fa-door-open" value="Active" title="Gate Access" iconBgClass="s-access-bg" />
        <StudentSummaryCard iconClass="fas fa-bell" value={stats.notifCount} title="New Notifications" iconBgClass="s-notifications-bg" />
    </div>
);

const StudentRecentAttendance = ({ logs }) => (
    <div className="card student-recent-attendance">
        <h3>Recent Attendance</h3>
        {logs.length > 0 ? (
            logs.map((log, index) => (
                <div key={index} className="student-attendance-item">
                    <div className="attendance-details">
                        <span className="attendance-day">{new Date(log.timestamp).toLocaleDateString()}</span>
                        <span className="attendance-time">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {log.course_name || 'Gate Entry'}
                        </span>
                    </div>
                    <div className="attendance-stats">
                        <span className="attendance-percent" style={{ color: '#28a745', backgroundColor: '#e6f7ec' }}>
                            Present
                        </span>
                    </div>
                </div>
            ))
        ) : (
            <p style={{color: '#888', padding: '10px'}}>No recent records found.</p>
        )}
    </div>
);

const StudentNotifications = ({ notifications }) => (
    <div className="card student-notifications">
        <h3>Notifications</h3>
        {notifications.length > 0 ? (
            notifications.map((notif, index) => (
                <div key={index} className="student-notification-item">
                    <span className={`alert-type ${notif.is_read ? 'green' : 'red'}`}></span>
                    <div className="alert-details">
                        <div className="alert-description">{notif.message}</div>
                        <div className="alert-time">{new Date(notif.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            ))
        ) : (
            <p style={{color: '#888', padding: '10px'}}>No new notifications.</p>
        )}
    </div>
);

// --- MAIN PAGE COMPONENT ---
const StudentDashboardPage = () => {
    // 1. STATE MANAGEMENT
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        attendance_rate: "0%",
        enrolled_courses: 0,
        notifications: [],
        recent_attendance: []
    });
    const [userData, setUserData] = useState({ firstName: "Student", tupm_id: "..." });

    // 2. FETCH DATA ON LOAD
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get User ID from Login Session
                const storedUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!storedUser) {
                    alert("Please log in first!");
                    return; // Or redirect
                }
                setUserData(storedUser);

                // Call Backend API
                const response = await axios.get(`http://localhost:5000/api/student/dashboard/${storedUser.user_id}`);
                setDashboardData(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching dashboard:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{padding: '40px'}}>Loading Dashboard...</div>;

    return (
        <div className="student-content-grid">
            <WelcomeBanner studentName={userData.firstName} studentId={userData.tupm_id} />
            
            <StudentSummaryCards stats={{
                attendanceRate: dashboardData.attendance_rate,
                courses: dashboardData.enrolled_courses,
                notifCount: dashboardData.notifications.filter(n => !n.is_read).length
            }} />
            
            <StudentRecentAttendance logs={dashboardData.recent_attendance} />
            <StudentNotifications notifications={dashboardData.notifications} />
        </div>
    );
};

export default StudentDashboardPage;