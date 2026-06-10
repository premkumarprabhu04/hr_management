import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CustomDatePicker.css';
import './EmployeeLeave.css';

// Animated tab content wrapper
const AnimatedTab = ({ children, tabKey }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, [tabKey]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.24s ease, transform 0.24s ease',
      }}
    >
      {children}
    </div>
  );
};

const EmployeeLeave = ({ employeeData, dashboardData, setActiveMenu }) => {
  const [activeTab, setActiveTab] = useState('balance');
  const [fromDate, setFromDate] = useState(new Date(2026, 4, 22));
  const [toDate, setToDate] = useState(new Date(2026, 4, 22));

  const leaveBalances = [
    { type: 'Casual leave', left: 10, used: 2, total: 12, colorClass: 'green' },
    { type: 'Sick leave', left: 4, used: 2, total: 6, colorClass: 'blue' },
    { type: 'Earned leave', left: 13, used: 2, total: 15, colorClass: 'brown' }
  ];

  const leaveRequests = [
    {
      id: 1,
      type: 'Casual leave',
      dateStr: '21 May 2026',
      days: 1,
      reason: 'Personal Work',
      approvedBy: 'HR Kavitha',
      status: 'approved',
      deduction: '- ₹1,000 deducted'
    },
    {
      id: 2,
      type: 'Sick leave',
      dateStr: '02 Apr 2026',
      days: 1,
      reason: 'Fever',
      approvedBy: 'HR Kavitha',
      status: 'approved',
      deduction: '- ₹1,000 deducted'
    },
    {
      id: 3,
      type: 'Casual leave',
      dateStr: '10 Mar 2026 → 11 Mar 2026',
      days: 2,
      reason: 'Travel',
      approvedBy: 'HR Kavitha',
      status: 'rejected',
      deduction: 'No deduction'
    }
  ];

  return (
    <div className="employee-leave-view">
      {/* Header */}
      <header className="employee-dashboard-header">
        <div className="header-title-box">
          <h1>Leave</h1>
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

      {/* Tabs */}
      <div className="leave-tabs">
        <button
          className={`leave-tab-btn ${activeTab === 'balance' ? 'active' : ''}`}
          onClick={() => setActiveTab('balance')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '15px', height: '15px', verticalAlign: '-2px', marginRight: '6px'}}>
            <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
          </svg>
          Leave balance
        </button>
        <button
          className={`leave-tab-btn ${activeTab === 'apply' ? 'active' : ''}`}
          onClick={() => setActiveTab('apply')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '15px', height: '15px', verticalAlign: '-2px', marginRight: '6px'}}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="10" y1="16" x2="14" y2="16" />
          </svg>
          Apply for leave
        </button>
        <button
          className={`leave-tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '15px', height: '15px', verticalAlign: '-2px', marginRight: '6px'}}>
            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          My requests
        </button>
      </div>

      {/* Tab Content: Leave Balance */}
      {activeTab === 'balance' && (
        <AnimatedTab tabKey="balance">
          <div className="leave-tab-content">
            <div className="leave-balance-top-grid">
              {leaveBalances.map((leave, idx) => (
                <div key={idx} className="leave-balance-card">
                  <p className="leave-card-type">{leave.type}</p>
                  <p className={`leave-card-left text-${leave.colorClass}`}>{leave.left} left</p>
                  <p className="leave-card-used">{leave.used} used of {leave.total}</p>
                </div>
              ))}
            </div>

            <div className="card leave-usage-card">
              <h3>Leave usage</h3>
              <div className="usage-list">
                {leaveBalances.map((leave, idx) => (
                  <div key={idx} className="usage-item">
                    <div className="usage-header">
                      <span className="usage-type">{leave.type}</span>
                      <span className={`usage-count text-${leave.colorClass}`}>{leave.used} / {leave.total} days</span>
                    </div>
                    <div className="usage-progress-bar">
                      <div
                        className={`usage-progress-fill bg-${leave.colorClass}`}
                        style={{ width: `${(leave.used / leave.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {/* Unpaid Leave */}
                <div className="usage-item">
                  <div className="usage-header">
                    <span className="usage-type">Unpaid leave</span>
                    <span className="usage-count text-red">0 days used</span>
                  </div>
                  <div className="usage-progress-bar">
                    <div className="usage-progress-fill bg-red" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>

              <div className="leave-info-box blue-info">
                <span className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', flexShrink: 0}}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </span>
                <p>Each approved leave day will deduct ₹1,000 from your monthly salary.</p>
              </div>
            </div>
          </div>
        </AnimatedTab>
      )}

      {/* Tab Content: Apply for Leave */}
      {activeTab === 'apply' && (
        <AnimatedTab tabKey="apply">
          <div className="leave-tab-content">
            <div className="card apply-leave-card">
              <h3>Apply for leave</h3>

              <div className="form-group">
                <label>Leave type</label>
                <select className="form-input">
                  <option>Casual leave</option>
                  <option>Sick leave</option>
                  <option>Earned leave</option>
                  <option>Unpaid leave</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>From date</label>
                  <div className="date-input-wrapper">
                    <DatePicker 
                      selected={fromDate} 
                      onChange={(date) => setFromDate(date)} 
                      className="form-input"
                      dateFormat="dd MMM yyyy"
                    />
                    <span className="date-icon" style={{ pointerEvents: 'none' }}>📅</span>
                  </div>
                </div>
                <div className="form-group half">
                  <label>To date</label>
                  <div className="date-input-wrapper">
                    <DatePicker 
                      selected={toDate} 
                      onChange={(date) => setToDate(date)} 
                      className="form-input"
                      dateFormat="dd MMM yyyy"
                    />
                    <span className="date-icon" style={{ pointerEvents: 'none' }}>📅</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea className="form-input textarea" rows="3" placeholder="Brief reason for leave..."></textarea>
              </div>

              <div className="leave-info-box brown-info">
                <span className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', flexShrink: 0}}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </span>
                <p>Each leave day will deduct ₹1,000 from your salary. Unpaid leave is always deducted regardless of leave balance.</p>
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setActiveTab('balance')}>Cancel</button>
                <button className="btn-submit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                    <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                  Submit request
                </button>
              </div>
            </div>
          </div>
        </AnimatedTab>
      )}

      {/* Tab Content: My Requests */}
      {activeTab === 'requests' && (
        <AnimatedTab tabKey="requests">
          <div className="leave-tab-content">
            <div className="card my-requests-card">
              <h3>My leave requests</h3>

              <div className="requests-list">
                {leaveRequests.map((req) => (
                  <div key={req.id} className="request-item">
                    <div className="request-left">
                      <div className="request-title-row">
                        <span className="request-type">{req.type}</span>
                        <span className="request-date">{req.dateStr} · {req.days} {req.days > 1 ? 'days' : 'day'}</span>
                      </div>
                      <p className="request-reason">Reason: {req.reason}</p>
                      {req.status === 'approved' ? (
                        <p className="request-approved-by">Approved by {req.approvedBy}</p>
                      ) : (
                        <p className="request-approved-by">Rejected by {req.approvedBy}</p>
                      )}
                    </div>
                    <div className="request-right">
                      <span className={`status-pill ${req.status}`}>{req.status}</span>
                      <span className={`request-deduction ${req.status === 'rejected' ? 'text-red' : 'text-green'}`}>
                        {req.deduction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedTab>
      )}
    </div>
  );
};

export default EmployeeLeave;
