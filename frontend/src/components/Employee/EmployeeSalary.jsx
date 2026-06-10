import React from 'react';
import './EmployeeSalary.css';

const EmployeeSalary = ({ employeeData, dashboardData }) => {
  return (
    <div className="employee-salary-view">
      {/* Header */}
      <header className="employee-dashboard-header">
        <div className="header-title-box">
          <h1>My salary</h1>
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

      {/* Salary Controls */}
      <div className="salary-controls">
        <div className="salary-controls-left">
          <select className="month-select">
            <option>May 2026</option>
            <option>April 2026</option>
            <option>March 2026</option>
          </select>
          <span className="status-pill pending">pending</span>
        </div>
        <button className="download-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px'}}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* Salary Summary Cards */}
      <div className="salary-summary-grid">
        <div className="salary-stat-card">
          <p className="stat-label">Gross salary</p>
          <p className="stat-value">₹51,000</p>
        </div>
        <div className="salary-stat-card">
          <p className="stat-label">Total deductions</p>
          <p className="stat-value text-red">₹6,183</p>
        </div>
        <div className="salary-stat-card">
          <p className="stat-label">Net pay</p>
          <p className="stat-value text-green">₹44,817</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="salary-details-grid">
        {/* Earnings */}
        <div className="card">
          <h3>Earnings</h3>
          <div className="details-list">
            <div className="detail-row">
              <span className="detail-label">Basic salary</span>
              <span className="detail-amount">₹35,000</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">HRA (40%)</span>
              <span className="detail-amount">₹14,000</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Travel allowance</span>
              <span className="detail-amount">₹2,000</span>
            </div>
          </div>
          <div className="detail-total-row">
            <span className="total-label">Gross salary</span>
            <span className="total-amount text-green">₹51,000</span>
          </div>
        </div>

        {/* Deductions */}
        <div className="card">
          <h3>Deductions</h3>
          <div className="details-list">
            <div className="detail-row">
              <span className="detail-label">Absent day deduction</span>
              <div className="detail-amount-col">
                <span>-</span>
                <span className="strikethrough">₹0</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Leave deduction (₹1,000/day)</span>
              <div className="detail-amount-col text-red">
                <span>-</span>
                <span>₹1,000</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Late arrival deduction</span>
              <div className="detail-amount-col text-red">
                <span>-</span>
                <span>₹600</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">PF (12% of basic)</span>
              <div className="detail-amount-col text-red">
                <span>-</span>
                <span>₹4,200</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">ESI (0.75% of gross)</span>
              <div className="detail-amount-col text-red">
                <span>-</span>
                <span>₹383</span>
              </div>
            </div>
          </div>
          <div className="net-salary-box">
            <div className="net-salary-labels">
              <span className="net-label">Net salary</span>
              <span className="net-sublabel">After all deductions</span>
            </div>
            <span className="net-amount">₹44,817</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;
