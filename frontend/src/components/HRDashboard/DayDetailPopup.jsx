import React, { useState } from 'react';
import './DayDetailPopup.css';

const DayDetailPopup = ({ isOpen, onClose, selectedDate, holiday, attendance, employees, dayTypeOverride, onMarkAttendance, onUpdateDayType, initialStatusFilter = 'Absent' }) => {
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [searchTerm, setSearchTerm] = useState('');
  if (!isOpen) return null;

  const formatReadableDate = (dateStr) => {
    // dateStr expected dd-mm-yyyy
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [d, m, y] = parts;
    try {
      const dt = new Date(`${y}-${m}-${d}T00:00:00Z`);
      if (isNaN(dt.getTime())) return dateStr;
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return dt.toLocaleDateString('en-US', options);
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateStr;
    }
  };

  const getEmployeeColor = (initials) => {
    const emp = employees.find(e => e.initials === initials);
    return emp ? emp.color : 'gray';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return '#15803d';
      case 'Absent':
        return '#dc2626';
      case 'Half-day':
        return '#2563eb';
      case 'Late':
        return '#eab308';
      case 'On leave':
        return '#a855f7';
      default:
        return '#9ca3af';
    }
  };

  const getStatusCounts = () => {
    let present = 0, absent = 0, halfDay = 0, late = 0, onLeave = 0;
    if (attendance && Object.values(attendance).length > 0) {
      Object.values(attendance).forEach(status => {
        if (status === 'Present') present++;
        else if (status === 'Absent') absent++;
        else if (status === 'Half-day') halfDay++;
        else if (status === 'Late') late++;
        else if (status === 'On leave') onLeave++;
      });
    }
    return { present, absent, halfDay, late, onLeave };
  };

  const counts = getStatusCounts();
  const hasAttendance = attendance && Object.keys(attendance).length > 0;

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        {/* Header with date */}
        <div className="popup-header">
          <h2>Day Details</h2>
          <p className="popup-date">{selectedDate ? formatReadableDate(selectedDate) : 'No date selected'}</p>
        </div>

        {/* Holiday info if applicable */}
        {holiday && (
          <div className="holiday-info-box">
            <div className="holiday-icon">🎉</div>
            <div className="holiday-details-info">
              <h4>{holiday.name}</h4>
              <p>{holiday.type}</p>
            </div>
          </div>
        )}

        {/* Attendance summary */}
        {hasAttendance && (
          <div className="attendance-summary-popup">
            <h3>Attendance Summary</h3>
            <div className="summary-badges">
              {counts.present > 0 && (
                <div className="badge" style={{ background: '#dcfce7', borderLeft: '3px solid #15803d' }}>
                  <span className="count">{counts.present}</span>
                  <span className="label">Present</span>
                </div>
              )}
              {counts.absent > 0 && (
                <div className="badge" style={{ background: '#fee2e2', borderLeft: '3px solid #dc2626' }}>
                  <span className="count">{counts.absent}</span>
                  <span className="label">Absent</span>
                </div>
              )}
              {counts.halfDay > 0 && (
                <div className="badge" style={{ background: '#dbeafe', borderLeft: '3px solid #2563eb' }}>
                  <span className="count">{counts.halfDay}</span>
                  <span className="label">Half-day</span>
                </div>
              )}
              {counts.late > 0 && (
                <div className="badge" style={{ background: '#fef3c7', borderLeft: '3px solid #eab308' }}>
                  <span className="count">{counts.late}</span>
                  <span className="label">Late</span>
                </div>
              )}
              {counts.onLeave > 0 && (
                <div className="badge" style={{ background: '#f3e8ff', borderLeft: '3px solid #a855f7' }}>
                  <span className="count">{counts.onLeave}</span>
                  <span className="label">On leave</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Employee attendance list */}
        <div className="employee-status-list">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0 }}>Employee Status</h3>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', outline: 'none' }}
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="On leave">On leave</option>
              <option value="Half-day">Half-day</option>
              <option value="Late">Late</option>
              <option value="Not Present">Not Present</option>
            </select>
          </div>

          {hasAttendance && (
            <div className="search-bar-container" style={{ marginBottom: '12px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search employee name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                className="employee-search-input"
              />
              <span className="search-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          )}

          {!hasAttendance ? (
            <div className="no-data-box">
              <p className="no-data">No attendance recorded for this day.</p>
            </div>
          ) : (
            Object.entries(attendance)
              .filter(([initials, status]) => {
                if (statusFilter !== 'All') {
                  if (statusFilter === 'Not Present' && status === 'Present') return false;
                  if (statusFilter !== 'Not Present' && status !== statusFilter) return false;
                }
                const empName = employees.find(e => e.initials === initials)?.name || initials;
                return empName.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map(([initials, status]) => (
              <div key={initials} className="status-item">
                <div className={`status-avatar avatar-${getEmployeeColor(initials)}`}>
                  {initials}
                </div>
                <div className="status-item-info">
                  <p className="emp-name-detail">
                    {employees.find(e => e.initials === initials)?.name || initials}
                  </p>
                </div>
                <span className="status-badge" style={{ background: getStatusColor(status), color: 'white' }}>
                  {status}
                </span>
              </div>
            ))
          )}
          
          {hasAttendance && Object.entries(attendance).filter(([initials, status]) => {
                if (statusFilter !== 'All') {
                  if (statusFilter === 'Not Present' && status === 'Present') return false;
                  if (statusFilter !== 'Not Present' && status !== statusFilter) return false;
                }
                const empName = employees.find(e => e.initials === initials)?.name || initials;
                return empName.toLowerCase().includes(searchTerm.toLowerCase());
              }).length === 0 && (
            <div className="no-data-box" style={{ padding: '10px 0', textAlign: 'center' }}>
              <p className="no-data" style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>No employees match this filter.</p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="popup-footer">
          <div className="day-type-selector">
            <label>Set Day Type: </label>
            <select
              value={dayTypeOverride ? dayTypeOverride.type : (holiday ? holiday.type : 'Default')}
              onChange={(e) => {
                if (e.target.value === 'Default') {
                   // This resets to Working Day if no holiday, but we can just use Working Day
                   onUpdateDayType('Working Day', '');
                } else {
                   const type = e.target.value;
                   let name = type;
                   if (type === 'Festival') name = 'Festival';
                   onUpdateDayType(type, name);
                }
              }}
            >
              <option value="Default">Default</option>
              <option value="Working Day">Working Day</option>
              <option value="Weekoff">Weekoff</option>
              <option value="Festival">Festival</option>
              <option value="Company Event">Company Event</option>
              <option value="National Holiday">National Holiday</option>
            </select>
          </div>
          <button className="btn-edit-attendance" onClick={onMarkAttendance}>
            <span>✎</span> Edit attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailPopup;
