import React, { useState } from 'react';
import './HRDashboard.css';
import AddEmployeeModal from './AddEmployeeModal';

const HRDashboard = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [leaveActiveTab, setLeaveActiveTab] = useState('pending');
  const [reportsActiveTab, setReportsActiveTab] = useState('overview');
  const [salaryActiveTab, setSalaryActiveTab] = useState('payroll');
  const [attendanceViewMode, setAttendanceViewMode] = useState('daily');
  const currentDate = "Thursday, 15 May 2026";

  const stats = [
    { label: "Total employees", value: "47" },
    { label: "Present today", value: "41", color: "#059669" },
    { label: "Absent today", value: "6", color: "#dc2626" },
    { label: "Pending salaries", value: "4", color: "#d97706" }
  ];

  const lateArrivals = [
    { initials: "PS", name: "Priya Shankar", time: "09:48 AM" },
    { initials: "KR", name: "Kiran Raj", time: "10:02 AM" }
  ];

  const pendingActions = [
    { label: "5 leave requests", action: "Review", type: "review" },
    { label: "4 held salaries", action: "Release", type: "release" },
    { label: "1 new employee", action: "Setup", type: "setup" }
  ];

  const feedItems = [
    { time: "08:55 AM", message: "Meena Velu checked in", status: "On time", type: "on-time", dot: "green" },
    { time: "09:48 AM", message: "Priya Shankar checked in", status: "Late 48 min", type: "late", dot: "yellow" },
    { time: "10:00 AM", message: "Arjun John — no scan detected", status: "Absent", type: "absent", dot: "red" }
  ];

  const employeesData = [
    { initials: "RK", name: "Ramesh Kumar", id: "EMP-001", dept: "Software Dev", status: "Present", inOut: "09:02 AM / —", colorClass: "blue" },
    { initials: "PS", name: "Priya Shankar", id: "EMP-002", dept: "HR", status: "Late", inOut: "09:48 AM / —", colorClass: "orange" },
    { initials: "AJ", name: "Arjun John", id: "EMP-003", dept: "Finance", status: "Absent", inOut: "— / —", colorClass: "red" },
    { initials: "MV", name: "Meena Velu", id: "EMP-004", dept: "Software Dev", status: "Present", inOut: "08:55 AM / —", colorClass: "green" },
    { initials: "SB", name: "Suresh Babu", id: "EMP-005", dept: "Support", status: "Present", inOut: "09:05 AM / —", colorClass: "green" },
    { initials: "LR", name: "Lakshmi Rajan", id: "EMP-006", dept: "Marketing", status: "On leave", inOut: "— / —", colorClass: "yellow" }
  ];

  const renderDashboardContent = () => (
    <>
      <header className="dashboard-header">
        <div className="welcome-text">
          <h1>Good morning, Kavitha</h1>
          <p>{currentDate}</p>
        </div>
        <div className="alerts-badge">
          <span className="alerts-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </span>
          3 alerts
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.label}</h3>
            <div className="value" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Middle Section */}
      <div className="middle-grid">
        {/* Late Arrivals Card */}
        <section className="card">
          <h2>Late arrivals today</h2>
          <div className="list-container">
            {lateArrivals.map((user, index) => (
              <div key={index} className="list-item">
                <div className="user-info">
                  <div className="avatar-circle">{user.initials}</div>
                  <span className="user-name">{user.name}</span>
                </div>
                <span className="time-text">{user.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Actions Card */}
        <section className="card">
          <h2>Pending actions</h2>
          <div className="list-container">
            {pendingActions.map((item, index) => (
              <div key={index} className="action-item">
                <div className="action-label">
                  <input type="checkbox" readOnly />
                  <span>{item.label}</span>
                </div>
                <button className={`btn-action btn-${item.type}`}>
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Feed Section */}
      <section className="feed-card">
        <h2>Live attendance feed</h2>
        <div className="feed-container">
          {feedItems.map((item, index) => (
            <div key={index} className="feed-item">
              <div className={`feed-dot ${item.dot}`}></div>
              <div className="feed-time">{item.time}</div>
              <div className="feed-message">{item.message}</div>
              <div className={`status-pill ${item.type}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderEmployeesContent = () => (
    <>
      <header className="dashboard-header employees-header">
        <div className="welcome-text">
          <h1>Employees</h1>
          <p>47 total · 41 active today</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <span className="icon icon-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M16.65 16.65L21 21" />
              </svg>
            </span>
            <input type="text" placeholder="Search..." />
          </div>
          <button className="btn-filter">
            <span className="icon icon-filter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </span>
            Filter
          </button>
          <button className="btn-add-employee" onClick={() => setIsAddEmployeeModalOpen(true)}>
            <span className="icon icon-add">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
            </span>
            Add employee
          </button>
        </div>
      </header>

      <section className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Dept.</th>
              <th>Today</th>
              <th>In / Out</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((emp, index) => (
              <tr key={index}>
                <td>
                  <div className="emp-cell">
                    <div className={`avatar-circle bg-${emp.colorClass}`}>{emp.initials}</div>
                    <div className="emp-details">
                      <span className="emp-name" onClick={() => setCurrentView('employee-profile')} style={{ cursor: 'pointer' }}>{emp.name}</span>
                      <span className="emp-id">{emp.id}</span>
                    </div>
                  </div>
                </td>
                <td>{emp.dept}</td>
                <td>
                  <span className={`status-pill emp-status ${emp.status.toLowerCase().replace(' ', '-')}`}>
                    {emp.status}
                  </span>
                </td>
                <td>{emp.inOut}</td>
                <td>
                  <button className="btn-view" onClick={() => setCurrentView('employee-profile')}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );

  const attendanceData = [
    { initials: "RK", name: "Ramesh Kumar", dept: "Software Dev", punchIn: "09:02\nAM", punchOut: "06:14\nPM", hours: "9h 12m", status: "Present", colorClass: "green" },
    { initials: "PS", name: "Priya Shankar", dept: "HR", punchIn: "09:48\nAM", punchOut: "—", hours: "—", status: "Late", colorClass: "orange" },
    { initials: "AJ", name: "Arjun John", dept: "Finance", punchIn: "—", punchOut: "—", hours: "—", status: "Absent", colorClass: "red" },
    { initials: "MV", name: "Meena Velu", dept: "Software Dev", punchIn: "08:55\nAM", punchOut: "06:00\nPM", hours: "9h 05m", status: "Present", colorClass: "green" },
    { initials: "SB", name: "Suresh Babu", dept: "Support", punchIn: "09:05\nAM", punchOut: "06:10\nPM", hours: "9h 05m", status: "Present", colorClass: "green" },
    { initials: "LR", name: "Lakshmi Rajan", dept: "Marketing", punchIn: "—", punchOut: "—", hours: "—", status: "On leave", colorClass: "blue" }
  ];

  const attendanceCalendarDays = [
    { date: '5', status: 'present' }, { date: '6', status: 'late' }, { date: '7', status: 'present' }, { date: '8', status: 'present' },
    { date: '9', status: 'present' }, { date: '10', status: 'off' }, { date: '11', status: 'off' },
    { date: '12', status: 'off' }, { date: '13', status: 'present' }, { date: '14', status: 'present' }, { date: '15', status: 'absent' }, { date: '16', status: 'present' }, { date: '17', status: 'off' }, { date: '18', status: 'off' },
    { date: '19', status: 'present' }, { date: '20', status: 'present' }, { date: '21', status: 'present' }, { date: '22', status: 'present' }, { date: '23', status: 'off' }, { date: '24', status: 'off' }, { date: '25', status: 'present' },
    { date: '26', status: 'halfday' }, { date: '27', status: 'present' }, { date: '28', status: 'present' }, { date: '29', status: 'present' }, { date: '30', status: 'off' }, { date: '31', status: 'off' }
  ];

  const monthlySummaryStats = [
    { label: 'Present', value: '23', colorClass: 'summary-green' },
    { label: 'Absent', value: '1', colorClass: 'summary-red' },
    { label: 'Late', value: '3', colorClass: 'summary-yellow' },
    { label: 'Half-day', value: '1', colorClass: 'summary-blue' },
    { label: 'Avg hrs/day', value: '9h 05m', colorClass: 'summary-gray' }
  ];

  const renderAttendanceContent = () => (
    <>
      <header className="dashboard-header attendance-header">
        <div className="welcome-text">
          <h1>Attendance</h1>
          <p>{currentDate}</p>
        </div>
        <div className="header-actions">
          <div className="toggle-group">
            <button
              className={`toggle-btn ${attendanceViewMode === 'daily' ? 'active' : ''}`}
              onClick={() => setAttendanceViewMode('daily')}
            >
              Daily log
            </button>
            <button
              className={`toggle-btn ${attendanceViewMode === 'monthly' ? 'active' : ''}`}
              onClick={() => setAttendanceViewMode('monthly')}
            >
              Monthly summary
            </button>
          </div>
        </div>
      </header>

      {attendanceViewMode === 'daily' ? (
        <>
          <section className="attendance-stats-grid">
            <div className="attendance-stat-card border-green">
              <h3>Present</h3>
              <div className="value text-green">3</div>
            </div>
            <div className="attendance-stat-card border-yellow">
              <h3>Late</h3>
              <div className="value text-yellow">1</div>
            </div>
            <div className="attendance-stat-card border-red">
              <h3>Absent</h3>
              <div className="value text-red">1</div>
            </div>
            <div className="attendance-stat-card border-blue">
              <h3>On leave</h3>
              <div className="value text-blue">1</div>
            </div>
          </section>

          <section className="employees-table-container attendance-table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th className="center-col">Punch<br />in</th>
                  <th className="center-col">Punch<br />out</th>
                  <th className="center-col">Hours</th>
                  <th className="right-col">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((emp, index) => (
                  <tr key={index}>
                    <td>
                      <div className="emp-cell">
                        <div className={`avatar-circle bg-${emp.colorClass}`}>{emp.initials}</div>
                        <span className="emp-name">{emp.name}</span>
                      </div>
                    </td>
                    <td>{emp.dept}</td>
                    <td className="center-col multi-line">{emp.punchIn}</td>
                    <td className="center-col multi-line">{emp.punchOut}</td>
                    <td className="center-col">{emp.hours}</td>
                    <td className="right-col">
                      <span className={`status-pill emp-status ${emp.status.toLowerCase().replace(' ', '-')}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <>
          <section className="attendance-summary-top-row">
            <div className="attendance-filter-pill">
              <select>
                <option>Ramesh Kumar</option>
                <option>Priya Shankar</option>
                <option>Arjun John</option>
              </select>
            </div>
            <div className="attendance-filter-pill">
              <select>
                <option>May 2026</option>
                <option>June 2026</option>
                <option>July 2026</option>
              </select>
            </div>
            <div className="attendance-legend-row">
              <span className="legend-item present">Present</span>
              <span className="legend-item absent">Absent</span>
              <span className="legend-item late">Late</span>
              <span className="legend-item halfday">Half-day</span>
            </div>
          </section>

          <section className="attendance-calendar-card">
            <div className="calendar-title-row">
              <h3>May 2026</h3>
              <div className="calendar-meta">Attendance overview</div>
            </div>
            <div className="calendar-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="calendar-weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-grid">
              {attendanceCalendarDays.map((item, index) => (
                <div key={index} className={`calendar-cell ${item.status}`}>
                  {item.date}
                </div>
              ))}
            </div>
          </section>

          <section className="attendance-summary-grid">
            {monthlySummaryStats.map((stat, index) => (
              <div key={index} className={`attendance-summary-card ${stat.colorClass}`}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </section>
        </>
      )}
    </>
  );

  const leaveRequestsData = [
    { initials: "RK", name: "Ramesh Kumar", bgClass: "bg-green-light", status: "Pending", type: "Casual leave", duration: "1 day · 18 May 2026", reason: "Reason: Personal work", deduct: "₹1,000", typeClass: "casual" },
    { initials: "PS", name: "Priya Shankar", bgClass: "bg-orange-light", status: "Pending", type: "Sick leave", duration: "2 days · 19 May 2026 → 20 May 2026", reason: "Reason: Fever and medical checkup", deduct: "₹2,000", typeClass: "sick" },
    { initials: "AJ", name: "Arjun John", bgClass: "bg-red-light", status: "Pending", type: "Casual leave", duration: "2 days · 22 May 2026 → 23 May 2026", reason: "Reason: Family function", deduct: "₹2,000", typeClass: "casual" }
  ];

  const leaveHistoryData = [
    { initials: "MV", name: "Meena Velu", bgClass: "bg-green-light", type: "Casual leave", dateRange: "02 May", days: 1, deduction: "- ₹1,000", status: "Approved", typeClass: "casual" },
    { initials: "RK", name: "Ramesh Kumar", bgClass: "bg-green-light", type: "Sick leave", dateRange: "10 May \n→ 11 May", days: 2, deduction: "- ₹2,000", status: "Approved", typeClass: "sick" },
    { initials: "LR", name: "Lakshmi Rajan", bgClass: "bg-blue-light", type: "Casual leave", dateRange: "12 May \n→ 15 May", days: 4, deduction: "- ₹4,000", status: "Approved", typeClass: "casual" },
    { initials: "AJ", name: "Arjun John", bgClass: "bg-red-light", type: "Casual leave", dateRange: "05 May", days: 1, deduction: "—", status: "Rejected", typeClass: "casual" }
  ];

  const leaveBalanceData = [
    { initials: "RK", name: "Ramesh Kumar", role: "Software Dev", bgClass: "bg-green-light", clUsed: 1, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 },
    { initials: "PS", name: "Priya Shankar", role: "HR", bgClass: "bg-orange-light", clUsed: 3, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 },
    { initials: "AJ", name: "Arjun John", role: "Finance", bgClass: "bg-red-light", clUsed: 5, clTotal: 12, slUsed: 1, slTotal: 6, elUsed: 2, elTotal: 15 },
    { initials: "MV", name: "Meena Velu", role: "Software Dev", bgClass: "bg-green-light", clUsed: 1, clTotal: 12, slUsed: 0, slTotal: 6, elUsed: 1, elTotal: 15 },
    { initials: "SB", name: "Suresh Babu", role: "Support", bgClass: "bg-green-light", clUsed: 2, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 }
  ];

  const reportsAbsenteesData = [
    { initials: 'RK', name: 'Ramesh Kumar', dept: 'Software Dev', bgClass: 'bg-green-light', days: 5, risk: 'High', riskClass: 'high' },
    { initials: 'PS', name: 'Priya Shankar', dept: 'HR', bgClass: 'bg-orange-light', days: 3, risk: 'Medium', riskClass: 'medium' },
    { initials: 'AJ', name: 'Arjun John', dept: 'Finance', bgClass: 'bg-red-light', days: 2, risk: 'Low', riskClass: 'low' }
  ];

  const reportsAttendanceData = [
    { initials: "RK", name: "Ramesh Kumar", bgClass: "bg-green-light", present: 22, absent: 2, late: 3, halfDay: 0, leave: 1, avgHrs: "9h 12m", rate: "89%" },
    { initials: "PS", name: "Priya Shankar", bgClass: "bg-orange-light", present: 20, absent: 1, late: 5, halfDay: 1, leave: 2, avgHrs: "8h 55m", rate: "82%" },
    { initials: "AJ", name: "Arjun John", bgClass: "bg-red-light", present: 18, absent: 5, late: 1, halfDay: 1, leave: 0, avgHrs: "9h 00m", rate: "73%" },
    { initials: "MV", name: "Meena Velu", bgClass: "bg-green-light", present: 23, absent: 0, late: 0, halfDay: 0, leave: 1, avgHrs: "9h 05m", rate: "96%" },
    { initials: "SB", name: "Suresh Babu", bgClass: "bg-green-light", present: 21, absent: 1, late: 2, halfDay: 0, leave: 2, avgHrs: "8h 50m", rate: "85%" },
    { initials: "LR", name: "Lakshmi Rajan", bgClass: "bg-blue-light", present: 19, absent: 0, late: 1, halfDay: 0, leave: 4, avgHrs: "9h 10m", rate: "88%" }
  ];

  const reportsSalaryData = [
    { initials: 'RK', name: 'Ramesh Kumar',  bgClass: 'bg-green-light',  gross: '₹51,000', leaveDed: '-₹1,000', otherDed: '-₹9,285',  net: '₹40,715', status: 'paid' },
    { initials: 'PS', name: 'Priya Shankar', bgClass: 'bg-orange-light', gross: '₹41,200', leaveDed: '-₹2,000', otherDed: '-₹8,310',  net: '₹30,890', status: 'paid' },
    { initials: 'AJ', name: 'Arjun John',    bgClass: 'bg-red-light',    gross: '₹60,000', leaveDed: '₹0',      otherDed: '-₹14,892', net: '₹45,108', status: 'paid' },
    { initials: 'MV', name: 'Meena Velu',    bgClass: 'bg-green-light',  gross: '₹38,500', leaveDed: '₹0',      otherDed: '-₹7,508',  net: '₹30,992', status: 'paid' },
    { initials: 'SB', name: 'Suresh Babu',   bgClass: 'bg-green-light',  gross: '₹45,000', leaveDed: '-₹2,000', otherDed: '-₹9,305',  net: '₹33,695', status: 'held' },
    { initials: 'LR', name: 'Lakshmi Rajan', bgClass: 'bg-blue-light',   gross: '₹75,000', leaveDed: '₹0',      otherDed: '-₹15,400', net: '₹59,600', status: 'paid' },
  ];

  const renderReportsContent = () => (
    <>
      <header className="dashboard-header leave-header" style={{ alignItems: 'flex-start' }}>
        <div className="leave-welcome-text">
          <h1>Reports</h1>
          <p>May 2026 — analytics &amp; exports</p>
        </div>
        <div className="reports-header-actions">
          <div className="reports-tabs-row">
            <button className={`reports-tab ${reportsActiveTab === 'overview' ? 'active' : ''}`} onClick={() => setReportsActiveTab('overview')}>Overview</button>
            <button className={`reports-tab ${reportsActiveTab === 'attendance' ? 'active' : ''}`} onClick={() => setReportsActiveTab('attendance')}>Attendance</button>
            <button className={`reports-tab ${reportsActiveTab === 'salary' ? 'active' : ''}`} onClick={() => setReportsActiveTab('salary')}>Salary</button>
          </div>
          <div className="reports-tabs-row">
            <button className={`reports-tab ${reportsActiveTab === 'export' ? 'active' : ''}`} onClick={() => setReportsActiveTab('export')}>Export</button>
          </div>
        </div>
      </header>

      {/* ── OVERVIEW TAB ── */}
      {reportsActiveTab === 'overview' && (
        <>
          <section className="reports-summary-grid">
            <div className="report-summary-card">
              <h3>Avg attendance</h3>
              <div className="value" style={{ color: '#15803d' }}>89%</div>
              <div className="subtext" style={{ color: '#15803d' }}>+2% vs last month</div>
            </div>
            <div className="report-summary-card">
              <h3>Absent this month</h3>
              <div className="value" style={{ color: '#991b1b' }}>7%</div>
              <div className="subtext" style={{ color: '#991b1b' }}>3 high-risk employees</div>
            </div>
            <div className="report-summary-card">
              <h3>Total salary paid</h3>
              <div className="value">₹8.48L</div>
              <div className="subtext">Net after deductions</div>
            </div>
            <div className="report-summary-card">
              <h3>Leave requests</h3>
              <div className="value" style={{ color: '#854d0e' }}>9</div>
              <div className="subtext" style={{ color: '#854d0e' }}>5 pending approval</div>
            </div>
          </section>

          <section className="reports-charts-grid">
            <div className="report-chart-card">
              <h3>Attendance trend — 5 months</h3>
              <div className="subtitle">Present % per month</div>
              <div className="bar-chart-container">
                {[{ label: 'Jan', value: 88 }, { label: 'Feb', value: 91 }, { label: 'Mar', value: 85 }, { label: 'Apr', value: 93 }, { label: 'May', value: 89 }].map(m => (
                  <div key={m.label} className="bar-column">
                    <div className="bar-value">{m.value}%</div>
                    <div className="bar-fill" style={{ height: `${m.value}%` }}></div>
                    <div className="bar-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-chart-card">
              <h3>Department attendance %</h3>
              <div className="subtitle">This month</div>
              <div className="dept-progress-list">
                {[
                  { dept: 'Software Dev', value: 92, color: 'green' },
                  { dept: 'HR',           value: 96, color: 'green' },
                  { dept: 'Finance',      value: 80, color: 'red'   },
                  { dept: 'Marketing',    value: 88, color: 'orange'},
                  { dept: 'Support',      value: 91, color: 'green' },
                ].map(d => (
                  <div key={d.dept} className="dept-progress-item">
                    <div className="dept-progress-labels">
                      <span>{d.dept}</span>
                      <span className="perc" style={{ color: d.color === 'green' ? '#15803d' : d.color === 'red' ? '#991b1b' : '#854d0e' }}>{d.value}%</span>
                    </div>
                    <div className="dept-progress-track">
                      <div className={`dept-progress-fill ${d.color}`} style={{ width: `${d.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="absentees-card">
            <h3>Top absentees this month</h3>
            <div className="absentees-list">
              {reportsAbsenteesData.map((emp, index) => (
                <div key={index} className="absentee-item">
                  <div className="absentee-info">
                    <div className={`avatar-circle ${emp.bgClass}`}>{emp.initials}</div>
                    <div className="absentee-details">
                      <h4>{emp.name}</h4>
                      <p>{emp.dept}</p>
                    </div>
                  </div>
                  <div className="absentee-stats">
                    <span>{emp.days} days absent</span>
                    <span className={`risk-badge ${emp.riskClass}`}>{emp.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── ATTENDANCE TAB ── */}
      {reportsActiveTab === 'attendance' && (
        <>
          <div className="reports-filter-row">
            <div className="reports-filters-left">
              <select className="reports-filter-select" defaultValue="all">
                <option value="all">All departments</option>
                <option value="dev">Software Dev</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
              <select className="reports-filter-select" defaultValue="may26">
                <option value="may26">May 2026</option>
                <option value="apr26">April 2026</option>
                <option value="mar26">March 2026</option>
              </select>
            </div>
            <div className="reports-filters-right">
              <button className="btn-export-excel"><span>📄</span> Export Excel</button>
              <button className="btn-export-pdf"><span>📄</span> Export PDF</button>
            </div>
          </div>

          <section className="reports-attendance-stats-grid">
            <div className="report-summary-card"><h3>Working days</h3><div className="value">26</div></div>
            <div className="report-summary-card"><h3>Total present</h3><div className="value" style={{ color: '#15803d' }}>41</div></div>
            <div className="report-summary-card"><h3>Total absent</h3><div className="value" style={{ color: '#991b1b' }}>6</div></div>
            <div className="report-summary-card"><h3>Late arrivals</h3><div className="value" style={{ color: '#854d0e' }}>14</div></div>
            <div className="report-summary-card"><h3>Half days</h3><div className="value" style={{ color: '#2563eb' }}>3</div></div>
          </section>

          <section className="absentees-card">
            <h3>Monthly attendance — all employees</h3>
            <div className="employees-table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th className="center-col">Present</th>
                    <th className="center-col">Absent</th>
                    <th className="center-col">Late</th>
                    <th className="center-col">Half day</th>
                    <th className="center-col">Leave</th>
                    <th className="center-col">Avg hrs</th>
                    <th className="center-col">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsAttendanceData.map((emp, index) => (
                    <tr key={index}>
                      <td>
                        <div className="emp-cell">
                          <div className={`avatar-circle ${emp.bgClass}`}>{emp.initials}</div>
                          <span className="emp-name">{emp.name}</span>
                        </div>
                      </td>
                      <td className="center-col" style={{ color: '#15803d', fontWeight: '500' }}>{emp.present}</td>
                      <td className="center-col" style={{ color: emp.absent > 0 ? '#b91c1c' : 'inherit', fontWeight: emp.absent > 0 ? '500' : 'normal' }}>{emp.absent}</td>
                      <td className="center-col">{emp.late}</td>
                      <td className="center-col">{emp.halfDay}</td>
                      <td className="center-col" style={{ color: emp.leave > 0 ? '#2563eb' : 'inherit', fontWeight: emp.leave > 0 ? '500' : 'inherit' }}>{emp.leave}</td>
                      <td className="center-col">{emp.avgHrs}</td>
                      <td className="center-col" style={{ color: '#854d0e', fontWeight: '600' }}>{emp.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── SALARY TAB ── */}
      {reportsActiveTab === 'salary' && (
        <>
          {/* Export buttons */}
          <div className="reports-filter-row">
            <div className="reports-filters-left"></div>
            <div className="reports-filters-right">
              <button className="btn-export-excel"><span>📄</span> Export Excel</button>
              <button className="btn-export-pdf"><span>📄</span> Export PDF</button>
            </div>
          </div>

          {/* Summary cards */}
          <section className="reports-summary-grid">
            <div className="report-summary-card">
              <h3>Total gross</h3>
              <div className="value">₹10.1L</div>
            </div>
            <div className="report-summary-card">
              <h3>Total deductions</h3>
              <div className="value" style={{ color: '#991b1b' }}>₹1.62L</div>
            </div>
            <div className="report-summary-card">
              <h3>Net payable</h3>
              <div className="value" style={{ color: '#15803d' }}>₹8.48L</div>
            </div>
            <div className="report-summary-card">
              <h3>Held salaries</h3>
              <div className="value" style={{ color: '#854d0e' }}>₹5,000</div>
            </div>
          </section>

          {/* Charts row */}
          <section className="reports-charts-grid">
            {/* Gross vs Net dual bar chart */}
            <div className="report-chart-card">
              <h3>Gross vs net — 5 months</h3>
              <div className="subtitle">In lakhs (₹)</div>
              <div className="bar-chart-container" style={{ alignItems: 'flex-end', gap: '16px' }}>
                {[
                  { label: 'Jan', gross: 75, net: 62 },
                  { label: 'Feb', gross: 80, net: 66 },
                  { label: 'Mar', gross: 78, net: 63 },
                  { label: 'Apr', gross: 87, net: 72 },
                  { label: 'May', gross: 92, net: 77 },
                ].map(m => (
                  <div key={m.label} className="bar-column" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '100%', justifyContent: 'center' }}>
                      <div style={{ width: '14px', height: `${m.gross}%`, background: '#a3c97a', borderRadius: '3px 3px 0 0' }}></div>
                      <div style={{ width: '14px', height: `${m.net}%`, background: '#4a7c2f', borderRadius: '3px 3px 0 0' }}></div>
                    </div>
                    <div className="bar-label">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <span className="legend-item"><span style={{ display:'inline-block', width:'12px', height:'12px', background:'#a3c97a', borderRadius:'2px', marginRight:'4px' }}></span>Gross</span>
                <span className="legend-item" style={{ marginLeft:'16px' }}><span style={{ display:'inline-block', width:'12px', height:'12px', background:'#4a7c2f', borderRadius:'2px', marginRight:'4px' }}></span>Net</span>
              </div>
            </div>

            {/* Deduction breakdown */}
            <div className="report-chart-card">
              <h3>Deduction breakdown — May</h3>
              <div className="subtitle">By type</div>
              <div className="dept-progress-list">
                {[
                  { label: 'PF (12% basic)',    amount: '₹55,200', pct: 90, color: '#8B3A3A' },
                  { label: 'ESI (0.75%)',        amount: '₹7,575',  pct: 18, color: '#7A6A5A' },
                  { label: 'Leave deductions',   amount: '₹10,000', pct: 30, color: '#4A7A8A' },
                  { label: 'Absent deductions',  amount: '₹18,460', pct: 52, color: '#7A3A3A' },
                  { label: 'Late deductions',    amount: '₹1,400',  pct:  6, color: '#9A9A8A' },
                ].map(d => (
                  <div key={d.label} className="dept-progress-item">
                    <div className="dept-progress-labels">
                      <span>{d.label}</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>{d.amount}</span>
                    </div>
                    <div className="dept-progress-track">
                      <div className="dept-progress-fill" style={{ width: `${d.pct}%`, background: d.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Salary register table */}
          <section className="absentees-card">
            <h3>Salary register — May 2026</h3>
            <div className="employees-table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th className="center-col">Gross</th>
                    <th className="center-col">Leave ded.</th>
                    <th className="center-col">Other ded.</th>
                    <th className="center-col">Net pay</th>
                    <th className="center-col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsSalaryData.map((emp, index) => (
                    <tr key={index}>
                      <td>
                        <div className="emp-cell">
                          <div className={`avatar-circle ${emp.bgClass}`}>{emp.initials}</div>
                          <span className="emp-name">{emp.name}</span>
                        </div>
                      </td>
                      <td className="center-col">{emp.gross}</td>
                      <td className="center-col" style={{ color: emp.leaveDed.startsWith('-') ? '#b91c1c' : 'inherit' }}>{emp.leaveDed}</td>
                      <td className="center-col" style={{ color: '#b91c1c' }}>{emp.otherDed}</td>
                      <td className="center-col" style={{ color: '#15803d', fontWeight: '600' }}>{emp.net}</td>
                      <td className="center-col">
                        <span className={`status-pill ${emp.status === 'paid' ? 'approved' : 'pending'}`}>{emp.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── EXPORT TAB ── */}
      {reportsActiveTab === 'export' && (
        <>
          <section className="reports-export-section">
            <h3 className="section-title" style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>Download reports</h3>
            
            <div className="export-cards-grid">
              {/* Card 1 */}
              <div className="export-card">
                <div className="export-icon-box bg-blue-light text-blue">📄</div>
                <div className="export-card-content">
                  <h4>Employee master list</h4>
                  <p>Full list of all employees with details</p>
                  <div className="export-actions">
                    <span className="export-formats">Excel / PDF</span>
                    <div className="export-buttons">
                      <button className="btn-export-small excel"><span>📊</span> Excel</button>
                      <button className="btn-export-small pdf"><span>📄</span> PDF</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="export-card">
                <div className="export-icon-box bg-green-light text-green">📅</div>
                <div className="export-card-content">
                  <h4>Monthly attendance report</h4>
                  <p>All employees — present, absent, late, leave</p>
                  <div className="export-actions">
                    <span className="export-formats">Excel / PDF</span>
                    <div className="export-buttons">
                      <button className="btn-export-small excel"><span>📊</span> Excel</button>
                      <button className="btn-export-small pdf"><span>📄</span> PDF</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="export-card">
                <div className="export-icon-box" style={{ background: '#fef3c7', color: '#b45309' }}>💰</div>
                <div className="export-card-content">
                  <h4>Salary register</h4>
                  <p>Gross, deductions, and net pay for all staff</p>
                  <div className="export-actions">
                    <span className="export-formats">Excel / PDF</span>
                    <div className="export-buttons">
                      <button className="btn-export-small excel"><span>📊</span> Excel</button>
                      <button className="btn-export-small pdf"><span>📄</span> PDF</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="export-card">
                <div className="export-icon-box bg-red-light text-red">⚠️</div>
                <div className="export-card-content">
                  <h4>Absent &amp; late report</h4>
                  <p>Employees with high absenteeism flagged</p>
                  <div className="export-actions">
                    <span className="export-formats">PDF</span>
                    <div className="export-buttons">
                      <button className="btn-export-small pdf"><span>📄</span> PDF</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="export-card">
                <div className="export-icon-box bg-blue-light text-blue">✈️</div>
                <div className="export-card-content">
                  <h4>Leave summary report</h4>
                  <p>Leave taken, approved, rejected per employee</p>
                  <div className="export-actions">
                    <span className="export-formats">Excel</span>
                    <div className="export-buttons">
                      <button className="btn-export-small excel"><span>📊</span> Excel</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="export-card">
                <div className="export-icon-box bg-green-light text-green">📉</div>
                <div className="export-card-content">
                  <h4>Payroll deduction report</h4>
                  <p>PF, ESI, leave &amp; absence deductions breakdown</p>
                  <div className="export-actions">
                    <span className="export-formats">Excel / PDF</span>
                    <div className="export-buttons">
                      <button className="btn-export-small excel"><span>📊</span> Excel</button>
                      <button className="btn-export-small pdf"><span>📄</span> PDF</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="reports-custom-section">
            <h3 className="section-title" style={{ marginBottom: '16px', fontSize: '1.1rem', fontWeight: '600' }}>Custom report</h3>
            
            <div className="custom-report-filters">
              <div className="filter-group">
                <label>Select employee</label>
                <select className="reports-filter-select" style={{ width: '100%' }}>
                  <option>All employees</option>
                  <option>Ramesh Kumar</option>
                  <option>Priya Shankar</option>
                </select>
              </div>
              <div className="filter-group">
                <label>From month</label>
                <select className="reports-filter-select" style={{ width: '100%' }}>
                  <option>January 2026</option>
                  <option>February 2026</option>
                </select>
              </div>
              <div className="filter-group">
                <label>To month</label>
                <select className="reports-filter-select" style={{ width: '100%' }}>
                  <option>May 2026</option>
                  <option>April 2026</option>
                </select>
              </div>
            </div>

            <div className="custom-report-checkboxes">
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Attendance</label>
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Salary</label>
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Leave</label>
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Late arrivals</label>
              <label className="checkbox-label"><input type="checkbox" defaultChecked /> Deductions</label>
            </div>

            <div className="custom-report-actions">
              <button className="btn-export-large excel"><span>📊</span> Export Excel</button>
              <button className="btn-export-large pdf"><span>📄</span> Export PDF</button>
            </div>
          </section>
        </>
      )}

      {['overview', 'attendance', 'salary', 'export'].indexOf(reportsActiveTab) === -1 && (
        <div className="report-fallback">
          <p>Select a report tab to view content.</p>
        </div>
      )}
    </>
  );


  const renderLeaveContent = () => (
    <>
      <header className="dashboard-header leave-header">
        <div className="leave-welcome-text">
          <h1>Leave management</h1>
          <p>{leaveActiveTab === 'pending' ? '5 pending requests' : leaveActiveTab === 'history' ? 'Leave history — May 2026' : 'Leave balance — all employees'}</p>
        </div>
        <div className="leave-tabs-container">
          <button className={`leave-tab ${leaveActiveTab === 'pending' ? 'active' : ''}`} onClick={() => setLeaveActiveTab('pending')}>
            Pending<br />requests
          </button>
          <button className={`leave-tab ${leaveActiveTab === 'history' ? 'active' : ''}`} onClick={() => setLeaveActiveTab('history')}>
            Approved<br />history
          </button>
          <button className={`leave-tab ${leaveActiveTab === 'balance' ? 'active' : ''}`} onClick={() => setLeaveActiveTab('balance')}>
            Leave<br />balance
          </button>
        </div>
      </header>

      {leaveActiveTab === 'pending' && (
        <>
          <section className="leave-stats-grid">
            <div className="leave-stat-card pending">
              <h3>Pending</h3>
              <div className="value">5</div>
            </div>
            <div className="leave-stat-card approved">
              <h3>Approved</h3>
              <div className="value">0</div>
            </div>
            <div className="leave-stat-card rejected">
              <h3>Rejected</h3>
              <div className="value">0</div>
            </div>
          </section>

          <div className="leave-requests-list">
            {leaveRequestsData.map((req, index) => (
              <div key={index} className="leave-request-card">
                <div className="lr-header">
                  <div className="lr-user-info">
                    <div className={`lr-avatar ${req.bgClass}`}>{req.initials}</div>
                    <div className="lr-details">
                      <h3>{req.name}</h3>
                      <div className="lr-meta">
                        <span className={`lr-badge ${req.typeClass}`}>{req.type}</span>
                        <span>{req.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="lr-badge pending">{req.status}</span>
                </div>
                <div className="lr-reason">
                  {req.reason}
                </div>
                <div className="lr-actions">
                  <button className="btn-outline-green">
                    <span>✓</span> Approve — salary auto-deducts {req.deduct}
                  </button>
                  <button className="btn-outline-red">
                    <span>✕</span> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {leaveActiveTab === 'history' && (
        <section className="employees-table-container">
          <table className="employees-table leave-history-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Period</th>
                <th className="center-col">Days</th>
                <th className="center-col">Deduction</th>
                <th className="right-col">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistoryData.map((record, index) => (
                <tr key={index}>
                  <td>
                    <div className="emp-cell">
                      <div className={`avatar-circle ${record.bgClass}`}>{record.initials}</div>
                      <span className="emp-name">{record.name}</span>
                    </div>
                  </td>
                  <td><span className={`lr-badge ${record.typeClass}`}>{record.type}</span></td>
                  <td className="multi-line" style={{ whiteSpace: 'pre-line', lineHeight: '1.4' }}>{record.dateRange}</td>
                  <td className="center-col">{record.days}</td>
                  <td className="center-col" style={{ color: record.deduction.startsWith('-') ? '#991b1b' : 'inherit' }}>{record.deduction}</td>
                  <td className="right-col">
                    <span className={`status-pill ${record.status === 'Approved' ? 'approved' : 'rejected'}`}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {leaveActiveTab === 'balance' && (
        <div className="leave-requests-list">
          {leaveBalanceData.map((emp, index) => (
            <div key={index} className="leave-balance-card">
              <div className="lb-header">
                <div className="lb-user-info">
                  <div className={`avatar-circle ${emp.bgClass}`}>{emp.initials}</div>
                  <div className="lb-details">
                    <h3>{emp.name}</h3>
                    <p>{emp.role}</p>
                  </div>
                </div>
                <div className="lb-summary">
                  <span>CL: <strong>{emp.clUsed}/{emp.clTotal}</strong></span>
                  <span>SL: <strong>{emp.slUsed}/{emp.slTotal}</strong></span>
                  <span>EL: <strong>{emp.elUsed}/{emp.elTotal}</strong></span>
                </div>
              </div>
              <div className="lb-progress-bars">
                <div className="lb-progress-item">
                  <div className="lb-progress-labels">
                    <span>Casual leave</span>
                    <span>{emp.clUsed} of {emp.clTotal} used</span>
                  </div>
                  <div className="lb-progress-track">
                    <div className="lb-progress-fill fill-casual" style={{ width: `${(emp.clUsed / emp.clTotal) * 100}%` }}></div>
                  </div>
                </div>
                <div className="lb-progress-item">
                  <div className="lb-progress-labels">
                    <span>Sick leave</span>
                    <span>{emp.slUsed} of {emp.slTotal} used</span>
                  </div>
                  <div className="lb-progress-track">
                    <div className="lb-progress-fill fill-sick" style={{ width: `${(emp.slUsed / emp.slTotal) * 100}%` }}></div>
                  </div>
                </div>
                <div className="lb-progress-item">
                  <div className="lb-progress-labels">
                    <span>Earned leave</span>
                    <span>{emp.elUsed} of {emp.elTotal} used</span>
                  </div>
                  <div className="lb-progress-track">
                    <div className="lb-progress-fill fill-earned" style={{ width: `${(emp.elUsed / emp.elTotal) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderEmployeeProfile = () => {
    return (
      <div className="employee-profile-view">
        <div className="profile-actions-header">
          <button className="btn-secondary" onClick={() => setCurrentView('employees')}>
            <span className="icon icon-arrow-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
            Back to Employees
          </button>
          <div className="profile-actions-right">
            <button className="btn-secondary">
              <span className="icon icon-edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </span>
              Edit
            </button>
            <button className="btn-secondary">
              <span className="icon icon-delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </span>
              Delete
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-main-card">
          <div className="profile-banner"></div>
          <div className="profile-info-container">
            <div className="avatar-large bg-blue">RK</div>
            <div className="profile-header-content">
              <div className="profile-name-row">
                <h2>Ramesh Kumar</h2>
                <span className="status-pill present">Present Today</span>
              </div>
              <p className="profile-role">Senior Software Engineer · EMP-001</p>
              <div className="profile-tags">
                <span className="profile-tag">Software Dev</span>
                <span className="profile-tag">Joined 12 Mar 2021</span>
                <span className="profile-tag">Chennai HQ</span>
                <span className="profile-tag">Full-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="profile-section-card">
          <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
              </svg>
            </span>
            THIS MONTH'S ATTENDANCE
          </h3>
          <div className="attendance-summary-grid">
            <div className="attendance-box">
              <span className="att-count text-green">19</span>
              <span className="att-label">Present</span>
            </div>
            <div className="attendance-box">
              <span className="att-count text-yellow">2</span>
              <span className="att-label">Late</span>
            </div>
            <div className="attendance-box">
              <span className="att-count text-red">1</span>
              <span className="att-label">Absent</span>
            </div>
            <div className="attendance-box">
              <span className="att-count text-blue">3</span>
              <span className="att-label">Leave</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="profile-details-grid">
          {/* Personal Details */}
          <div className="profile-section-card">
            <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M4 20v-1a7 7 0 0114 0v1" />
              </svg>
            </span>
            PERSONAL DETAILS
          </h3>
            <div className="details-list">
              <div className="detail-row"><span className="d-label">Date of Birth</span><span className="d-value right-align">14 Aug<br />1992</span></div>
              <div className="detail-row"><span className="d-label">Gender</span><span className="d-value right-align">Male</span></div>
              <div className="detail-row"><span className="d-label">Blood Group</span><span className="d-value right-align">B+</span></div>
              <div className="detail-row"><span className="d-label">Marital Status</span><span className="d-value right-align">Married</span></div>
              <div className="detail-row"><span className="d-label">Mobile</span><span className="d-value right-align">+91 98400<br />12345</span></div>
              <div className="detail-row"><span className="d-label">Personal Email</span><span className="d-value right-align text-link">ramesh@gmail.com</span></div>
            </div>
          </div>

          {/* Job Details */}
          <div className="profile-section-card">
            <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M7 7V4h10v3" />
              </svg>
            </span>
            JOB DETAILS
          </h3>
            <div className="details-list">
              <div className="detail-row"><span className="d-label">Department</span><span className="d-value right-align">Software Dev</span></div>
              <div className="detail-row"><span className="d-label">Designation</span><span className="d-value right-align">Sr. Engineer</span></div>
              <div className="detail-row"><span className="d-label">Reporting To</span><span className="d-value right-align">Anand Raj</span></div>
              <div className="detail-row"><span className="d-label">Official Email</span><span className="d-value right-align text-link">ramesh@co.in</span></div>
              <div className="detail-row"><span className="d-label">Shift</span><span className="d-value right-align">9AM – 6PM</span></div>
              <div className="detail-row"><span className="d-label">CTC</span><span className="d-value right-align">₹9,00,000 / yr</span></div>
            </div>
          </div>

          {/* Government IDs */}
          <div className="profile-section-card">
            <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10" />
                <path d="M7 12h4" />
                <path d="M7 16h6" />
              </svg>
            </span>
            GOVERNMENT IDS
          </h3>
            <div className="details-list">
              <div className="detail-row"><span className="d-label">Aadhaar</span><span className="d-value right-align">XXXX XXXX 4512</span></div>
              <div className="detail-row"><span className="d-label">PAN</span><span className="d-value right-align">BBBPE9312F</span></div>
              <div className="detail-row"><span className="d-label">UAN (PF)</span><span className="d-value right-align">100234512345</span></div>
              <div className="detail-row"><span className="d-label">ESIC</span><span className="d-value right-align">Not Applicable</span></div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="profile-section-card">
            <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10h18" />
                <path d="M7 10v8" />
                <path d="M12 10v8" />
                <path d="M17 10v8" />
                <path d="M4 10L12 4l8 6" />
              </svg>
            </span>
            BANK DETAILS
          </h3>
            <div className="details-list">
              <div className="detail-row"><span className="d-label">Bank</span><span className="d-value right-align">State Bank of India</span></div>
              <div className="detail-row"><span className="d-label">Account No.</span><span className="d-value right-align">XXXX XXXX<br />7891</span></div>
              <div className="detail-row"><span className="d-label">IFSC</span><span className="d-value right-align">SBIN0002145</span></div>
              <div className="detail-row"><span className="d-label">Account Type</span><span className="d-value right-align">Savings</span></div>
            </div>
          </div>
        </div>

        {/* Education & Skills */}
        <div className="profile-section-card">
          <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L2 8l10 5 10-5-10-5z" />
                <path d="M2 16l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            EDUCATION & SKILLS
          </h3>
          <div className="details-list edu-skills-layout">
            <div className="edu-col">
              <div className="detail-row"><span className="d-label">Qualification</span><span className="d-value right-align">B.E – Computer Science</span></div>
              <div className="detail-row"><span className="d-label">University</span><span className="d-value right-align">Anna University</span></div>
              <div className="detail-row"><span className="d-label">Year of Passing</span><span className="d-value right-align">2014</span></div>
            </div>
            <div className="skills-col">
              <span className="d-label">Skills</span>
              <div className="skills-tags">
                <span className="skill-pill">Python</span>
                <span className="skill-pill">Java</span>
                <span className="skill-pill">React</span>
                <span className="skill-pill">SQL</span>
                <span className="skill-pill">AWS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="profile-section-card">
          <h3 className="section-subtitle">
            <span className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4V4z" />
                <path d="M8 7h8" />
                <path d="M8 12h8" />
                <path d="M8 17h5" />
              </svg>
            </span>
            EMERGENCY CONTACT
          </h3>
          <div className="details-list">
            <div className="detail-row"><span className="d-label">Name</span><span className="d-value right-align">Kavitha Ramesh (Spouse)</span></div>
            <div className="detail-row"><span className="d-label">Mobile</span><span className="d-value right-align">+91 94440 56789</span></div>
            <div className="detail-row"><span className="d-label">Address</span><span className="d-value right-align">14, Anna Nagar East, Chennai – 600102</span></div>
          </div>
        </div>

      </div>
    );
  };

  const renderSalaryContent = () => (
    <>
      <header className="dashboard-header attendance-header">
        <div className="welcome-text">
          <h1>Salary</h1>
          <p>May 2026 payroll</p>
        </div>
        <div className="header-actions">
          <div className="toggle-group">
            <button className={`toggle-btn ${salaryActiveTab === 'slip' ? 'active' : ''}`} onClick={() => setSalaryActiveTab('slip')}>Salary slip</button>
            <button className={`toggle-btn ${salaryActiveTab === 'payroll' ? 'active' : ''}`} onClick={() => setSalaryActiveTab('payroll')}>Payroll sheet</button>
          </div>
        </div>
      </header>

      {salaryActiveTab === 'slip' && (
        <>
          <div className="salary-filters">
        <select className="salary-select">
          <option>Ramesh Kumar</option>
        </select>
        <select className="salary-select">
          <option>May 2026</option>
        </select>
      </div>

      <div className="salary-content-grid">
        <div className="salary-card">
          <div className="employee-salary-header">
            <div className="avatar-circle bg-green" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>RK</div>
            <div className="emp-details">
              <span className="emp-name" style={{ fontSize: '1.1rem', color: '#111827' }}>Ramesh Kumar</span>
              <span className="emp-id" style={{ fontSize: '0.9rem' }}>EMP-001 · Software Dev</span>
            </div>
          </div>

          <hr className="divider" />

          <h3 className="section-title">Earnings</h3>

          <div className="salary-list">
            <div className="salary-item">
              <span className="item-label">Basic salary</span>
              <span className="item-value">₹35,000</span>
            </div>
            <div className="salary-item">
              <span className="item-label">HRA (40%)</span>
              <span className="item-value">₹14,000</span>
            </div>
            <div className="salary-item">
              <span className="item-label">Travel allowance</span>
              <span className="item-value">₹2,000</span>
            </div>
          </div>

          <hr className="divider" />

          <div className="salary-item gross-salary">
            <span className="item-label">Gross salary</span>
            <span className="item-value text-green">₹51,000</span>
          </div>
        </div>

        <div className="salary-card">
          <h3 className="section-title">Deductions</h3>

          <div className="salary-list">
            <div className="salary-item">
              <span className="item-label">2 absent days</span>
              <span className="item-value text-red">- ₹2,692</span>
            </div>
            <div className="salary-item">
              <span className="item-label">1 leave days (₹1,000/day)</span>
              <span className="item-value text-red multi-line-value">-<br />₹1,000</span>
            </div>
            <div className="salary-item">
              <span className="item-label">Late arrivals deduction</span>
              <span className="item-value text-red">- ₹600</span>
            </div>
            <div className="salary-item">
              <span className="item-label">PF (12% of basic)</span>
              <span className="item-value text-red">- ₹4,200</span>
            </div>
            <div className="salary-item">
              <span className="item-label">ESI (0.75% of gross)</span>
              <span className="item-value text-red multi-line-value">-<br />₹383</span>
            </div>
          </div>

          <div className="net-salary-box">
            <div className="net-salary-labels">
              <h4>Net salary payable</h4>
              <p>After all deductions</p>
            </div>
            <div className="net-salary-amount">₹42,125</div>
          </div>
        </div>
      </div>

      <div className="salary-actions">
        <button className="btn-secondary">
          <span className="icon">📄</span> Download PDF
        </button>
        <button className="btn-primary-green">
          <span className="icon">✅</span> Mark as paid
        </button>
      </div>
        </>
      )}

      {salaryActiveTab === 'payroll' && (
        <>
          <section className="reports-summary-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
            <div className="report-summary-card" style={{ border: '2px solid #16a34a', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Total gross</h3>
              <div className="value" style={{ color: '#16a34a', fontSize: '1.75rem' }}>₹2,86,400</div>
            </div>
            <div className="report-summary-card" style={{ border: '2px solid #dc2626', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Total deductions</h3>
              <div className="value" style={{ color: '#dc2626', fontSize: '1.75rem' }}>₹50,761</div>
            </div>
            <div className="report-summary-card" style={{ border: '2px solid #2563eb', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>Total net payable</h3>
              <div className="value" style={{ color: '#2563eb', fontSize: '1.75rem' }}>₹2,35,639</div>
            </div>
          </section>

          <section className="employees-table-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', gap: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <button className="btn-secondary">
                <span className="icon">📄</span> Export Excel
              </button>
              <button className="btn-primary-blue" style={{ background: '#dbeafe', border: '1px solid #93c5fd', color: '#1e40af', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span className="icon">📋</span> Process all
              </button>
            </div>
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th className="center-col">Gross</th>
                  <th className="center-col">Absent ded.</th>
                  <th className="center-col">Leave ded.</th>
                  <th className="center-col">PF+ESI</th>
                  <th className="center-col">Net pay</th>
                  <th className="center-col">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { initials: 'RK', name: 'Ramesh Kumar', role: 'Software Dev', bgClass: 'bg-green-light', gross: '₹51,000', absentDed: '- ₹2,692', leaveDed: '- ₹1,000', pfEsi: '- ₹4,583', netPay: '₹42,125', status: 'Pending', statusClass: 'pending' },
                  { initials: 'PS', name: 'Priya Shankar', role: 'HR', bgClass: 'bg-orange-light', gross: '₹41,200', absentDed: '- ₹1,077', leaveDed: '- ₹2,000', pfEsi: '- ₹3,669', netPay: '₹33,454', status: 'Pending', statusClass: 'pending' },
                  { initials: 'AJ', name: 'Arjun John', role: 'Finance', bgClass: 'bg-red-light', gross: '₹60,800', absentDed: '- ₹8,077', leaveDed: '- ₹0', pfEsi: '- ₹5,496', netPay: '₹47,027', status: 'Paid', statusClass: 'approved' },
                  { initials: 'MV', name: 'Meena Velu', role: 'Software Dev', bgClass: 'bg-green-light', gross: '₹45,400', absentDed: '- ₹0', leaveDed: '- ₹1,000', pfEsi: '- ₹4,061', netPay: '₹40,339', status: 'Pending', statusClass: 'pending' },
                  { initials: 'SB', name: 'Suresh Babu', role: 'Support', bgClass: 'bg-red-light', gross: '₹32,800', absentDed: '- ₹846', leaveDed: '- ₹2,000', pfEsi: '- ₹2,886', netPay: '₹26,668', status: 'Held', statusClass: 'rejected' },
                  { initials: 'LR', name: 'Lakshmi Rajan', role: 'Marketing', bgClass: 'bg-blue-light', gross: '₹55,200', absentDed: '- ₹0', leaveDed: '- ₹4,000', pfEsi: '- ₹4,974', netPay: '₹46,026', status: 'Pending', statusClass: 'pending' }
                ].map((emp, index) => (
                  <tr key={index}>
                    <td>
                      <div className="emp-cell">
                        <div className={`avatar-circle ${emp.bgClass}`}>{emp.initials}</div>
                        <div className="emp-details">
                          <span className="emp-name">{emp.name}</span>
                          <span className="emp-id" style={{ fontSize: '0.85rem', color: '#6b7280' }}>{emp.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="center-col">{emp.gross}</td>
                    <td className="center-col" style={{ color: emp.absentDed !== '- ₹0' ? '#991b1b' : '#6b7280' }}>{emp.absentDed}</td>
                    <td className="center-col" style={{ color: emp.leaveDed !== '- ₹0' ? '#991b1b' : '#6b7280' }}>{emp.leaveDed}</td>
                    <td className="center-col" style={{ color: '#991b1b' }}>{emp.pfEsi}</td>
                    <td className="center-col" style={{ color: '#15803d', fontWeight: '600' }}>{emp.netPay}</td>
                    <td className="center-col">
                      <span className={`status-pill ${emp.statusClass}`}>{emp.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-icon"></div>
          <h2>HR portal</h2>
        </div>

        <nav className="nav-menu">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-dashboard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="4" height="9" rx="1" />
                <rect x="10" y="7" width="4" height="13" rx="1" />
                <rect x="16" y="4" width="4" height="16" rx="1" />
              </svg>
            </span>
            Dashboard
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('employees'); }} className={`nav-item ${currentView === 'employees' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-employees">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11a4 4 0 118 0" />
                <path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
              </svg>
            </span>
            Employees
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('attendance'); }} className={`nav-item ${currentView === 'attendance' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-attendance">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="5" width="16" height="16" rx="2" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
              </svg>
            </span>
            Attendance
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('salary'); }} className={`nav-item ${currentView === 'salary' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-salary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="6" />
                <path d="M12 8v8" />
                <path d="M9 12h6" />
              </svg>
            </span>
            Salary
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('leave'); }} className={`nav-item ${currentView === 'leave' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-leave">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h14v16H5z" />
                <path d="M9 4v16" />
                <path d="M9 8h10" />
              </svg>
            </span>
            Leave
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('reports'); }} className={`nav-item ${currentView === 'reports' ? 'active' : ''}`}>
            <span className="nav-icon nav-icon-reports">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 16l4-4 4 4 6-6" />
                <path d="M4 20h16" />
              </svg>
            </span>
            Reports
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="logout-btn">
            <span className="nav-icon nav-icon-logout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 7v-2a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2" />
                <path d="M13 12h8" />
                <path d="M17 8l4 4-4 4" />
              </svg>
            </span>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'dashboard' && renderDashboardContent()}
        {currentView === 'employees' && renderEmployeesContent()}
        {currentView === 'attendance' && renderAttendanceContent()}
        {currentView === 'salary' && renderSalaryContent()}
        {currentView === 'employee-profile' && renderEmployeeProfile()}
        {currentView === 'leave' && renderLeaveContent()}
        {currentView === 'reports' && renderReportsContent()}
      </main>

      <AddEmployeeModal isOpen={isAddEmployeeModalOpen} onClose={() => setIsAddEmployeeModalOpen(false)} />
    </div>
  );
};

export default HRDashboard;
