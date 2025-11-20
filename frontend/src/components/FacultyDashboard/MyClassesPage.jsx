// MyClasses.jsx - My Classes Page Component
import React from 'react';
import './MyClassesPage.css';

const MyClassesPage = () => {
    return (
        <div className="my-classes-container">
            <h2>My Classes</h2>
            <div className="classes-grid-enhanced">
                {/* Class Card 1 - Computer Science 101 */}
                <div className="class-card-enhanced">
                    <div className="class-card-header">
                        <h3>Computer Science 101</h3>
                        <button className="class-options-btn">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="class-code">CS101</div>
                    
                    <div className="class-details">
                        <div className="class-detail-item">
                            <i className="fas fa-users"></i>
                            <span>32 students enrolled</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Mon, Wed, Fri - 9:00 AM</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-door-open"></i>
                            <span>Room A-205</span>
                        </div>
                    </div>

                    <div className="class-attendance-summary">
                        <div className="attendance-label">Avg. Attendance</div>
                        <div className="attendance-percentage green">94%</div>
                    </div>

                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>

                {/* Class Card 2 - Data Structures */}
                <div className="class-card-enhanced">
                    <div className="class-card-header">
                        <h3>Data Structures</h3>
                        <button className="class-options-btn">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="class-code">CS201</div>
                    
                    <div className="class-details">
                        <div className="class-detail-item">
                            <i className="fas fa-users"></i>
                            <span>28 students enrolled</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Tue, Thu - 11:00 AM</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-door-open"></i>
                            <span>Room B-301</span>
                        </div>
                    </div>

                    <div className="class-attendance-summary">
                        <div className="attendance-label">Avg. Attendance</div>
                        <div className="attendance-percentage orange">89%</div>
                    </div>

                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>

                {/* Class Card 3 - Algorithms */}
                <div className="class-card-enhanced">
                    <div className="class-card-header">
                        <h3>Algorithms</h3>
                        <button className="class-options-btn">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="class-code">CS301</div>
                    
                    <div className="class-details">
                        <div className="class-detail-item">
                            <i className="fas fa-users"></i>
                            <span>25 students enrolled</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Mon, Wed - 2:00 PM</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-door-open"></i>
                            <span>Room A-205</span>
                        </div>
                    </div>

                    <div className="class-attendance-summary">
                        <div className="attendance-label">Avg. Attendance</div>
                        <div className="attendance-percentage green">91%</div>
                    </div>

                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>

                {/* Class Card 4 - Software Engineering */}
                <div className="class-card-enhanced">
                    <div className="class-card-header">
                        <h3>Software Engineering</h3>
                        <button className="class-options-btn">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <div className="class-code">CS401</div>
                    
                    <div className="class-details">
                        <div className="class-detail-item">
                            <i className="fas fa-users"></i>
                            <span>30 students enrolled</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-calendar-alt"></i>
                            <span>Tue, Thu - 4:00 PM</span>
                        </div>
                        <div className="class-detail-item">
                            <i className="fas fa-door-open"></i>
                            <span>Lab C-102</span>
                        </div>
                    </div>

                    <div className="class-attendance-summary">
                        <div className="attendance-label">Avg. Attendance</div>
                        <div className="attendance-percentage green">92%</div>
                    </div>

                    <button className="take-attendance-btn">
                        <i className="fas fa-user-check"></i> Take Attendance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyClassesPage;