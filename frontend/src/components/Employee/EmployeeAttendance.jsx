import React, { useState, useEffect } from 'react';
import { usePagination, PaginatedView } from '../../hooks/usePagination';
import Pagination from '../Shared/Pagination';
import './EmployeeAttendance.css';

// Smooth tab transition wrapper
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

const EmployeeAttendance = () => {
  const [activeTab, setActiveTab] = useState('today');

  const historyData = [
    { date: '14 May', day: 'Wed', clockIn: '09:00 AM', clockOut: '06:05 PM', hours: '9h 05m', method: 'biometric', status: 'present' },
    { date: '13 May', day: 'Tue', clockIn: '09:12 AM', clockOut: '06:00 PM', hours: '8h 48m', method: 'clock', status: 'late' },
    { date: '12 May', day: 'Mon', clockIn: '08:58 AM', clockOut: '06:10 PM', hours: '9h 12m', method: 'biometric', status: 'present' },
    { date: '10 May', day: 'Sat', clockIn: '—', clockOut: '—', hours: '—', method: '—', status: 'weekend' },
    { date: '09 May', day: 'Fri', clockIn: '09:01 AM', clockOut: '06:00 PM', hours: '8h 59m', method: 'clock', status: 'present' },
    { date: '08 May', day: 'Thu', clockIn: '—', clockOut: '—', hours: '—', method: '—', status: 'absent' },
    { date: '07 May', day: 'Wed', clockIn: '09:00 AM', clockOut: '03:30 PM', hours: '6h 30m', method: 'biometric', status: 'half-day' },
    { date: '06 May', day: 'Tue', clockIn: '08:55 AM', clockOut: '06:05 PM', hours: '9h 10m', method: 'biometric', status: 'present' },
    { date: '05 May', day: 'Mon', clockIn: '09:05 AM', clockOut: '06:00 PM', hours: '8h 55m', method: 'biometric', status: 'present' },
    { date: '03 May', day: 'Sat', clockIn: '—', clockOut: '—', hours: '—', method: '—', status: 'weekend' },
    { date: '02 May', day: 'Fri', clockIn: '08:50 AM', clockOut: '05:55 PM', hours: '9h 05m', method: 'clock', status: 'present' },
    { date: '01 May', day: 'Thu', clockIn: '09:00 AM', clockOut: '06:00 PM', hours: '9h 00m', method: 'biometric', status: 'present' }
  ];

  const paginationProps = usePagination(historyData, 5);

  const calendarDays = [
    { day: '', status: '' }, { day: '1', status: 'Pr' }, { day: '2', status: 'Pr' }, { day: '3', status: 'weekend' }, { day: '4', status: 'weekend' }, { day: '5', status: 'Pr' }, { day: '6', status: 'La' },
    { day: '7', status: 'Pr' }, { day: '8', status: 'Ab' }, { day: '9', status: 'Pr' }, { day: '10', status: 'weekend' }, { day: '11', status: 'weekend' }, { day: '12', status: 'Pr' }, { day: '13', status: 'Pr' },
    { day: '14', status: 'Pr' }, { day: '15', status: 'Pr' }, { day: '16', status: 'Pr' }, { day: '17', status: 'weekend' }, { day: '18', status: 'weekend' }, { day: '19', status: 'Pr' }, { day: '20', status: 'Pr' },
    { day: '21', status: 'Le' }, { day: '22', status: 'Pr' }, { day: '23', status: 'weekend' }, { day: '24', status: 'weekend' }, { day: '25', status: 'Ab' }, { day: '26', status: 'Pr' }, { day: '27', status: 'Pr' },
    { day: '28', status: 'Pr' }, { day: '29', status: 'Pr' }, { day: '30', status: 'weekend' }, { day: '31', status: 'weekend' }, { day: '', status: '' }, { day: '', status: '' }, { day: '', status: '' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pr': return 'cal-pr';
      case 'Ab': return 'cal-ab';
      case 'La': return 'cal-la';
      case 'Le': return 'cal-le';
      case 'weekend': return 'cal-we';
      default: return 'cal-empty';
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'present': return 'badge-present';
      case 'late': return 'badge-late';
      case 'weekend': return 'badge-weekend';
      case 'absent': return 'badge-absent';
      case 'half-day': return 'badge-halfday';
      default: return '';
    }
  };

  // SVG icons
  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '28px', height: '28px'}}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const FingerprintIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '28px', height: '28px'}}>
      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
      <path d="M5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5" />
      <path d="M9 12c0-1.65 1.35-3 3-3s3 1.35 3 3" />
      <path d="M12 15v4" />
    </svg>
  );

  const MethodIcon = ({ method }) => {
    if (method === 'biometric') return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px', verticalAlign: '-2px', marginRight: '4px'}}>
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
        <path d="M5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5" />
        <path d="M9 12c0-1.65 1.35-3 3-3s3 1.35 3 3" />
        <path d="M12 15v4" />
      </svg>
    );
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '14px', height: '14px', verticalAlign: '-2px', marginRight: '4px'}}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  };

  return (
    <div className="attendance-view-container">
      {/* Header */}
      <div className="attendance-header-row">
        <div>
          <h1>My attendance</h1>
          <p>Tuesday, 9 June 2026</p>
        </div>
        <div className="attendance-tabs-container">
          <button className={`att-tab-btn ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>Today</button>
          <button className={`att-tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</button>
          <button className={`att-tab-btn ${activeTab === 'monthly' ? 'active' : ''}`} onClick={() => setActiveTab('monthly')}>Monthly</button>
        </div>
      </div>

      {/* TODAY TAB */}
      {activeTab === 'today' && (
        <AnimatedTab tabKey="today">
          <div className="attendance-tab-content">
            <div className="att-top-stats">
              <div className="att-stat-card">
                <span className="att-stat-label">Status</span>
                <span className="att-stat-badge active-work-badge">Working</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Clock in</span>
                <span className="att-stat-val text-brown">12:07 pm</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Clock out</span>
                <span className="att-stat-val">—</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Hours worked</span>
                <span className="att-stat-val">00:37:49</span>
              </div>
            </div>

            <div className="card att-shift-card">
              <div className="shift-header">
                <span className="shift-title">Shift progress</span>
                <span className="shift-target">Target: 9h 00m</span>
              </div>
              <div className="shift-progress-bar">
                <div className="shift-progress-fill" style={{ width: '7%' }}></div>
              </div>
              <div className="shift-footer">
                <span>9:00 AM</span>
                <span className="text-green shift-pct">7% complete</span>
                <span>6:00 PM</span>
              </div>
            </div>

            <div className="att-methods-grid">
              <div className="att-method-card selected">
                <div className="method-icon-box blue-box">
                  <ClockIcon />
                </div>
                <div className="method-info">
                  <h4>Clock in / out</h4>
                  <p>Manual time entry</p>
                  <p className="method-desc">Click a button to record your arrival and departure time manually.</p>
                </div>
                <span className="selected-badge">Selected</span>
              </div>
              <div className="att-method-card">
                <div className="method-icon-box green-box">
                  <FingerprintIcon />
                </div>
                <div className="method-info">
                  <h4>Fingerprint biometric</h4>
                  <p>Device scan required</p>
                  <p className="method-desc">Place your finger on the scanner. System auto-detects punch in or out.</p>
                </div>
              </div>
            </div>

            <div className="card att-working-card">
              <div className="working-header">
                <div>
                  <h3>Currently working</h3>
                  <p>Clocked in at 12:07 pm</p>
                </div>
                <span className="working-badge">Active</span>
              </div>
              <div className="working-timer-box">
                <p>Time elapsed</p>
                <h2>00:37:49</h2>
              </div>
              <button className="clock-out-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
                Clock out
              </button>
            </div>

            <div className="card att-log-card">
              <h3>Today's log</h3>
              <div className="log-timeline">
                <div className="log-item">
                  <div className="log-dot green-dot"></div>
                  <div className="log-time">12:07 pm</div>
                  <div className="log-action">Clocked in</div>
                  <div className="log-badge">Late</div>
                </div>
                <div className="log-item">
                  <div className="log-dot orange-dot"></div>
                  <div className="log-time"></div>
                  <div className="log-action orange-text">Still working — not clocked out yet</div>
                  <div className="log-badge empty"></div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedTab>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <AnimatedTab tabKey="history">
          <div className="attendance-tab-content">
            <div className="att-top-stats">
              <div className="att-stat-card">
                <span className="att-stat-label">Present</span>
                <span className="att-stat-val text-green">20</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Absent</span>
                <span className="att-stat-val text-red">1</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Late</span>
                <span className="att-stat-val text-brown">1</span>
              </div>
              <div className="att-stat-card">
                <span className="att-stat-label">Half-days</span>
                <span className="att-stat-val text-blue">1</span>
              </div>
            </div>

            <div className="card att-history-card" style={{ padding: 0, overflow: 'hidden' }}>
              <PaginatedView isTransitioning={paginationProps.isTransitioning}>
                <table className="history-table" style={{ margin: 0, width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Clock in</th>
                      <th>Clock out</th>
                      <th>Hours</th>
                      <th>Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginationProps.paginatedData.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="hist-date">{row.date}</div>
                          <div className="hist-day">{row.day}</div>
                        </td>
                        <td className={row.clockIn.includes('AM') && row.status === 'late' ? 'text-brown' : ''}>{row.clockIn}</td>
                        <td>{row.clockOut}</td>
                        <td>{row.hours}</td>
                        <td>
                          {row.method !== '—' && <MethodIcon method={row.method} />}
                          {row.method}
                        </td>
                        <td><span className={`hist-badge ${getBadgeClass(row.status)}`}>{row.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PaginatedView>
              <Pagination {...paginationProps} />
            </div>
          </div>
        </AnimatedTab>
      )}

      {/* MONTHLY TAB */}
      {activeTab === 'monthly' && (
        <AnimatedTab tabKey="monthly">
          <div className="attendance-tab-content">
            <div className="card att-monthly-card">
              <div className="monthly-header-row">
                <h3>May 2026</h3>
                <div className="monthly-legend">
                  <span><div className="legend-box lg-pr"></div> Present</span>
                  <span><div className="legend-box lg-ab"></div> Absent</span>
                  <span><div className="legend-box lg-la"></div> Late</span>
                  <span><div className="legend-box lg-we"></div> Weekend</span>
                  <span><div className="legend-box lg-le"></div> Leave</span>
                </div>
              </div>

              <div className="calendar-grid">
                <div className="cal-day-header">Sun</div>
                <div className="cal-day-header">Mon</div>
                <div className="cal-day-header">Tue</div>
                <div className="cal-day-header">Wed</div>
                <div className="cal-day-header">Thu</div>
                <div className="cal-day-header">Fri</div>
                <div className="cal-day-header">Sat</div>
                {calendarDays.map((cday, idx) => (
                  <div key={idx} className={`cal-cell ${getStatusClass(cday.status)}`}>
                    {cday.day && (
                      <>
                        <div className="cal-date-num">{cday.day}</div>
                        <div className="cal-status-text">{cday.status}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="monthly-summary-grid">
                <div className="mon-stat-card">
                  <span className="mon-stat-label">Present</span>
                  <span className="mon-stat-val text-green">20</span>
                </div>
                <div className="mon-stat-card">
                  <span className="mon-stat-label">Absent</span>
                  <span className="mon-stat-val text-red">2</span>
                </div>
                <div className="mon-stat-card">
                  <span className="mon-stat-label">Late</span>
                  <span className="mon-stat-val text-brown">1</span>
                </div>
                <div className="mon-stat-card">
                  <span className="mon-stat-label">Leave</span>
                  <span className="mon-stat-val text-blue">1</span>
                </div>
                <div className="mon-stat-card">
                  <span className="mon-stat-label">Avg hrs</span>
                  <span className="mon-stat-val">9h 05m</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedTab>
      )}
    </div>
  );
};

export default EmployeeAttendance;
