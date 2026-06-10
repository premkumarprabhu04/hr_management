import React from 'react';
import './EmployeeProfile.css';

const EmployeeProfile = ({ employeeData, dashboardData }) => {
  const profileDetails = {
    role: 'Senior Developer',
    department: 'Software Development',
    status: 'Active',
    dateJoined: '01 Jan 2024',
    shiftTiming: '9:00 AM – 6:00 PM',
    fingerprint: 'Registered'
  };

  const contactInfo = {
    phone: '+91 98765 43210',
    email: 'ramesh@company.com',
    address: '12 Anna Nagar, Chennai – 600 040'
  };

  const salaryStructure = [
    { label: 'Basic salary', amount: '₹35,000' },
    { label: 'HRA (40%)', amount: '₹14,000' },
    { label: 'Travel allowance', amount: '₹2,000' },
    { label: 'Gross salary', amount: '₹51,000', isTotal: true }
  ];

  return (
    <div className="employee-profile-view">
      {/* Header */}
      <header className="employee-dashboard-header">
        <div className="header-title-box">
          <h1>My profile</h1>
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

      <div className="profile-grid">
        {/* Left Column: Main Profile Card */}
        <div className="card profile-main-card">
          <div className="profile-header-section">
            <div className="profile-avatar-large">{employeeData.initials}</div>
            <h2>{employeeData.name}</h2>
            <p className="profile-role">{profileDetails.role}</p>
            <p className="profile-department">{profileDetails.department}</p>
            <span className="profile-status-badge">{profileDetails.status}</span>
          </div>

          <div className="profile-details-list">
            <div className="profile-detail-row">
              <span className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M7 8h10M7 12h10M7 16h6" />
                </svg>
              </span>
              <span className="detail-label">Employee ID</span>
              <span className="detail-value">{employeeData.empId}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span className="detail-label">Date joined</span>
              <span className="detail-value">{profileDetails.dateJoined}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="detail-label">Shift timing</span>
              <span className="detail-value">{profileDetails.shiftTiming}</span>
            </div>
            <div className="profile-detail-row">
              <span className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                  <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
                  <path d="M5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5" />
                  <path d="M9 12c0-1.65 1.35-3 3-3s3 1.35 3 3" />
                  <path d="M12 15v4" />
                </svg>
              </span>
              <span className="detail-label">Fingerprint</span>
              <span className="detail-value">{profileDetails.fingerprint}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Salary */}
        <div className="profile-right-column">
          {/* Contact Information */}
          <div className="card">
            <h3>Contact information</h3>
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="contact-info">
                  <p className="contact-label">Phone</p>
                  <p className="contact-value">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div className="contact-info">
                  <p className="contact-label">Email</p>
                  <p className="contact-value">{contactInfo.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="contact-info">
                  <p className="contact-label">Address</p>
                  <p className="contact-value">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Structure */}
          <div className="card">
            <h3>Salary structure</h3>
            <div className="salary-structure-list">
              {salaryStructure.map((item, idx) => (
                <div key={idx} className={`salary-structure-row ${item.isTotal ? 'total-row' : ''}`}>
                  <span className="salary-label">{item.label}</span>
                  <span className={`salary-amount ${item.isTotal ? 'text-green' : ''}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="change-password-btn">
            <span className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width: '16px', height: '16px', marginRight: '6px', verticalAlign: '-3px'}}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span> Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
