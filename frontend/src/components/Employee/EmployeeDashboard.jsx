import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import '../HRDashboard/HRDashboard.css';
import EmployeeSalary from './EmployeeSalary';
import EmployeeLeave from './EmployeeLeave';
import EmployeeProfile from './EmployeeProfile';
import EmployeeAttendance from './EmployeeAttendance';

// Animated page wrapper — fades + slides in on every view change
const AnimatedPage = ({ children, pageKey }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, [pageKey]);
  return (
    <div
      key={pageKey}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.28s ease, transform 0.28s ease',
      }}
    >
      {children}
    </div>
  );
};

const EmployeeDashboard = ({ onLogout }) => {
  const { view } = useParams();
  const navigate = useNavigate();
  const activeMenu = view || 'dashboard';

  const setActiveMenu = (newView) => {
    navigate(`/employee/${newView}`);
  };

  const [leaveSheetTab, setLeaveSheetTab] = useState('balance');

  // HR-style leave balance sheet view
  const renderLeaveBalanceSheet = () => (
    <div className="leave-sheet-view">
      <header className="dashboard-header leave-header" style={{ alignItems: 'flex-start' }}>
        <div className="leave-welcome-text">
          <h1>Leave management</h1>
          <p>Leave balance — all employees</p>
        </div>
        <div className="leave-tabs-container" style={{ marginLeft: 'auto' }}>
          <button className={`leave-tab ${leaveSheetTab === 'pending' ? 'active' : ''}`} onClick={() => setLeaveSheetTab('pending')}>Pending requests</button>
          <button className={`leave-tab ${leaveSheetTab === 'history' ? 'active' : ''}`} onClick={() => setLeaveSheetTab('history')}>Approved history</button>
          <button className={`leave-tab ${leaveSheetTab === 'balance' ? 'active' : ''}`} onClick={() => setLeaveSheetTab('balance')}>Leave balance</button>
        </div>
      </header>

      <div className="leave-requests-list" style={{ paddingBottom: '0' }}>
        {leaveBalanceList.map((emp, index) => (
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
                <div className="lb-chip cl">
                  <span className="chip-label">CL</span>
                  <span className="chip-value">{emp.clUsed}/{emp.clTotal}</span>
                </div>
                <div className="lb-chip sl">
                  <span className="chip-label">SL</span>
                  <span className="chip-value">{emp.slUsed}/{emp.slTotal}</span>
                </div>
                <div className="lb-chip el">
                  <span className="chip-label">EL</span>
                  <span className="chip-value">{emp.elUsed}/{emp.elTotal}</span>
                </div>
              </div>
            </div>
            <div className="lb-progress-bars">
              <div className="lb-progress-item">
                <div className="lb-progress-labels">
                  <span className="prog-title">Casual leave</span>
                  <span className="prog-count">{emp.clUsed} of {emp.clTotal} used</span>
                </div>
                <div className="lb-progress-track">
                  <div className="lb-progress-fill fill-casual" style={{ width: `${(emp.clUsed / emp.clTotal) * 100}%` }}></div>
                </div>
              </div>
              <div className="lb-progress-item">
                <div className="lb-progress-labels">
                  <span className="prog-title">Sick leave</span>
                  <span className="prog-count">{emp.slUsed} of {emp.slTotal} used</span>
                </div>
                <div className="lb-progress-track">
                  <div className="lb-progress-fill fill-sick" style={{ width: `${(emp.slUsed / emp.slTotal) * 100}%` }}></div>
                </div>
              </div>
              <div className="lb-progress-item">
                <div className="lb-progress-labels">
                  <span className="prog-title">Earned leave</span>
                  <span className="prog-count">{emp.elUsed} of {emp.elTotal} used</span>
                </div>
                <div className="lb-progress-track">
                  <div className="lb-progress-fill fill-earned" style={{ width: `${(emp.elUsed / emp.elTotal) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, color: '#6b7280', fontSize: '13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
          <div>Showing 1 to {leaveBalanceList.length} of {leaveBalanceList.length} entries</div>
          <div>
            Rows per page:
            <select style={{ marginLeft: 8 }} defaultValue="5">
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const employeeData = {
    name: 'Ramesh Kumar',
    empId: 'EMP-0045',
    status: 'Present',
    initials: 'RK',
  };

  // sample leave balance list (HR-style) for the sheet view
  const leaveBalanceList = [
    { initials: 'RK', name: 'Ramesh Kumar', role: 'Software Dev', bgClass: 'bg-green-light', clUsed: 1, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 },
    { initials: 'PS', name: 'Priya Shankar', role: 'HR', bgClass: 'bg-orange-light', clUsed: 3, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 },
    { initials: 'AJ', name: 'Arjun John', role: 'Finance', bgClass: 'bg-red-light', clUsed: 5, clTotal: 12, slUsed: 1, slTotal: 6, elUsed: 2, elTotal: 15 },
    { initials: 'MV', name: 'Meena Velu', role: 'Software Dev', bgClass: 'bg-green-light', clUsed: 1, clTotal: 12, slUsed: 0, slTotal: 6, elUsed: 1, elTotal: 15 },
    { initials: 'SB', name: 'Suresh Babu', role: 'Support', bgClass: 'bg-green-light', clUsed: 2, clTotal: 12, slUsed: 2, slTotal: 6, elUsed: 0, elTotal: 15 }
  ];

  const dashboardData = {
    date: 'Thursday, 15 May 2026',
    alerts: 2,
    thisMonth: {
      present: 20,
      absent: 1,
      leavesTaken: 1,
      lateArrivals: 1
    },
    todayPunch: {
      punchIn: '09:02 AM',
      punchOut: '—',
      shift: '9:00 AM – 6:00 PM',
      status: 'On time'
    },
    leaveBalance: [
      { type: 'Casual leave', remaining: '10 remaining', colorClass: 'green' },
      { type: 'Sick leave', remaining: '4 remaining', colorClass: 'blue' },
      { type: 'Earned leave', remaining: '13 remaining', colorClass: 'brown' }
    ],
    salary: {
      month: 'April 2026',
      status: 'Paid',
      gross: 'Gross ₹51,000',
      net: '₹43,325 net'
    },
    notifications: [
      {
        type: 'approved',
        title: 'Leave approved',
        details: '21 May 2026 — Casual leave\napproved by HR'
      },
      {
        type: 'ready',
        title: 'Salary slip ready',
        details: 'May 2026 salary slip is ready to view'
      }
    ]
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="11" width="4" height="9" rx="1" />
          <rect x="10" y="7" width="4" height="13" rx="1" />
          <rect x="16" y="4" width="4" height="16" rx="1" />
        </svg>
      )
    },
    {
      id: 'attendance',
      label: 'My attendance',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
        </svg>
      )
    },
    {
      id: 'salary',
      label: 'My salary',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="6" />
          <path d="M12 8v8" />
          <path d="M9 12h6" />
        </svg>
      )
    },
    {
      id: 'leave',
      label: 'Leave',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h14v16H5z" />
          <path d="M9 4v16" />
          <path d="M9 8h10" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'My profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11a4 4 0 118 0" />
          <path d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
        </svg>
      )
    }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'salary':
        return <EmployeeSalary employeeData={employeeData} dashboardData={dashboardData} />;
      case 'leave':
        return <EmployeeLeave employeeData={employeeData} dashboardData={dashboardData} setActiveMenu={setActiveMenu} />;
      case 'profile':
        return <EmployeeProfile employeeData={employeeData} dashboardData={dashboardData} />;
      case 'attendance':
        return <EmployeeAttendance employeeData={employeeData} dashboardData={dashboardData} />;
      default:
        return (
          <>
            {/* Header */}
            <header className="employee-dashboard-header">
              <div className="header-title-box">
                <h1>Dashboard</h1>
                <p>{dashboardData.date}</p>
              </div>
              <div className="header-right">
                <button className="alerts-btn">
                  <span className="alerts-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                  </span> {dashboardData.alerts} alerts
                </button>
                <div className="user-avatar-header">{employeeData.initials}</div>
              </div>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-label">This month<br/>present</p>
                <p className="stat-value text-green">{dashboardData.thisMonth.present}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Absent</p>
                <p className="stat-value text-red">{dashboardData.thisMonth.absent}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Leave taken</p>
                <p className="stat-value text-blue">{dashboardData.thisMonth.leavesTaken}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Late arrivals</p>
                <p className="stat-value text-brown">{dashboardData.thisMonth.lateArrivals}</p>
              </div>
            </div>

            {/* Content Grid */}
            <div className="content-grid">
              {/* Today's Punch */}
              <div className="card">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '20px', height: '20px', color: '#6366f1'}}>
                    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
                    <path d="M5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5" />
                    <path d="M9 12c0-1.65 1.35-3 3-3s3 1.35 3 3" />
                    <path d="M12 15v4" />
                  </svg>
                  Today's punch
                </h3>
                <div className="punch-container">
                  <div className="punch-box in">
                    <p className="punch-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px', color: '#16a34a'}}>
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                      </svg>
                      Punch in
                    </p>
                    <p className="punch-time">{dashboardData.todayPunch.punchIn}</p>
                  </div>
                  <div className="punch-box out">
                    <p className="punch-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px', color: '#dc2626'}}>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                      </svg>
                      Punch out
                    </p>
                    <p className="punch-time">{dashboardData.todayPunch.punchOut}</p>
                  </div>
                </div>
                <div className="shift-info-box">
                  <span className="shift-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span className="shift-text">Shift: {dashboardData.todayPunch.shift}</span>
                  <span className="shift-status-pill">{dashboardData.todayPunch.status}</span>
                </div>
              </div>

              {/* Leave Balance */}
              <div className="card">
                <h3>Leave balance</h3>
                <div className="leave-list">
                  {dashboardData.leaveBalance.map((leave, idx) => (
                    <div key={idx} className="leave-item-container">
                      <div className="leave-item-header">
                        <span className="leave-type">{leave.type}</span>
                        <span className={`leave-remaining text-${leave.colorClass}`}>{leave.remaining}</span>
                      </div>
                      <div className="leave-progress-bar">
                        <div className={`leave-progress-fill bg-${leave.colorClass}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button className="apply-leave-btn" onClick={() => setActiveMenu('leave')}>
                  <span className="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px', marginRight: '6px', verticalAlign: '-3px'}}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="12" y1="14" x2="12" y2="18" />
                      <line x1="10" y1="16" x2="14" y2="16" />
                    </svg>
                    </span>
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveMenu('leave-balance')}>View leave balance (all)</button>
                </div>
              </div>

              {/* Latest Salary Slip */}
              <div className="card">
                <h3>Latest salary slip</h3>
                <div className="salary-card-inner">
                  <div className="salary-top-row">
                    <p className="salary-month">{dashboardData.salary.month}</p>
                    <span className="salary-pill">{dashboardData.salary.status}</span>
                  </div>
                  <div className="salary-bottom-row">
                    <p className="salary-gross">{dashboardData.salary.gross}</p>
                    <p className="salary-net">{dashboardData.salary.net}</p>
                  </div>
                </div>
                <button className="view-slips-btn" onClick={() => setActiveMenu('salary')}>
                  <span className="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px', marginRight: '6px', verticalAlign: '-3px'}}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span> View all salary slips
                </button>
              </div>

              {/* Notifications */}
              <div className="card borderless">
                <h3>Notifications</h3>
                <div className="notifications-list">
                  {dashboardData.notifications.map((notif, idx) => (
                    <div key={idx} className={`notification-card ${notif.type}`}>
                      <h4>{notif.title}</h4>
                      <p className="notif-details">{notif.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="employee-dashboard-container">
      {/* Sidebar */}
      <aside className="employee-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '24px', height: '24px'}}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className="sidebar-title-box">
            <h3>My portal</h3>
            <p className="portal-label">Employee</p>
          </div>
        </div>

        <div className="employee-card-sidebar">
          <div className="employee-avatar-sidebar">{employeeData.initials}</div>
          <div className="employee-info-sidebar">
            <h4>{employeeData.name}</h4>
            <p className="emp-id-sidebar">{employeeData.empId}</p>
            <div className="status-badge-sidebar">{employeeData.status}</div>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
              <path d="M9 7v-2a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2" />
              <path d="M13 12h8" />
              <path d="M17 8l4 4-4 4" />
            </svg>
          </span> Logout
        </button>
      </aside>

      {/* Main Content with page transition */}
      <main className="employee-main">
        <AnimatedPage pageKey={activeMenu}>
            {activeMenu === 'leave-balance' ? renderLeaveBalanceSheet() : renderContent()}
          </AnimatedPage>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
