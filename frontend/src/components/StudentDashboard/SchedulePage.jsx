import React from 'react';
import './SchedulePage.css'; // New CSS file for this page

// This component is defined locally for this page
const ClassItem = ({ time, title, details, status, statusColor, dotColor }) => (
    <div className="class-item">
        <div className="class-time-dot">
            <span className="dot" style={{ backgroundColor: dotColor }}></span>
            <span className="time">{time}</span>
        </div>
        <div className="class-details">
            <span className="class-title">{title}</span>
            <span className="class-meta">{details}</span>
        </div>
        <div className="class-status">
            <span style={{ color: statusColor }}>{status}</span>
        </div>
    </div>
);

// This component is for the weekly view
const WeekDayCard = ({ day, date, classes }) => (
    <div className="card week-day-card">
        <div className="week-day-header">
            <span className="day-name">{day}</span>
            <span className="day-date">{date}</span>
        </div>
        <div className="week-day-classes">
            {classes.length > 0 ? (
                classes.map((cls, index) => (
                    <div key={index} className="week-class-item">
                        <span className="week-class-time">{cls.time}</span>
                        <span className="week-class-title">{cls.title}</span>
                    </div>
                ))
            ) : (
                <div className="week-class-item none">No classes</div>
            )}
        </div>
    </div>
);


const SchedulePage = () => {

    // Mock data for Today's Classes
    const todayClasses = [
        { 
            time: "09:00 AM", 
            title: "Computer Science 101", 
            details: "Room A-205 • Dr. Sarah Johnson", 
            status: "✓ Present", 
            statusColor: "#28a745",
            dotColor: "#28a745" // Green for attended
        },
        { 
            time: "11:00 AM", 
            title: "Mathematics", 
            details: "Room B-103 • Prof. John Smith", 
            status: "In Progress", 
            statusColor: "#dc3545",
            dotColor: "#dc3545" // Red for in progress
        },
        { 
            time: "02:00 PM", 
            title: "Physics Lab", 
            details: "Lab C-201 • Dr. Emily Brown", 
            status: "Upcoming", 
            statusColor: "#555",
            dotColor: "#ccc" // Grey for upcoming
        },
        { 
            time: "04:00 PM", 
            title: "English Literature", 
            details: "Room D-305 • Ms. Lisa Wilson", 
            status: "Upcoming", 
            statusColor: "#555",
            dotColor: "#ccc"
        },
    ];

    // Mock data for This Week's Classes
    const weekSchedule = [
        { day: "Monday", date: "Nov 17", classes: [
            { time: "09:00 AM", title: "Computer Science 101" },
            { time: "11:00 AM", title: "Mathematics" },
        ]},
        { day: "Tuesday", date: "Nov 18", classes: [
            { time: "02:00 PM", title: "Physics Lab" },
        ]},
        { day: "Wednesday", date: "Nov 19", classes: [
            { time: "09:00 AM", title: "Computer Science 101" },
            { time: "11:00 AM", title: "Mathematics" },
            { time: "04:00 PM", title: "English Literature" },
        ]},
        { day: "Thursday", date: "Nov 20", classes: [
            { time: "02:00 PM", title: "Physics Lab" },
        ]},
        { day: "Friday", date: "Nov 21", classes: [
            { time: "09:00 AM", title: "Computer Science 101" },
            { time: "04:00 PM", title: "English Literature" },
        ]},
    ];

    return (
        <div className="schedule-view-container">
            <div className="schedule-header">
                <h2>My Schedule</h2>
                <div className="schedule-filters">
                    <button className="schedule-filter-btn active">Today</button>
                    <button className="schedule-filter-btn">This Week</button>
                    <button className="schedule-filter-btn">Calendar</button>
                </div>
            </div>

            {/* Today's Schedule Card */}
            <div className="card today-classes-card">
                <h3>Today's Classes</h3>
                <div className="class-list">
                    {todayClasses.map((cls, index) => (
                        <ClassItem 
                            key={index}
                            time={cls.time}
                            title={cls.title}
                            details={cls.details}
                            status={cls.status}
                            statusColor={cls.statusColor}
                            dotColor={cls.dotColor}
                        />
                    ))}
                </div>
            </div>

            {/* This Week Schedule Grid */}
            <div className="week-schedule-grid">
                {weekSchedule.map((day, index) => (
                    <WeekDayCard
                        key={index}
                        day={day.day}
                        date={day.date}
                        classes={day.classes}
                    />
                ))}
            </div>

        </div>
    );
};

export default SchedulePage;