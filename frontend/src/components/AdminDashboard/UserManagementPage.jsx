import React from 'react';
import './UserManagementPage.css'; // Use the new page-specific CSS

// ===========================================
// All User Management Page Components
// ===========================================

const UserManagementPage = () => (
    <div className="user-management-container">
        {/* Summary Cards */}
        <div className="user-summary-cards">
            <div className="card user-summary-card">
                <span className="user-summary-value">2</span>
                <span className="user-summary-title">Administrators</span>
                <span className="user-summary-change green">+1 this month</span>
            </div>
            <div className="card user-summary-card">
                <span className="user-summary-value">15</span>
                <span className="user-summary-title">Faculty Members</span>
                <span className="user-summary-change green">+5 this month</span>
            </div>
            <div className="card user-summary-card">
                <span className="user-summary-value">100</span>
                <span className="user-summary-title">Students</span>
                <span className="user-summary-change green">+67 this month</span>
            </div>
        </div>

        {/* All Users List */}
        <div className="card user-list-card">
            <div className="user-list-header">
                <h2>All Users</h2>
                <div className="user-list-actions">
                    <div className="user-search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search users..." />
                    </div>
                    <select className="user-role-filter">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Faculty</option>
                        <option>Student</option>
                    </select>
                    <button className="user-list-button add-user-button">
                        <i className="fas fa-plus"></i> Add User
                    </button>
                </div>
            </div>
            
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Face Status</th>
                        <th>Last Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mock User Data */}
                    <tr>
                        <td>
                            <div className="user-info-cell">
                                <i className="fas fa-user-circle user-table-avatar"></i>
                                <div>
                                    <span className="user-table-name">Dr. Sarah Johnson</span>
                                    <span className="user-table-email">sarah.johnson@university.edu</span>
                                </div>
                            </div>
                        </td>
                        <td><span className="role-tag green">Faculty</span></td>
                        <td>Computer Science</td>
                        <td><span className="status-tag green">Registered</span></td>
                        <td>2 hours ago</td>
                        <td>
                            <button className="action-button"><i className="fas fa-pen"></i></button>
                            <button className="action-button delete-button"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="user-info-cell">
                                <i className="fas fa-user-circle user-table-avatar"></i>
                                <div>
                                    <span className="user-table-name">Michael Chen</span>
                                    <span className="user-table-email">michael.chen@student.edu</span>
                                </div>
                            </div>
                        </td>
                        <td><span className="role-tag blue">Student</span></td>
                        <td>Engineering</td>
                        <td><span className="status-tag yellow">Pending</span></td>
                        <td>1 day ago</td>
                        <td>
                            <button className="action-button"><i className="fas fa-pen"></i></button>
                            <button className="action-button delete-button"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="user-info-cell">
                                <i className="fas fa-user-circle user-table-avatar"></i>
                                <div>
                                    <span className="user-table-name">Admin User</span>
                                    <span className="user-table-email">admin@university.edu</span>
                                </div>
                            </div>
                        </td>
                        <td><span className="role-tag red">Admin</span></td>
                        <td>IT Services</td>
                        <td><span className="status-tag green">Registered</span></td>
                        <td>5 min ago</td>
                        <td>
                            <button className="action-button"><i className="fas fa-pen"></i></button>
                            <button className="action-button delete-button"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="user-info-cell">
                                <i className="fas fa-user-circle user-table-avatar"></i>
                                <div>
                                    <span className="user-table-name">Prof. Emma Wilson</span>
                                    <span className="user-table-email">emma.wilson@university.edu</span>
                                </div>
                            </div>
                        </td>
                        <td><span className="role-tag green">Faculty</span></td>
                        <td>Mathematics</td>
                        <td><span className="status-tag green">Registered</span></td>
                        <td>3 hours ago</td>
                        <td>
                            <button className="action-button"><i className="fas fa-pen"></i></button>
                            <button className="action-button delete-button"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="user-info-cell">
                                <i className="fas fa-user-circle user-table-avatar"></i>
                                <div>
                                    <span className="user-table-name">Alex Rodriguez</span>
                                    <span className="user-table-email">alex.rodriguez@student.edu</span>
                                </div>
                            </div>
                        </td>
                        <td><span className="role-tag blue">Student</span></td>
                        <td>Business</td>
                        <td><span className="status-tag red">Not Registered</span></td>
                        <td>2 days ago</td>
                        <td>
                            <button className="action-button"><i className="fas fa-pen"></i></button>
                            <button className="action-button delete-button"><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default UserManagementPage;