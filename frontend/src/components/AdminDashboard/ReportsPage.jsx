import React, { useState } from 'react';
import './ReportsPage.css'; // New CSS file for this page

// ===========================================
// Report Data Catalog
// ===========================================
// All requested reports organized by category
const reportCatalog = {
    attendance: {
        icon: 'fa-users',
        title: 'Attendance Reports',
        description: 'Organizational reports on attendance rates and lateness.',
        color: 'blue',
        types: [
            { name: 'Attendance Summary Report', desc: 'Summary for Students, Faculty, Sections, and Departments.', filterTarget: ['organization'] },
            { name: 'Late Arrival/Early Exit Log', desc: 'Detects habitual lateness or premature logouts across all users.', filterTarget: ['user', 'section'] },
            { name: 'Missed Attendance Check', desc: 'Cross-checks data inconsistencies (Present in Break, Not in Class).', filterTarget: ['system'] },
        ]
    },
    security: {
        icon: 'fa-shield-alt',
        title: 'Security Auditing & Access',
        description: 'Comprehensive logs on access attempts and security anomalies.',
        color: 'red',
        types: [
            { name: 'Recognized User Access Log', desc: 'Tracks all facial scan attempts for verified users.', filterTarget: ['user'] },
            { name: 'Unrecognized User/Access Log', desc: 'Tracks entry attempts from non-registered individuals.', filterTarget: ['system'] },
            { name: 'Spoof Attempt Detection', desc: 'Captures mismatched recognition attempts for security alerts.', filterTarget: ['system'] },
            { name: 'System Activity Audit', desc: 'Logs all administrative actions (add/edit users, export data).', filterTarget: ['user'] },
            { name: 'Security Breach Patterns', desc: 'Detects suspicious access frequency by location or time pattern.', filterTarget: ['system'] },
        ]
    },
    usage: {
        icon: 'fa-chart-pie',
        title: 'Utilization & Analytics',
        description: 'Insights into room utilization, break trends, and system performance.',
        color: 'purple',
        types: [
            { name: 'Room Occupancy Reports', desc: 'Displays per-room and per-building utilization rates.', filterTarget: ['room'] },
            { name: 'Room Utilization vs. Schedule', desc: 'Detects empty scheduled rooms or underutilized spaces.', filterTarget: ['room', 'section'] },
            { name: 'Overcrowding Reports', desc: 'Safety and resource optimization alerts.', filterTarget: ['room'] },
            { name: 'Break Abuse/Extended Break Log', desc: 'Monitors behavioral anomalies for policy enforcement.', filterTarget: ['user'] },
            { name: 'System Error and Recognition Trend', desc: 'Summarizes error rates per room or lighting condition.', filterTarget: ['system'] },
            { name: 'Gesture Usage Frequency Analysis', desc: 'Determines which gestures are most/least used.', filterTarget: ['system'] },
        ]
    },
};

// --- Reusable Components (Used in JSX) ---

const ReportTag = ({ text, colorClass }) => (
    <span className={`report-tag ${colorClass}`}>{text}</span>
);
const StatusTag = ({ text, colorClass }) => (
    <span className={`status-tag ${colorClass}`}>{text}</span>
);

/**
 * A reusable card for the top grid
 */
const ReportTypeCard = ({ category, onOpen }) => (
    <div className="card report-type-card" onClick={() => onOpen(category)}>
        <div className={`report-type-icon ${category.color}-bg`}>
            <i className={`fas ${category.icon}`}></i>
        </div>
        <h3 className="report-type-title">{category.title}</h3>
        <p className="report-type-description">{category.description}</p>
        <button className="view-reports-button">
            <i className="fas fa-eye"></i> View Reports
        </button>
    </div>
);


// ===========================================
// Report Detail Popup Component (Complex Filtering)
// ===========================================

const ReportDetailModal = ({ category, onClose }) => {
    const [selectedType, setSelectedType] = useState(category.types[0]);
    const [targetType, setTargetType] = useState('all'); // State for primary filter: all, individual, section
    const [searchQuery, setSearchQuery] = useState(''); // State for name/section search

    const isUserFilter = ['individual-student', 'individual-faculty'].includes(targetType);
    const isSectionFilter = targetType === 'section';

    const renderUserSearch = () => {
        if (!isUserFilter && !isSectionFilter) return null;

        const placeholder = isSectionFilter
            ? "Search section code (e.g., CS101, MATH201)"
            : `Search ${targetType.split('-')[1]} name or ID...`;

        return (
            <div className="filter-group-row">
                <div className="filter-search-input">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="report-modal-overlay">
            <div className="report-modal-content">
                <div className="modal-header">
                    <h2>{category.title} Generator</h2>
                    <button onClick={onClose} className="modal-close-btn">&times;</button>
                </div>
                
                <div className="modal-body-grid">
                    {/* Left Column: Report Type Selection */}
                    <div className="report-type-list-wrapper">
                        <h3>Report Types</h3>
                        <div className="report-type-list">
                            {category.types.map(type => (
                                <div 
                                    key={type.name} 
                                    className={`report-type-item ${selectedType.name === type.name ? 'selected' : ''}`}
                                    onClick={() => setSelectedType(type)}
                                >
                                    <h4>{type.name}</h4>
                                    <p>{type.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Filters and Generation */}
                    <div className="report-filter-panel">
                        <h3>Generate: {selectedType.name}</h3>
                        
                        {/* 1. Target Filter (Required for question 3) */}
                        {selectedType.filterTarget && selectedType.filterTarget.some(target => ['organization', 'user', 'section'].includes(target)) && (
                            <div className="filter-group">
                                <label>Target Scope</label>
                                <select 
                                    className="filter-select" 
                                    value={targetType} 
                                    onChange={(e) => {
                                        setTargetType(e.target.value);
                                        setSearchQuery(''); // Reset search when scope changes
                                    }}
                                >
                                    <option value="all">All Users/Organization</option>
                                    <option value="faculty">All Faculty</option>
                                    <option value="students">All Students</option>
                                    <option value="individual-faculty">Individual Faculty Member</option>
                                    <option value="individual-student">Individual Student</option>
                                    <option value="section">Specific Section/Course</option>
                                </select>
                            </div>
                        )}

                        {/* 2. Dynamic Search Input (Conditionally rendered) */}
                        {renderUserSearch()}
                        
                        {/* 3. Date Range Filter */}
                        <div className="filter-group">
                            <label>Date Range</label>
                            <div className="filter-group-row">
                                <input type="date" className="filter-select" defaultValue="2025-11-01" />
                                <input type="date" className="filter-select" defaultValue="2025-11-30" />
                            </div>
                        </div>
                        
                        {/* 4. Export Format */}
                        <div className="filter-group">
                            <label>Export Format</label>
                            <select className="filter-select">
                                <option>PDF (.pdf)</option>
                                <option>Excel (.xlsx)</option>
                                <option>CSV (.csv)</option>
                            </select>
                        </div>

                        <button className="generate-report-btn-modal">
                            <i className="fas fa-magic"></i> Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ===========================================
// Main Reports Page Component
// ===========================================

const ReportsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleOpenModal = (categoryKey) => {
        setSelectedCategory(reportCatalog[categoryKey]);
        setModalOpen(true);
    };

    // Mock data for the recent reports table
    const recentReports = [
        {
            name: "Weekly Attendance Summary",
            type: "Attendance",
            typeColor: "blue",
            date: "Nov 15-21, 2024",
            generated: "2 hours ago",
            status: "Ready",
            statusColor: "green"
        },
        {
            name: "Security Incident Report",
            type: "Security",
            typeColor: "red",
            date: "Nov 1-21, 2024",
            generated: "1 day ago",
            status: "Ready",
            statusColor: "green"
        },
        {
            name: "Facility Usage Analytics",
            type: "Usage",
            typeColor: "purple",
            date: "Oct 2024",
            generated: "3 days ago",
            status: "Ready",
            statusColor: "green"
        },
    ];

    return (
        <div className="reports-container">
            {/* Top Report Type Cards */}
            <div className="reports-card-grid">
                {Object.keys(reportCatalog).map(key => (
                    <ReportTypeCard
                        key={key}
                        category={reportCatalog[key]}
                        onOpen={() => handleOpenModal(key)}
                    />
                ))}
            </div>

            {/* Recent Reports Table */}
            <div className="card recent-reports-card">
                <div className="recent-reports-header">
                    <h2>Generated Reports</h2>
                    <div className="recent-reports-filters">
                        <select>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Semester</option>
                        </select>
                        <select>
                            <option>General</option>
                            <option>Attendance</option>
                            <option>Security</option>
                        </select>
                        <button className="export-all-button">
                            <i className="fas fa-upload"></i> Export All
                        </button>
                    </div>
                </div>

                <div className="reports-table-container">
                    <table className="recent-reports-table">
                        <thead>
                            <tr>
                                <th>Report Name</th>
                                <th>Type</th>
                                <th>Date Range</th>
                                <th>Generated</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentReports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.name}</td>
                                    <td><ReportTag text={report.type} colorClass={report.typeColor} /></td>
                                    <td>{report.date}</td>
                                    <td>{report.generated}</td>
                                    <td><StatusTag text={report.status} colorClass={report.statusColor} /></td>
                                    <td>
                                        <button className="action-button download-button"><i className="fas fa-download"></i></button>
                                        <button className="action-button view-button"><i className="fas fa-eye"></i></button>
                                        <button className="action-button share-button"><i className="fas fa-share-alt"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Renderer */}
            {modalOpen && selectedCategory && (
                <ReportDetailModal 
                    category={selectedCategory} 
                    onClose={() => setModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default ReportsPage;