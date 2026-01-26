📊 Documentation: Student Data Analysis & Analytics Logic
Author: Denice

Module: Student Dashboard / Reporting

Status: Feature Implemented (Backend)

🛠️ Overview of Changes
To comply with the requirements for the Data Analysis phase, I have implemented a new robust reporting endpoint. This logic has been added specifically starting at line 716 in our app.py file. This moves us beyond simply listing attendance logs and provides actual statistical insights for students regarding their academic standing and attendance consistency.

🧠 Detailed Logic Breakdown
The core logic resides in the /api/student/report/analytics/<int:user_id> (and the expanded robust version) endpoint starting at line 716. Here is how the data is processed:

1. Data Integration (SQL Joins)
Starting at line 721, the system performs a specialized database query that links three separate areas of our system:

Subjects: To pull the official course descriptions and names.

ClassSchedule: To map which specific classes belong to which subject code.

EventLog: To find the actual "Attendance In" records for the specific student.

2. Analytics Calculations
As seen in the SQL query on lines 722–730, the backend now performs "On-the-Fly" analysis:

Attendance Density: It counts every log_id associated with a subject to show total presence for that student.

Late Arrival Tracking: Using the logic provided in the robust endpoint, we scan the remarks field for the keyword "Late" to provide a specific count of tardiness.

3. Verification Security
Consistent with our existing security protocols, the code includes a check to ensure only 'Verified' students can access these analytical reports, preventing unapproved accounts from seeing sensitive log data.

🚀 How to Test
Ensure your local server is running (make sure you've ran pip install pdfplumber first).

Use a tool like Postman or your browser to hit the endpoint defined at line 716:

GET /api/student/report/analytics/<your_user_id>

The response will return a JSON list of your courses and the total number of times you've been marked present.