import React, { useState } from 'react';
import './Calendar.css';
import AddHolidayModal from './AddHolidayModal';
import MarkAttendanceModal from './MarkAttendanceModal';
import DayDetailPopup from './DayDetailPopup';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 25)); // May 25, 2026
  const [isAddHolidayModalOpen, setIsAddHolidayModalOpen] = useState(false);
  const [isMarkAttendanceModalOpen, setIsMarkAttendanceModalOpen] = useState(false);
  const [isDayDetailPopupOpen, setIsDayDetailPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState('Absent');

  const [holidays, setHolidays] = useState([
    { date: '15-05-2026', name: 'Vaisakhi', type: 'Festival', color: 'orange' },
    { date: '25-06-2026', name: 'Eid', type: 'Festival', color: 'green' },
    { date: '08-11-2026', name: 'Diwali', type: 'Festival', color: 'purple' }
  ]);

  // Track explicit day type overrides (e.g. 'Working Day', 'Weekoff', 'Festival')
  const [dayTypes, setDayTypes] = useState({});

  // Mock data for attendance
  const [attendance, setAttendance] = useState({
    '25-05-2026': {
      'RK': 'Present',
      'PS': 'Present',
      'AJ': 'Absent',
      'MV': 'Present',
      'SB': 'Present',
      'LR': 'On leave'
    }
  });

  const employees = [
    { initials: 'RK', name: 'Ramesh Kumar', status: 'active', color: 'green' },
    { initials: 'PS', name: 'Priya Shankar', status: 'active', color: 'orange' },
    { initials: 'AJ', name: 'Arjun John', status: 'active', color: 'red' },
    { initials: 'MV', name: 'Meena Velu', status: 'active', color: 'green' },
    { initials: 'SB', name: 'Suresh Babu', status: 'active', color: 'green' },
    { initials: 'LR', name: 'Lakshmi Rajan', status: 'active', color: 'blue' }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (day) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${String(day).padStart(2, '0')}-${month}-${year}`;
  };

  const getMonthName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return months[currentDate.getMonth()];
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddHoliday = (holidayData) => {
    setHolidays([...holidays, holidayData]);
    setIsAddHolidayModalOpen(false);
  };

  const handleDeleteHoliday = (index) => {
    setHolidays(holidays.filter((_, i) => i !== index));
  };

  const handleMarkAttendance = (attendanceData, dateKey) => {
    const key = dateKey || selectedDate;
    if (!key) {
      setIsMarkAttendanceModalOpen(false);
      return;
    }
    setAttendance({
      ...attendance,
      [key]: attendanceData
    });
    setIsMarkAttendanceModalOpen(false);
  };

  const handleDayClick = (day, initialFilter = 'Absent') => {
    const dateStr = formatDate(day);
    setSelectedDate(dateStr);
    setActiveStatusFilter(initialFilter);
    setIsDayDetailPopupOpen(true);
  };

  const getFixedIndianHoliday = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dateMonth = `${day}-${month}`;
    
    const fixedHolidays = {
      '01-01': { name: 'New Year', type: 'Festival', color: 'blue' },
      '14-01': { name: 'Makar Sankranti / Pongal', type: 'Festival', color: 'orange' },
      '15-01': { name: 'Mattu Pongal', type: 'Festival', color: 'orange' },
      '26-01': { name: 'Republic Day', type: 'National Holiday', color: 'orange' },
      '01-05': { name: 'Labour Day', type: 'National Holiday', color: 'purple' },
      '15-08': { name: 'Independence Day', type: 'National Holiday', color: 'orange' },
      '02-10': { name: 'Gandhi Jayanti', type: 'National Holiday', color: 'green' },
      '25-12': { name: 'Christmas', type: 'Festival', color: 'red' }
    };
    
    return fixedHolidays[dateMonth];
  };

  const getHolidayForDate = (day) => {
    const dateStr = formatDate(day);
    const userHoliday = holidays.find(h => h.date === dateStr);
    if (userHoliday) return userHoliday;

    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const fixed = getFixedIndianHoliday(dateObj);
    if (fixed) {
      return { date: dateStr, ...fixed };
    }
    
    return null;
  };

  const getDayTypeOverride = (day) => {
    const dateStr = formatDate(day);
    return dayTypes[dateStr];
  };

  const handleUpdateDayType = (dateStr, type, name = '') => {
    setDayTypes(prev => ({
      ...prev,
      [dateStr]: { type, name }
    }));
  };

  const getAttendanceForDate = (day) => {
    const dateStr = formatDate(day);
    return attendance[dateStr];
  };

  const calculateAttendanceStats = () => {
    let present = 0, absent = 0, halfDay = 0, onLeave = 0, late = 0;

    Object.values(attendance).forEach(dayAttendance => {
      Object.values(dayAttendance).forEach(status => {
        if (status === 'Present') present++;
        else if (status === 'Absent') absent++;
        else if (status === 'Half-day') halfDay++;
        else if (status === 'On leave') onLeave++;
        else if (status === 'Late') late++;
      });
    });

    return { present, absent, halfDay, onLeave, late };
  };

  const attendanceStats = calculateAttendanceStats();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get working days, holidays, etc.
  let workingDays = 0, holidays_count = 0, weekends = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = dateObj.getDay();
    const dateStr = formatDate(day);
    const override = dayTypes[dateStr];
    
    let isWeekendDefault = dayOfWeek === 0 || (dayOfWeek === 6 && Math.ceil(day / 7) % 2 !== 0);
    let isHolidayDefault = getHolidayForDate(day);

    if (override) {
      if (override.type === 'Weekoff') weekends++;
      else if (override.type !== 'Working Day') holidays_count++;
      else workingDays++;
    } else if (isHolidayDefault) {
      holidays_count++;
    } else if (isWeekendDefault) {
      weekends++;
    } else {
      workingDays++;
    }
  }

  return (
    <div className="calendar-container">
      <div className="calendar-main">
        {/* Header with navigation */}
        <div className="calendar-header">
          <div className="calendar-month-nav">
            <button className="nav-arrow" onClick={handlePrevMonth}>◀</button>
            <h2>{getMonthName()} {currentDate.getFullYear()}</h2>
            <button className="nav-arrow" onClick={handleNextMonth}>▶</button>
          </div>

          <div className="calendar-actions">
            <button className="btn-add-holiday" onClick={() => setIsAddHolidayModalOpen(true)}>
              Add holiday
            </button>
            <button className="btn-mark-attendance" onClick={() => setIsMarkAttendanceModalOpen(true)}>
              Mark attendance
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="calendar-body">
          <div className="weekdays-header">
            <div className="weekday">Sun</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thu</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              const holiday = day ? getHolidayForDate(day) : null;
              const dayAttendance = day ? getAttendanceForDate(day) : null;
              const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dayOfWeek = dateObj.getDay();
              const dateStr = day ? formatDate(day) : null;
              const override = dateStr ? dayTypes[dateStr] : null;

              let isWeekend = false;
              let currentType = 'Working Day';
              let displayHoliday = holiday;
              
              if (day) {
                const isWeekendDefault = dayOfWeek === 0 || (dayOfWeek === 6 && Math.ceil(day / 7) % 2 !== 0);
                if (override) {
                  currentType = override.type;
                  isWeekend = currentType === 'Weekoff';
                  if (currentType !== 'Working Day' && currentType !== 'Weekoff') {
                    displayHoliday = { type: currentType, name: override.name, color: 'blue' };
                  } else {
                    displayHoliday = null;
                  }
                } else {
                  isWeekend = isWeekendDefault;
                  currentType = isWeekend ? 'Weekoff' : (holiday ? holiday.type : 'Working Day');
                }
              }

              return (
                <div
                  key={index}
                  className={`calendar-day ${!day ? 'empty' : ''} ${day && dayOfWeek === 0 ? 'sunday' : ''}`}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <div className="day-number">{day}</div>

                      {/* Holiday badge */}
                      {displayHoliday && (
                        <div className={`holiday-badge color-${displayHoliday.color}`}>
                          {displayHoliday.type === 'Festival' && '🎉'}
                          {displayHoliday.type === 'National Holiday' && '🇮🇳'}
                          {displayHoliday.type === 'Company Event' && '🏢'}
                          {displayHoliday.type === 'Weekoff' && '🏖️'}
                        </div>
                      )}

                      {/* Attendance dots and count */}
                      {dayAttendance && (
                        <div className="attendance-info">
                          <div className="attendance-dots">
                            {['Present', 'Absent', 'Half-day', 'Late', 'On leave']
                              .filter(status => Object.values(dayAttendance).includes(status))
                              .map(status => {
                                let dotColor = 'gray';
                                let text = 'OL';
                                if (status === 'Present') { dotColor = 'green'; text = 'P'; }
                                else if (status === 'Absent') { dotColor = 'red'; text = 'A'; }
                                else if (status === 'Half-day') { dotColor = 'blue'; text = 'H'; }
                                else if (status === 'Late') { dotColor = 'yellow'; text = 'L'; }
                                else if (status === 'On leave') { dotColor = 'purple'; text = 'OL'; }

                                return (
                                  <span
                                    key={status}
                                    className={`attendance-dot dot-${dotColor}`}
                                    title={`${status}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDayClick(day, status);
                                    }}
                                  >
                                    {text}
                                  </span>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right sidebar summary */}
      <aside className="calendar-sidebar">
        {/* Month summary */}
        <div className="summary-card">
          <h3>June summary</h3>
          <div className="summary-stats">
            <div className="stat-row">
              <span className="stat-label">Working days</span>
              <span className="stat-value">{workingDays}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Holidays</span>
              <span className="stat-value">{holidays_count}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Weekends</span>
              <span className="stat-value">{weekends}</span>
            </div>
          </div>
        </div>

        {/* Employees roster */}
        <div className="employees-card">
          <h3>Employees</h3>
          <div className="employees-list">
            {employees.map((emp, index) => (
              <div key={index} className="employee-item">
                <div className={`emp-avatar avatar-${emp.color}`}>{emp.initials}</div>
                <div className="emp-info">
                  <p className="emp-name">{emp.name}</p>
                </div>
                <span className={`status-indicator status-${emp.status}`}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Holidays & events */}
        <div className="holidays-card">
          <div className="holidays-header">
            <h3>Holidays & events</h3>
            <button className="btn-add-small" onClick={() => setIsAddHolidayModalOpen(true)}>+ Add</button>
          </div>
          <div className="holidays-list">
            {holidays.length === 0 ? (
              <p className="empty-text">No holidays added</p>
            ) : (
              holidays.map((holiday, index) => (
                <div key={index} className="holiday-item">
                  <div className="holiday-info">
                    <span className={`holiday-color-dot color-${holiday.color}`}></span>
                    <div className="holiday-details">
                      <p className="holiday-name">{holiday.name}</p>
                      <p className="holiday-date">{holiday.date}</p>
                    </div>
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteHoliday(index)}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Modals and Popups */}
      <AddHolidayModal
        isOpen={isAddHolidayModalOpen}
        onClose={() => setIsAddHolidayModalOpen(false)}
        onSave={handleAddHoliday}
      />

      <MarkAttendanceModal
        isOpen={isMarkAttendanceModalOpen}
        onClose={() => setIsMarkAttendanceModalOpen(false)}
        onSave={handleMarkAttendance}
        onDateChange={(convDate) => setSelectedDate(convDate)}
        employees={employees}
        selectedDate={selectedDate}
        currentAttendance={selectedDate ? attendance[selectedDate] : {}}
      />

      <DayDetailPopup
        key={`${selectedDate}-${activeStatusFilter}`}
        isOpen={isDayDetailPopupOpen}
        onClose={() => setIsDayDetailPopupOpen(false)}
        selectedDate={selectedDate}
        holiday={selectedDate ? holidays.find(h => h.date === selectedDate) : null}
        attendance={selectedDate ? attendance[selectedDate] : {}}
        employees={employees}
        dayTypeOverride={selectedDate ? dayTypes[selectedDate] : null}
        onMarkAttendance={() => {
          setIsDayDetailPopupOpen(false);
          setIsMarkAttendanceModalOpen(true);
        }}
        onUpdateDayType={(type, name) => handleUpdateDayType(selectedDate, type, name)}
        initialStatusFilter={activeStatusFilter}
      />
    </div>
  );
};

export default Calendar;
