import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './FacultyLayout.css'; 
import '../ZCommon/Utility.css'; 
import LoggedInHeader from '../ZCommon/Header'; 

const DEFAULT_AVATAR = 'https://placehold.co/100x100/f8d7da/dc3545?text=No+Img';

const facultyTheme = {
    primary: '#A62525', 
    dark: '#c82333',
    lightBg: 'rgba(255, 255, 255, 0.15)',
    text: '#FFFFFF'
};

const FacultySidebar = ({ user }) => {
    // --- LOGIC: Check if user is a Department Head ---
    // Tinitingnan nito kung ang faculty_status sa database ay "Head" o "Department Head"
    // Gumamit ng safety check (user?.faculty_status) para hindi mag-crash kung undefined
    const isDeptHead = user?.faculty_status === 'Head' || user?.faculty_status === 'Department Head';

    // Base Navigation Items
    const navItems = [
        { name: 'Dashboard', icon: 'fas fa-th-large', to: '/faculty-dashboard' },
        { name: 'My Classes', icon: 'fas fa-book-reader', to: '/faculty-classes' },
        { name: 'Attendance', icon: 'fas fa-user-check', to: '/faculty-attendance' },
        { name: 'Reports', icon: 'fas fa-chart-bar', to: '/faculty-reports' },
    ];

    // CONDITIONAL: Idagdag lang ang tab na 'to kung Dept Head siya
    if (isDeptHead) {
        navItems.push({ 
            name: 'Department Mgmt', 
            icon: 'fas fa-university', 
            to: '/faculty-dept-management' 
        });
    }

    return (
        <aside className="faculty-sidebar">
            {/* Dynamic Role Tag */}
            <div className="faculty-role-tag">
                {isDeptHead ? "Department Head" : "Faculty Member"}
            </div>

            <nav className="faculty-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''}>
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </NavLink>
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

const FacultyLayout = () => {
    const navigate = useNavigate();
    // Initialize user state
    const [user, setUser] = useState({ 
        name: 'Loading...', 
        avatar: DEFAULT_AVATAR,
        faculty_status: 'Regular', // Default to Regular
        notifications: 0
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            
            // Safety Check: Faculty lang ang pwede dito (Case Insensitive Fix)
            if (parsedUser.role && parsedUser.role.toLowerCase() !== 'faculty') {
                navigate('/'); 
                return;
            }

            // Set User Data including the specific faculty_status form DB
            setUser({
                ...parsedUser, 
                name: `${parsedUser.firstName} ${parsedUser.lastName}`,
                avatar: parsedUser.avatar || DEFAULT_AVATAR,
                faculty_status: parsedUser.faculty_status || 'Regular' 
            });
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <LoggedInHeader theme={facultyTheme} user={user} />
            
            <div className="dashboard-body">
                {/* Ipasa ang user data sa Sidebar para ma-check ang role */}
                <FacultySidebar user={user} />
                
                <div className="main-content-area">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default FacultyLayout;