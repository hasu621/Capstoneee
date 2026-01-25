import React, { useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import FacultyLayout from './FacultyLayout'; 
import './FacultyReportsPage.css';
import { Download, BarChart3, Clock, UserCheck, AlertCircle, CheckCircle2, Info, FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Full Catalog from your Faculty Module documentation
const facultyReportCatalog = {
    class: {
        id: 'class',
        title: 'Class-Specific Reports',
        description: 'Comprehensive student monitoring, AI insights, and security logs.',
        icon: <UserCheck size={24} />,
        colorClass: 'class', 
        requiresSubject: true,
        types: [
            { id: 'C_DAILY', label: 'Daily Attendance per Subject', desc: 'Presence, lateness, and breaks for each class session.' },
            { id: 'C_MONTHLY', label: 'Monthly Attendance Trends', desc: 'Visual trend of improvement or decline.' },
            { id: 'C_SEMESTRAL', label: 'Semestral Report (Per Subject)', desc: 'Cumulative data per subject for academic reference.' },
            { id: 'C_LATE', label: 'Late Arrival Report', desc: 'Monitors frequency and duration of lateness.' },
            { id: 'C_CONSISTENCY', label: 'Personal Consistency Index', desc: 'AI-generated metric predicting absence trends.' },
            { id: 'C_ABSENCE_SUM', label: 'Absence Summaries per Section', desc: 'Quantifies absences for easier grading.' },
            { id: 'C_BREAK_DUR', label: 'Break Duration Analysis', desc: 'Detects patterns of excessive or frequent breaks.' },
            { id: 'C_PUNCTUALITY', label: 'Punctuality Index per Section', desc: 'Ranks student punctuality using time-in differentials.' },
            { id: 'C_SECURITY', label: 'Unrecognized Individual Logs', desc: 'Lists unknown individuals detected by the camera.' },
            { id: 'C_EARLY_EXIT', label: 'Early Exits Report', desc: 'Identifies students leaving before class ends.' },
            { id: 'C_BREAK_ABUSE', label: 'Break Abuse / Extended Break', desc: 'Detects students failing to return or exceeding limits.' },
            { id: 'C_MISSED_LOG', label: 'Missed Attendance but Present in BreakLogs', desc: 'Catches inconsistencies in attendance logging.' },
            { id: 'C_ENGAGEMENT', label: 'Class Participation Consistency', desc: 'AI-computed stability index across sessions.' },
        ]
    },
    personal: {
        id: 'personal',
        title: 'Personal Records',
        description: 'Your own teaching history, schedule adherence, and logs.',
        icon: <Clock size={24} />,
        colorClass: 'personal',
        requiresSubject: false,
        types: [
            { id: 'P_DAILY', label: 'Personal Attendance Records', desc: 'Daily attendance per subject taught.' },
            { id: 'P_WEEKLY', label: 'Weekly Attendance Summary', desc: 'Summarizes present/absent/late counts.' },
            { id: 'P_MONTHLY', label: 'Monthly Attendance Trends', desc: 'Visual trend of improvement or decline.' },
            { id: 'P_LATE', label: 'Personal Late Arrival Report', desc: 'Monitors instructor start delay.' },
            { id: 'P_HISTORY', label: 'Attendance History (30 Days)', desc: 'Maintains recent timestamps for privacy.' },
        ]
    }
};

const FacultyReportsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [generatedReports, setGeneratedReports] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Filters
    const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
    const [selectedSubject, setSelectedSubject] = useState('IT411');

    // Visual Preview Data (Mock)
    const previewData = [
        { name: 'On-Time', value: 82, color: '#4CAF50' },
        { name: 'Late', value: 12, color: '#FFC107' },
        { name: 'Absent', value: 6, color: '#F44336' },
    ];

    // AI Insight Generator
    const aiInsight = useMemo(() => {
        if (!selectedType) return null;
        if (selectedType.id.includes('SECURITY') || selectedType.id.includes('ABUSE') || selectedType.id.includes('MISSED')) {
            return { status: 'Critical', color: '#A62525', icon: <AlertCircle size={18} />, message: "AI detected anomalies (unrecognized faces or break abuse) in this period." };
        }
        return { status: 'Great', color: '#27ae60', icon: <CheckCircle2 size={18} />, message: "All metrics are within normal range. Class engagement remains high." };
    }, [selectedType]);

    // PDF ENGINE
    const handleDownloadPDF = (report) => {
        const doc = new jsPDF();
        doc.setFillColor(166, 37, 37); 
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text("FRAMES ATTENDANCE SYSTEM", 14, 20);
        doc.setFontSize(12);
        doc.text(report.title.toUpperCase(), 14, 30);
        doc.setFontSize(10);
        doc.text(`Subject: ${report.subject} | Date: ${report.generatedAt}`, 140, 25);

        autoTable(doc, {
            head: [Object.keys(report.data[0]).map(k => k.toUpperCase())],
            body: report.data.map(obj => Object.values(obj)),
            startY: 45,
            theme: 'striped',
            headStyles: { fillColor: [166, 37, 37] }
        });
        doc.save(`${report.title.replace(/\s+/g, '_')}.pdf`);
    };

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            const newReport = {
                id: Date.now(),
                title: selectedType.label,
                category: activeCategory.title,
                subject: activeCategory.requiresSubject ? selectedSubject : 'N/A',
                generatedAt: new Date().toLocaleString(),
                data: [
                    { Name: "Angelica Terana", Status: "Present", Time: "07:55 AM", Metric: "98%" },
                    { Name: "Emmanuel Lungay", Status: "Present", Time: "08:02 AM", Metric: "95%" },
                    { Name: "Karl Calingal", Status: "Late", Time: "08:15 AM", Metric: "82%" },
                ]
            };
            setGeneratedReports(prev => [newReport, ...prev]);
            handleDownloadPDF(newReport); // Automatic download
            setLoading(false);
            setModalOpen(false);
        }, 1200);
    };

    return (
        <FacultyLayout>
            <div className="fac-reports-container fade-in">
                <div className="fac-header-flex">
                    <div>
                        <h1>Faculty Report Analysis</h1>
                        <p className="subtitle">AI-powered tracking for class engagement and punctuality.</p>
                    </div>
                </div>

                <div className="fac-reports-card-grid">
                    {Object.values(facultyReportCatalog).map((cat) => (
                        <div key={cat.id} className={`fac-report-type-card ${cat.colorClass}`} onClick={() => {
                            setActiveCategory(cat);
                            setSelectedType(cat.types[0]);
                            setModalOpen(true);
                        }}>
                            <div className="fac-report-icon-wrapper">{cat.icon}</div>
                            <h3 className="fac-card-title">{cat.title}</h3>
                            <p className="fac-card-desc">{cat.description}</p>
                            <button className="fac-view-btn">Select Report Type</button>
                        </div>
                    ))}
                </div>

                <div className="fac-history-card" style={{ marginTop: '30px' }}>
                    <div className="fac-history-header"><h2>Session History</h2></div>
                    <table className="fac-history-table">
                        <thead>
                            <tr>
                                <th>Report</th>
                                <th>Subject</th>
                                <th>Timestamp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generatedReports.map(rep => (
                                <tr key={rep.id}>
                                    <td><strong>{rep.title}</strong></td>
                                    <td>{rep.subject}</td>
                                    <td>{rep.generatedAt}</td>
                                    <td>
                                        <button className="pdf-action-btn" onClick={() => handleDownloadPDF(rep)}>
                                            <FileDown size={14} /> PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalOpen && (
                    <div className="fac-modal-overlay">
                        <div className="fac-modal-content large">
                            <div className="fac-modal-header">
                                <h2>Configuring: {activeCategory.title}</h2>
                                <button className="close-x" onClick={() => setModalOpen(false)}>&times;</button>
                            </div>
                            
                            <div className="fac-modal-body split-view">
                                <div className="fac-report-selection-list">
                                    {activeCategory.types.map(type => (
                                        <div 
                                            key={type.id} 
                                            className={`fac-report-option ${selectedType.id === type.id ? 'active' : ''}`}
                                            onClick={() => setSelectedType(type)}
                                        >
                                            <h4>{type.label}</h4>
                                            <p>{type.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="fac-report-preview-pane">
                                    <div className="preview-status-header" style={{borderColor: aiInsight.color}}>
                                        <div className="status-badge" style={{backgroundColor: aiInsight.color}}>
                                            {aiInsight.icon} {aiInsight.status}
                                        </div>
                                        <p>{aiInsight.message}</p>
                                    </div>

                                    <div className="preview-chart-container">
                                        <div className="preview-header"><BarChart3 size={18} /> Visual Preview</div>
                                        <div style={{ width: '100%', height: 160 }}>
                                            <ResponsiveContainer>
                                                <BarChart data={previewData}>
                                                    <XAxis dataKey="name" fontSize={11} />
                                                    <YAxis fontSize={11} />
                                                    <Tooltip cursor={{fill: '#f5f5f5'}} />
                                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                                        {previewData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="fac-form-group">
                                        <label>Date Range</label>
                                        <input type="date" className="fac-input" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
                                    </div>

                                    {activeCategory.requiresSubject && (
                                        <div className="fac-form-group">
                                            <label>Select Section/Subject</label>
                                            <select className="fac-select" value={selectedSubject} onChange={e=>setSelectedSubject(e.target.value)}>
                                                <option value="IT411">IT411 - Capstone 2</option>
                                                <option value="IT321">IT321 - Info Assurance</option>
                                            </select>
                                        </div>
                                    )}

                                    <button className="fac-generate-btn" onClick={handleGenerate} disabled={loading}>
                                        {loading ? "Analyzing..." : `Generate & Download PDF`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FacultyLayout>
    );
};

export default FacultyReportsPage;