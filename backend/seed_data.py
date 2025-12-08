#design for Emmanuel user 8 sa database

import mysql.connector
import json
from db_config import DB_CONFIG
import random
from datetime import datetime, timedelta

def seed_data():
    print("🌱 Seeding Data for EMMANUEL (User 8)...")
    
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # --- 1. TARGET USER ---
        # Base sa dump mo, User 8 si Emmanuel Lungay Mondragon
        target_user = 8 
        target_section = 'BSIT-4A' 

        # --- 2. SETUP CAMERAS ---
        print("...Checking Cameras")
        cameras = [
            ('ComLab 1', 'COS', 'Rpi-Cam-01', 'Active'),
            ('Lecture Hall A', 'COS', 'Rpi-Cam-02', 'Active'),
            ('Physics Lab', 'COS', 'Rpi-Cam-03', 'Active')
        ]
        sql_cam = "INSERT IGNORE INTO CameraManagement (room_name, department_code, camera_name, camera_status) VALUES (%s, %s, %s, %s)"
        cursor.executemany(sql_cam, cameras)
        conn.commit()

        # Get Camera IDs for mapping
        cursor.execute("SELECT camera_id FROM CameraManagement WHERE room_name = 'ComLab 1'")
        comlab_id = cursor.fetchone()[0]
        
        cursor.execute("SELECT camera_id FROM CameraManagement WHERE room_name = 'Lecture Hall A'")
        lecture_id = cursor.fetchone()[0]

        # --- 3. ENROLL EMMANUEL TO COURSES (The "Irregular/Regular" Logic) ---
        # Ito ang sagot sa concern mo bff. Dito natin ididikta kung ano lang ang subjects niya.
        print(f"...Enrolling User {target_user} to specific subjects")
        
        my_subjects = ["IT411", "IT412", "IT413", "IT414"] # Ito lang ang meron siya
        subjects_json = json.dumps(my_subjects)
        
        # Update User table
        cursor.execute("""
            UPDATE User 
            SET enrolled_courses = %s, section = %s, student_status = 'Regular' 
            WHERE user_id = %s
        """, (subjects_json, target_section, target_user))
        conn.commit()

        # --- 4. SETUP CLASS SCHEDULE FOR BSIT-4A ---
        # Gumawa tayo ng sched para sa section niya na MATCH sa enrolled courses niya
        print(f"...Creating Schedule for {target_section}")
        
        # Clear old schedule for this section to avoid duplicates
        cursor.execute("DELETE FROM ClassSchedule WHERE section = %s", (target_section,))
        
        schedules = [
            # COURSE CODE | NAME | DAY | START | END | CAM | SECTION | FACULTY_ID (Dummy)
            ('IT411', 'Capstone Project 2', 'Monday', '07:00 AM', '10:00 AM', comlab_id, target_section, 1),
            ('IT412', 'System Administration', 'Monday', '01:00 PM', '04:00 PM', lecture_id, target_section, 1),
            ('IT413', 'Mobile Development', 'Tuesday', '08:00 AM', '11:00 AM', comlab_id, target_section, 1),
            ('IT414', 'Technopreneurship', 'Wednesday', '10:00 AM', '01:00 PM', lecture_id, target_section, 1),
            # Note: Pwede tayong magdagdag ng subject sa schedule na WALA si Emmanuel (e.g., IT415)
            # Para makita mo na hindi yun lalabas sa schedule niya kung hindi siya enrolled.
            ('IT415', 'Foreign Language', 'Friday', '08:00 AM', '11:00 AM', lecture_id, target_section, 1) 
        ]
        
        sql_sched = """
            INSERT INTO ClassSchedule (course_code, course_name, day_of_week, start_time, end_time, camera_id, section, faculty_id) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.executemany(sql_sched, schedules)
        conn.commit()

        # --- 5. INJECT ATTENDANCE HISTORY (Simulation) ---
        print("...Simulating Attendance for Emmanuel")
        events = []
        
        # A. Valid Attendance (Monday - Capstone)
        # Kunin ang nakaraang Monday
        today = datetime.now()
        last_monday = today - timedelta(days=today.weekday()) 
        time_in_mon = last_monday.replace(hour=6, minute=55, second=0) # 6:55 AM (Pasok sa 7am)
        
        events.append((target_user, 'attendance_in', time_in_mon, comlab_id, 99.8, 'On Time'))

        # B. Valid Attendance (Tuesday - Mobile Dev)
        last_tuesday = last_monday + timedelta(days=1)
        time_in_tue = last_tuesday.replace(hour=8, minute=5, second=0) # 8:05 AM (Late ng konti)
        
        events.append((target_user, 'attendance_in', time_in_tue, comlab_id, 98.2, 'Late Entry'))

        # C. Unauthorized Entry Simulation (Kunwari pumasok siya sa Physics Lab ng walang klase)
        cursor.execute("SELECT camera_id FROM CameraManagement WHERE room_name = 'Physics Lab'")
        physics_id = cursor.fetchone()[0]
        random_time = today.replace(hour=15, minute=30, second=0)
        
        events.append((target_user, 'system_alert', random_time, physics_id, 85.2, 'Detected in Physics Lab (No Sched)'))

        sql_event = "INSERT INTO EventLog (user_id, event_type, timestamp, camera_id, confidence_score, remarks) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql_event, events)
        conn.commit()

        # --- 6. NOTIFICATIONS ---
        print("...Creating Notifications for Emmanuel")
        
        # Clear old notifs for this user
        cursor.execute("DELETE FROM Notification WHERE user_id = %s", (target_user,))
        
        notifs = [
            (target_user, 'fas fa-check-circle', 'Attendance Recorded: Capstone Project 2 (Monday)', False),
            (target_user, 'fas fa-exclamation-circle', 'You were marked late for Mobile Development.', True),
            (target_user, 'fas fa-calendar-alt', 'Midterm Exams schedule released.', False)
        ]
        sql_notif = "INSERT INTO Notification (user_id, icon, message, is_read) VALUES (%s, %s, %s, %s)"
        cursor.executemany(sql_notif, notifs)
        conn.commit()

        print("✅ SUCCESS! Data injected for Emmanuel.")

    except mysql.connector.Error as err:
        print(f"❌ Error: {err}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    seed_data()