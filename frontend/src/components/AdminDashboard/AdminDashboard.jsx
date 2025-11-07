import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import LoggedInHeader from '../ZCommon/LoggedInHeader'; // <-- IMPORT UNIVERSAL HEADER

// --- PLACEHOLDERS (UPDATE THESE PATHS) ---
const LOGO_ICON = '/path/to/shield-icon.svg';
const FLOOR_PLAN_IMAGE = '/path/to/campus-floor-plan.png';

// --- THEME & USER DEFINITION (RED THEME) ---
const adminTheme = {
    primary: '#dc3545', // Primary Red
    dark: '#c82333',
    lightBg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF'
};

const adminUser = {
    name: 'Admin User',
    avatar: '/path/to/admin-avatar.png', // Placeholder avatar
    notifications: 3 // Example notification count
};


// ===========================================
// 1. Admin Sidebar Component (*** EDITED ***)
// ===========================================
const AdminSidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', view: 'dashboard' },
        { name: 'User Management', icon: 'fas fa-users', view: 'user-management' },
        { name: 'Alert Center', icon: 'fas fa-bell', view: 'alerts', notification: 5 },
        { name: 'Reports', icon: 'fas fa-chart-bar', view: 'reports' },
        { name: 'System Logs', icon: 'fas fa-clipboard-list', view: 'logs' },
        { name: 'Settings', icon: 'fas fa-cog', view: 'settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <button className="sidebar-toggle-button">
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* --- THIS IS THE CHANGE --- */}
            {/* Removed the old sidebar-profile div with the green dot */}
            {/* Added the new admin-role-tag div */}
            <div className="admin-role-tag">
                Administrator
            </div>
            {/* --- END CHANGE --- */}

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li 
                          key={item.name} 
                          className={activeView === item.view ? 'active' : ''}
                          onClick={() => setActiveView(item.view)}
                        >
                            <a href="#"> {/* Using href="#" for mock navigation */}
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                                {item.notification && <span className="notification-badge">{item.notification}</span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

// ===========================================
// 2. All Admin Dashboard Components
// ===========================================

// --- Main Dashboard View ---
const DashboardView = () => (
    <div className="dashboard-content-grid">
        <SummaryCards />
        <CampusFloorPlan />
        <RecentAlerts />
        <SystemStatus />
    </div>
);

const SummaryCard = ({ iconClass, title, value, subValue, subValueColor, iconBgClass }) => (
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

const SummaryCards = () => {
  return (
    <div className="summary-cards-container">
      <SummaryCard 
        iconClass="fas fa-bell" 
        title="Active Alerts" 
        value="5" 
        subValue="2 Critical" 
        subValueColor="#dc3545" 
        iconBgClass="alert-bg"
      />
      <SummaryCard 
        iconClass="fas fa-users" 
        title="Total Users" 
        value="2,847" 
        subValue="+12 today" 
        subValueColor="#28a745" 
        iconBgClass="users-bg-red" // RED THEME
      />
      <SummaryCard 
        iconClass="fas fa-video" 
        title="Active Cameras" 
        value="48/52" 
        subValue="4 Offline" 
        subValueColor="#ffc107" 
        iconBgClass="cameras-bg"
      />
      <SummaryCard 
        iconClass="fas fa-shield-alt" 
        title="Attendance" 
        value="98.5%" 
        subValue="Excellent" 
        subValueColor="#28a745" 
        iconBgClass="attendance-bg"
      />
    </div>
  );
};

const CampusFloorPlan = () => {
  return (
    <div className="card campus-floor-plan">
      <div className="floor-plan-header">
        <h3>Campus Floor Plan - Real-time Monitoring</h3>
        <div className="floor-plan-actions">
          <select className="building-selector">
            <option>Building A - Ground Floor</option>
            <option>Building B - Ground Floor</option>
          </select>
          <button className="full-screen-button">
            <i className="fas fa-expand"></i> Full Screen
          </button>
        </div>
      </div>
      <div className="floor-plan-body">
        <img src={FLOOR_PLAN_IMAGE} alt="Campus Floor Plan" className="floor-plan-image" />
      </div>
      <div className="floor-plan-legend">
        <div className="legend-item"><span className="legend-color-box green"></span> Camera Online</div>
        <div className="legend-item"><span className="legend-color-box red"></span> Camera Offline</div>
        <div className="legend-item"><span className="legend-color-box red-alt"></span> Person Detected</div> /* RED THEME */
        <div className="legend-item"><span className="legend-color-box purple"></span> Emergency Exit</div>
      </div>
      <div className="floor-plan-stats">
        <div><span className="stat-value">23</span> People Detected</div>
        <div><span className="stat-value">5</span> Cameras Online</div>
        <div><span className="stat-value">4</span> Cameras Offline</div>
        <div><span className="stat-value">5</span> Rooms Occupied</div>
      </div>
    </div>
  );
};

const AlertItem = ({ type, description, location, time, status, statusColor }) => (
  <div className="alert-item">
    <span className={`alert-type ${type}`}></span>
    <div className="alert-details">
      <div className="alert-description">
        <strong>{description}</strong> - {location}
      </div>
      <div className="alert-time">{time}</div>
    </div>
    <span className="alert-status" style={{ backgroundColor: statusColor }}>{status}</span>
  </div>
);

const RecentAlerts = () => {
  return (
    <div className="card recent-alerts">
      <h3>Recent Alerts</h3>
      <div className="alerts-list">
        <AlertItem type="red" description="Unauthorized access attempt" location="Building C" time="2 min ago" status="Active" statusColor="#dc3545" />
        <AlertItem type="yellow" description="System maintenance scheduled" location="Building A" time="15 min ago" status="Investigating" statusColor="#ffc107" />
        <AlertItem type="green" description="High occupancy detected" location="Library" time="1 hour ago" status="Resolved" statusColor="#28a745" />
      </div>
    </div>
  );
};

const StatusItem = ({ component, percentage, status, statusColor }) => (
  <div className="status-item">
    <div className="status-details">
      <div className="status-component">{component}</div>
      <div className="status-percentage">{percentage}</div>
    </div>
    <span className="status-badge" style={{ backgroundColor: statusColor }}>{status}</span>
  </div>
);

const SystemStatus = () => {
  return (
    <div className="card system-status">
      <h3>System Status</h3>
      <div className="status-list">
        <StatusItem component="Facial Recognition Engine" percentage="Uptime: 99.9%" status="Online" statusColor="#28a745" />
        <StatusItem component="Gesture Control Module" percentage="Uptime: 98.7%" status="Online" statusColor="#28a745" />
        <StatusItem component="Database Cluster" percentage="Uptime: 100%" status="Online" statusColor="#28a745" />
        <StatusItem component="Alert Notification System" percentage="Uptime: 95.2%" status="Maintenance" statusColor="#ffc107" />
      </div>
    </div>
  );
};

// --- User Management View ---
const UserManagement = () => (
    <div className="user-management-container">
        {/* Summary Cards */}
        <div className="user-summary-cards">
            <div className="card user-summary-card">
                <span className="user-summary-value">156</span>
                <span className="user-summary-title">Administrators</span>
                <span className="user-summary-change green">+2 this month</span>
            </div>
            <div className="card user-summary-card">
                <span className="user-summary-value">892</span>
                <span className="user-summary-title">Faculty Members</span>
                <span className="user-summary-change green">+15 this month</span>
            </div>
            <div className="card user-summary-card">
                <span className="user-summary-value">1,799</span>
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
                    <button className="user-list-button export-button">
                        <i className="fas fa-upload"></i> Export Users
                    </button>
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


// --- Alert Center View ---
const AlertCenter = () => (
    <div className="card alert-center-container">
        <div className="alert-center-header">
            <h2>Alert Center</h2>
            <div className="alert-center-filters">
                <select>
                    <option>All Types</option>
                    <option>Critical</option>
                    <option>Warning</option>
                </select>
                <select>
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                </select>
                <button className="clear-filters-button">Clear Filters</button>
            </div>
        </div>
        <div className="alerts-list">
            <AlertItem type="red" description="Unauthorized access attempt" location="Building C" time="2 min ago" status="Active" statusColor="#dc3545" />
            <AlertItem type="yellow" description="System maintenance scheduled" location="Building A" time="15 min ago" status="Investigating" statusColor="#ffc107" />
            <AlertItem type="green" description="High occupancy detected" location="Library" time="1 hour ago" status="Resolved" statusColor="#28a745" />
            <AlertItem type="red" description="Camera Offline" location="Parking Lot B" time="2 hours ago" status="Active" statusColor="#dc3545" />
        </div>
    </div>
);

// --- Reports View ---
const Reports = () => (
    <div className="reports-container">
        <h2>Reports</h2>
        <div className="reports-grid">
            <div className="card report-card">
                <h3>Monthly Attendance Report</h3>
                <p>Generate a PDF report of student and faculty attendance for the last 30 days.</p>
                <button className="user-list-button add-user-button">Generate Report</button>
            </div>
            <div className="card report-card">
                <h3>Security Alert Summary</h3>
                <p>View and export a summary of all security alerts, filterable by type and date.</p>
                <button className="user-list-button add-user-button">Generate Report</button>
            </div>
            <div className="card report-card">
                <h3>User Access Logs</h3>
                <p>Download CSV logs of all access events (entries and exits) for a specific building.</p>
                <button className="user-list-button add-user-button">Generate Report</button>
            </div>
        </div>
    </div>
);

// --- System Logs View ---
const SystemLogs = () => (
    <div className="card">
        <h2>System Logs</h2>
        <div className="user-search-bar logs-search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search logs (e.g., 'ERROR', 'user:admin', 'IP:192...')" />
        </div>
        <table className="logs-table">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Level</th>
                    <th>Service</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2025-10-26 17:05:10</td>
                    <td><span className="status-tag red">ERROR</span></td>
                    <td>AuthService</td>
                    <td>Failed login attempt for user 'admin' from IP 198.51.100.1</td>
                </tr>
                <tr>
                    <td>2025-10-26 17:04:30</td>
                    <td><span className="status-tag green">INFO</span></td>
                    <td>RecognitionEngine</td>
                    <td>Face recognized: student_id 2024001 at 'Library Entrance'</td>
                </tr>
                <tr>
                    <td>2025-10-26 17:02:00</td>
                    <td><span className="status-tag yellow">WARN</span></td>
                    <td>CameraService</td>
                    <td>Camera 'CAM-04B' connection reset. Re-establishing...</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// --- Settings View ---
const Settings = () => (
    <div className="settings-container">
        <h2>Settings</h2>
        <div className="settings-grid">
            <div className="card settings-card">
                <h3>General Settings</h3>
                <label htmlFor="campus-name">Campus Name</label>
                <input type="text" id="campus-name" defaultValue="SmartCampus" />
                <label htmlFor="campus-timezone">Timezone</label>
                <select id="campus-timezone">
                    <option>America/New_York (GMT-4)</option>
                    <option>America/Chicago (GMT-5)</option>
                    <option>America/Denver (GMT-6)</option>
                    <option>America/Los_Angeles (GMT-7)</option>
                </select>
            </div>
            <div className="card settings-card">
                <h3>Notification Settings</h3>
                <div className="checkbox-setting">
                    <input type="checkbox" id="email-alerts" defaultChecked />
                    <label htmlFor="email-alerts">Enable email alerts for critical events</label>
                </div>
                <div className="checkbox-setting">
                    <input type="checkbox" id="sms-alerts" />
                    <label htmlFor="sms-alerts">Enable SMS alerts for critical events</label>
                </div>
            </div>
            <div className="card settings-card">
                <h3>Recognition Engine</h3>
                <label htmlFor="confidence-threshold">Confidence Threshold</label>
                <select id="confidence-threshold">
                    <option>95% (High Security)</option>
                    <option>90% (Recommended)</option>
                    <option>85% (Balanced)</option>
                </select>
            </div>
        </div>
    </div>
);


// ===========================================
// 3. Main AdminDashboard Component (The Parent)
// ===========================================
const AdminDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    // This function decides which component to show
    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView />;
            case 'user-management':
                return <UserManagement />;
            case 'alerts':
                return <AlertCenter />;
            case 'reports':
                return <Reports />;
            case 'logs':
                return <SystemLogs />;
            case 'settings':
                return <Settings />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="dashboard-container">
            <LoggedInHeader theme={adminTheme} user={adminUser} />
            <div className="dashboard-body">
                <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="main-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

