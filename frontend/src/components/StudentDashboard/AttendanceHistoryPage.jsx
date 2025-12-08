import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceHistoryPage.css';

// --- COMPONENTS ---
const SummaryCard = ({ value, title, subtitle, colorClass }) => (
    <div className={`card attendance-summary-card`}>
        <div className={`summary-value ${colorClass}`}>{value}</div>
        <div className="summary-title">{title}</div>
        {subtitle && <div className={`summary-subtitle ${colorClass}`}>{subtitle}</div>}
    </div>
);

const CourseAttendanceItem = ({ title, code, attended, total, percentage, barColor }) => (
    <div className="course-attendance-item">
        <div className="course-details">
            <span className="course-title">{title}</span>
            <span className="course-meta">{code} • {attended}/{total} classes</span>
        </div>
        <div className="attendance-bar-container">
            <div className="attendance-bar" style={{ width: `${percentage}%`, backgroundColor: barColor }}></div>
        </div>
        <div className="attendance-percentage" style={{ color: barColor }}>{percentage}%</div>
    </div>
);

// --- MAIN PAGE ---
const AttendanceHistoryPage = () => {
    // UI State
    const [selectedSemester, setSelectedSemester] = useState("This Semester");
    const [selectedReportType, setSelectedReportType] = useState("OVERALL_SUMMARY"); 
    const [selectedSubject, setSelectedSubject] = useState("ALL_SUBJECTS"); 
    const [loading, setLoading] = useState(true);

    // Data State
    const [rawLogs, setRawLogs] = useState([]); // All logs from DB
    const [displayedLogs, setDisplayedLogs] = useState([]); // Filtered logs for table
    const [courseStats, setCourseStats] = useState([]); // List of courses & stats
    const [summary, setSummary] = useState({ rate: 0, present: 0, absent: 0 });

    const reportOptions = [
        { label: "Overall Semestral Summary (All Subjects)", value: "OVERALL_SUMMARY", requiresSubject: false },
        { label: "Personal Attendance Records", value: "PERSONAL_RECORDS", requiresSubject: false },
        { label: "Daily Attendance Report (Per Subject)", value: "DAILY_REPORT_SUBJECT", requiresSubject: true },
        { label: "Weekly Attendance Summary (Per Subject)", value: "WEEKLY_SUMMARY_SUBJECT", requiresSubject: true },
        { label: "Semestral Attendance Report (Per Subject)", value: "SEM_REPORT_SUBJECT", requiresSubject: true },
        { label: "Monthly Attendance Trends", value: "MONTHLY_TRENDS", requiresSubject: false },
        { label: "Attendance History Log (30 Days Validity)", value: "HISTORY_LOG_30D", requiresSubject: false },
        { label: "Personal Late Arrival Report", value: "LATE_ARRIVAL_REPORT", requiresSubject: false },
        { label: "Break Duration Log", value: "BREAK_LOG", requiresSubject: false },
        { label: "Personal Consistency Index (Smart Insight)", value: "CONSISTENCY_INDEX", requiresSubject: false },
    ];

    const showSubjectSelect = reportOptions.find(opt => opt.value === selectedReportType)?.requiresSubject;
    const isGenerateDisabled = showSubjectSelect && selectedSubject === "ALL_SUBJECTS";

    // --- 1. FETCH DATA ON LOAD ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!storedUser) return;

                // A. Get Logs History
                const historyRes = await axios.get(`http://localhost:5000/api/student/history/${storedUser.user_id}`);
                setRawLogs(historyRes.data);
                setDisplayedLogs(historyRes.data);

                // B. Get Enrolled Courses (via Schedule API trick to get unique courses)
                const schedRes = await axios.get(`http://localhost:5000/api/student/schedule/${storedUser.user_id}`);
                
                // Get unique courses from schedule
                const uniqueCourses = [];
                const courseCodes = new Set();
                
                schedRes.data.forEach(item => {
                    if (!courseCodes.has(item.course_code)) {
                        courseCodes.add(item.course_code);
                        uniqueCourses.push({
                            title: item.course_name,
                            code: item.course_code
                        });
                    }
                });

                // C. Calculate Stats Per Course (Mock logic for now, since we need complex joins)
                const stats = uniqueCourses.map(course => ({
                    ...course,
                    attended: Math.floor(Math.random() * 15) + 1, // Mock data
                    total: 20, // Mock total
                    percentage: 85 + Math.floor(Math.random() * 10), // Mock %
                    barColor: '#4CAF50'
                }));
                setCourseStats(stats);

                // D. Calculate Overall Summary
                const presentCount = historyRes.data.filter(l => l.event_type === 'attendance_in').length;
                setSummary({
                    rate: 92, // Mock average
                    present: presentCount,
                    absent: 2 // Mock
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- 2. FILTER LOGS WHEN SUBJECT CHANGES ---
    useEffect(() => {
        if (selectedSubject === "ALL_SUBJECTS") {
            setDisplayedLogs(rawLogs);
        } else {
            // Note: Since 'room_name' lang meron sa logs at hindi course_code directly (complex join needed in DB),
            // we will simulate filtering. In a real app, logs table should have course_id.
            // For now, let's just show all logs but pretend. Or filter by room if logic allows.
            setDisplayedLogs(rawLogs); 
        }
    }, [selectedSubject, rawLogs]);

    const handleExportReport = () => {
        alert(`Generating Report: ${selectedReportType} for ${selectedSemester}`);
    };

    if (loading) return <div style={{padding:'30px'}}>Loading Attendance Records...</div>;

    return (
        <div className="attendance-history-view">
            {/* --- REPORT CONTROLS (Restored) --- */}
            <div className="report-controls-row">
                <div className="report-filters">
                    <select 
                        className="app-select semester-select" 
                        value={selectedSemester} 
                        onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                        <option value="This Semester">This Semester</option>
                        <option value="Last Semester">Last Semester</option>
                    </select>

                    <select 
                        className="app-select report-type-select" 
                        value={selectedReportType} 
                        onChange={(e) => setSelectedReportType(e.target.value)}
                    >
                        {reportOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {showSubjectSelect && (
                        <select 
                            className="app-select subject-select" 
                            value={selectedSubject} 
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="ALL_SUBJECTS">All Subjects</option>
                            {courseStats.map(course => (
                                <option key={course.code} value={course.code}>
                                    {course.title} ({course.code})
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <button className="export-button" onClick={handleExportReport} disabled={isGenerateDisabled}>
                    <i className="fas fa-file-export"></i> Generate Report
                </button>
            </div>

            {/* --- SUMMARY CARDS --- */}
            <div className="attendance-summary-container">
                <SummaryCard value={`${summary.rate}%`} title="Overall Attendance" subtitle="Good Standing" colorClass="green-text" />
                <SummaryCard value={summary.present} title="Present" subtitle="Total Logs Recorded" colorClass="blue-text" />
                <SummaryCard value={summary.absent} title="Absences" subtitle="Classes Missed" colorClass="red-text" />
            </div>

            {/* --- COURSE LIST (Dynamic) --- */}
            <div className="card course-attendance-section">
                <h3>Course-wise Attendance</h3>
                <div className="course-list">
                    {courseStats.length > 0 ? (
                        courseStats.map((course, index) => (
                            <CourseAttendanceItem
                                key={index}
                                title={course.title}
                                code={course.code}
                                attended={course.attended}
                                total={course.total}
                                percentage={course.percentage}
                                barColor={course.barColor}
                            />
                        ))
                    ) : (
                        <p style={{color:'#777', padding:'10px'}}>No enrolled courses found.</p>
                    )}
                </div>
            </div>

            {/* --- DETAILED LOGS TABLE (Replaces Modal for better visibility) --- */}
            <div className="card course-attendance-section">
                <h3>Recent Activity Logs</h3>
                <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                        <thead>
                            <tr style={{textAlign:'left', borderBottom:'2px solid #eee'}}>
                                <th style={{padding:'10px'}}>Date & Time</th>
                                <th style={{padding:'10px'}}>Location</th>
                                <th style={{padding:'10px'}}>Status</th>
                                <th style={{padding:'10px'}}>Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedLogs.map((log, index) => (
                                <tr key={index} style={{borderBottom:'1px solid #f0f0f0'}}>
                                    <td style={{padding:'12px'}}>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td style={{padding:'12px'}}>{log.room_name || 'Main Gate'}</td>
                                    <td style={{padding:'12px'}}>
                                        <span style={{
                                            padding:'4px 8px', 
                                            borderRadius:'4px', 
                                            backgroundColor: log.event_type==='attendance_in'?'#e6f7ec':'#fff3cd',
                                            color: log.event_type==='attendance_in'?'#28a745':'#856404',
                                            fontWeight:'500', fontSize:'0.85em'
                                        }}>
                                            {log.event_type === 'attendance_in' ? 'PRESENT' : 'ALERT'}
                                        </span>
                                    </td>
                                    <td style={{padding:'12px'}}>{log.confidence_score}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceHistoryPage;