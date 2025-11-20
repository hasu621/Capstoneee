// Reports.jsx - Reports Page Component
import React from 'react';
import './FacultyReportsPage.css';

const FacultyReportsPage = () => {
    return (
        <div className="reports-container">
            <div className="reports-header">
                <h2>My Reports</h2>
                <button className="schedule-button monitor-button">
                    <i className="fas fa-plus"></i> Generate New Report
                </button>
            </div>

            {/* Quick Stats */}
            <div className="reports-stats-grid">
                <div className="report-stat-card">
                    <div className="stat-icon-wrapper red">
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">24</div>
                        <div className="stat-label">Total Reports</div>
                    </div>
                </div>
                <div className="report-stat-card">
                    <div className="stat-icon-wrapper blue">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">3</div>
                        <div className="stat-label">Pending</div>
                    </div>
                </div>
                <div className="report-stat-card">
                    <div className="stat-icon-wrapper green">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">21</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
                <div className="report-stat-card">
                    <div className="stat-icon-wrapper orange">
                        <i className="fas fa-download"></i>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">156</div>
                        <div className="stat-label">Downloads</div>
                    </div>
                </div>
            </div>

            {/* Report Types */}
            <div className="card">
                <h3>Generate Report</h3>
                <div className="report-types-grid">
                    <div className="report-type-card">
                        <div className="report-type-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h4>Attendance Report</h4>
                        <p>Generate detailed attendance reports for your classes</p>
                        <button className="generate-report-btn">
                            <i className="fas fa-chart-bar"></i> Generate
                        </button>
                    </div>

                    <div className="report-type-card">
                        <div className="report-type-icon">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <h4>Student Performance</h4>
                        <p>View individual student attendance and participation</p>
                        <button className="generate-report-btn">
                            <i className="fas fa-chart-bar"></i> Generate
                        </button>
                    </div>

                    <div className="report-type-card">
                        <div className="report-type-icon">
                            <i className="fas fa-calendar-week"></i>
                        </div>
                        <h4>Weekly Summary</h4>
                        <p>Get weekly attendance summary across all classes</p>
                        <button className="generate-report-btn">
                            <i className="fas fa-chart-bar"></i> Generate
                        </button>
                    </div>

                    <div className="report-type-card">
                        <div className="report-type-icon">
                            <i className="fas fa-file-excel"></i>
                        </div>
                        <h4>Custom Export</h4>
                        <p>Export custom data in Excel or PDF format</p>
                        <button className="generate-report-btn">
                            <i className="fas fa-chart-bar"></i> Generate
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Reports */}
            <div className="card">
                <h3>Recent Reports</h3>
                <div className="recent-reports-list">
                    <div className="report-item">
                        <div className="report-icon">
                            <i className="fas fa-file-pdf"></i>
                        </div>
                        <div className="report-info">
                            <div className="report-name">CS101 Attendance - November 2024</div>
                            <div className="report-meta">Generated on Nov 15, 2024 • 2.4 MB</div>
                        </div>
                        <div className="report-actions">
                            <button className="icon-btn" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                            <button className="icon-btn" title="View">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-btn" title="Share">
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="report-item">
                        <div className="report-icon">
                            <i className="fas fa-file-excel"></i>
                        </div>
                        <div className="report-info">
                            <div className="report-name">All Classes Weekly Summary</div>
                            <div className="report-meta">Generated on Nov 13, 2024 • 1.8 MB</div>
                        </div>
                        <div className="report-actions">
                            <button className="icon-btn" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                            <button className="icon-btn" title="View">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-btn" title="Share">
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="report-item">
                        <div className="report-icon">
                            <i className="fas fa-file-pdf"></i>
                        </div>
                        <div className="report-info">
                            <div className="report-name">Student Performance Analysis</div>
                            <div className="report-meta">Generated on Nov 10, 2024 • 3.1 MB</div>
                        </div>
                        <div className="report-actions">
                            <button className="icon-btn" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                            <button className="icon-btn" title="View">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-btn" title="Share">
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="report-item">
                        <div className="report-icon">
                            <i className="fas fa-file-excel"></i>
                        </div>
                        <div className="report-info">
                            <div className="report-name">Data Structures Attendance</div>
                            <div className="report-meta">Generated on Nov 8, 2024 • 1.5 MB</div>
                        </div>
                        <div className="report-actions">
                            <button className="icon-btn" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                            <button className="icon-btn" title="View">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-btn" title="Share">
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div className="report-item">
                        <div className="report-icon">
                            <i className="fas fa-file-pdf"></i>
                        </div>
                        <div className="report-info">
                            <div className="report-name">Semester Overview Report</div>
                            <div className="report-meta">Generated on Nov 1, 2024 • 4.2 MB</div>
                        </div>
                        <div className="report-actions">
                            <button className="icon-btn" title="Download">
                                <i className="fas fa-download"></i>
                            </button>
                            <button className="icon-btn" title="View">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="icon-btn" title="Share">
                                <i className="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyReportsPage;