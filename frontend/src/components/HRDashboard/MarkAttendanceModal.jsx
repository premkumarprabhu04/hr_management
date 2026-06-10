import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CustomDatePicker.css';
import './MarkAttendanceModal.css';

const MarkAttendanceModal = ({ isOpen, onClose, onSave, onDateChange, employees, selectedDate, currentAttendance }) => {
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [dateObj, setDateObj] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initial = employees.reduce((acc, emp) => {
      acc[emp.initials] = (currentAttendance && currentAttendance[emp.initials]) || 'Present';
      return acc;
    }, {});
    setAttendanceStatus(initial);

    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) setDateObj(new Date(parts[2], parts[1] - 1, parts[0]));
      else setDateObj(null);
    } else {
      setDateObj(null);
    }
  }, [isOpen, employees, currentAttendance, selectedDate]);

  const handleStatusChange = (empInitials, status) => {
    setAttendanceStatus({
      ...attendanceStatus,
      [empInitials]: status
    });
  };

  const handleSave = () => {
    let convDate = null;
    if (dateObj) {
      convDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;
      if (onDateChange) onDateChange(convDate);
    }
    onSave(attendanceStatus, convDate);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleDateChange = (date) => {
    setDateObj(date);
    if (!date) return;
    if (onDateChange) {
      const conv = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      onDateChange(conv);
    }
  };

  if (!isOpen) return null;

  const filteredEmployees = employees.filter((emp) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const status = (attendanceStatus[emp.initials] || 'Present').toLowerCase();
    return emp.name.toLowerCase().includes(term) || status.includes(term);
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content mark-attendance-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">Mark attendance</h2>

        <div className="attendance-date-selection">
          <label>Select date</label>
          <div className="date-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <DatePicker
              selected={dateObj}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="dd-mm-yyyy"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <span style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}>📅</span>
          </div>
        </div>

        <div className="modal-divider"></div>

        <div className="attendance-section">
          <h3>Employee attendance</h3>

          <div className="attendance-search-bar">
            <svg className="attendance-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="employees-attendance-list">
            {filteredEmployees.map((emp) => (
              <div key={emp.initials} className="attendance-row">
                <div className="emp-info">
                  <div className={`emp-avatar avatar-${emp.color}`}>{emp.initials}</div>
                  <span className="emp-name">{emp.name}</span>
                </div>

                <select
                  className="status-select"
                  value={attendanceStatus[emp.initials] || 'Present'}
                  onChange={(e) => handleStatusChange(emp.initials, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Half-day">Half-day</option>
                  <option value="Late">Late</option>
                  <option value="On leave">On leave</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save-attendance" onClick={handleSave}>
            <span className="save-icon">✓</span> Save attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendanceModal;
