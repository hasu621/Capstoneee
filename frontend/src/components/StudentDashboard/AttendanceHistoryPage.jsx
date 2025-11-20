import React from 'react';
import './AttendanceHistoryPage.css'; // Use the new page-specific CSS

// Component for the top summary cards
const SummaryCard = ({ value, title, subtitle, colorClass }) => (
    <div className={`card attendance-summary-card`}>
        <div className={`summary-value ${colorClass}`}>{value}</div>
        <div className="summary-title">{title}</div>
        {/* Subtitle uses the same color class for consistency with the design */}
        {subtitle && <div className={`summary-subtitle ${colorClass}`}>{subtitle}</div>}
    </div>
);

// Component for a single course row
const CourseAttendanceItem = ({ title, code, attended, total, percentage, barColor }) => {
    return (
        <div className="course-attendance-item">
            <div className="course-details">
                <span className="course-title">{title}</span>
                <span className="course-meta">{code} • {attended}/{total} classes</span>
            </div>
            <div className="attendance-bar-container">
                <div 
                    className="attendance-bar" 
                    style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: barColor 
                    }}
                ></div>
            </div>
            <div className="attendance-percentage" style={{ color: barColor }}>
                {percentage}%
            </div>
        </div>
    );
};


const AttendanceHistoryPage = () => {
    // Dummy Data for the Summary
    const overallStats = {
        percentage: 89,
        attended: 127,
        total: 143,
        absences: 16,
        excused: 3
    };

    // Color mapping based on the image design
    const GreenBar = "#4CAF50"; 
    const YellowBar = "#FFC107"; 
    // Let's add a red bar for low attendance
    const RedBar = "#dc3545";

    // Dummy Data for Course-wise Attendance
    const courseData = [
        { title: "Computer Science 101", code: "CS101", attended: 28, total: 30, percentage: 93, barColor: GreenBar }, 
        { title: "Mathematics", code: "MATH201", attended: 25, total: 28, percentage: 89, barColor: YellowBar }, 
        { title: "Physics Lab", code: "PHYS301", attended: 22, total: 26, percentage: 85, barColor: YellowBar }, 
        { title: "English Literature", code: "ENG101", attended: 24, total: 26, percentage: 92, barColor: GreenBar }, 
        { title: "Data Structures", code: "CS201", attended: 20, total: 24, percentage: 83, barColor: YellowBar }, 
        { title: "Chemistry", code: "CHEM101", attended: 18, total: 22, percentage: 82, barColor: YellowBar },
        { title: "Physical Education", code: "PE101", attended: 10, total: 20, percentage: 50, barColor: RedBar },
    ];

    return (
        <div className="attendance-history-view">
                
            <div className="attendance-header">
                <h2>Attendance History</h2>
                <div className="header-actions">
                    <select className="semester-select">
                        <option>This Semester</option>
                        <option>Last Semester</option>
                    </select>
                    <button className="export-button">
                        <i className="fas fa-file-export"></i> Export Report
                    </button>
                </div>
            </div>

            {/* --- Summary Cards --- */}
            <div className="attendance-summary-container">
                <SummaryCard 
                    value={`${overallStats.percentage}%`} 
                    title="Overall Attendance" 
                    subtitle="Above average"
                    colorClass="green-text"
                />
                <SummaryCard 
                    value={overallStats.attended} 
                    title="Classes Attended" 
                    subtitle={`Out of ${overallStats.total} total`}
                    colorClass="blue-text"
                />
                <SummaryCard 
                    value={overallStats.absences} 
                    title="Absences" 
                    subtitle={`${overallStats.excused} excused`}
                    colorClass="red-text"
                />
            </div>

            {/* --- Course-wise Attendance --- */}
            <div className="card course-attendance-section">
                <h3>Course-wise Attendance</h3>
                <div className="course-list">
                    {courseData.map((course, index) => (
                        <CourseAttendanceItem 
                            key={index}
                            title={course.title}
                            code={course.code}
                            attended={course.attended}
                            total={course.total}
                            percentage={course.percentage}
                            barColor={course.barColor}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AttendanceHistoryPage;