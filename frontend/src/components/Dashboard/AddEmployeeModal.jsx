import React, { useState } from 'react';
import './AddEmployeeModal.css';

const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  if (!isOpen) return null;

  return (
    <div className="add-emp-backdrop">
      <div className="add-emp-modal">
        {/* Header */}
        <div className="add-emp-header">
          <div className="header-text">
            <h2><span className="icon">📄</span> Add New Employee</h2>
            <p>HR Portal · Employee Registration</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Progress Bar */}
        <div className="add-emp-progress">
          <div className={`progress-segment ${activeTab === 'Personal Info' ? 'active' : 'completed'}`}></div>
          <div className={`progress-segment ${activeTab === 'Job Details' ? 'active' : (activeTab === 'Documents & Bank' ? 'completed' : '')}`}></div>
          <div className={`progress-segment ${activeTab === 'Documents & Bank' ? 'active' : ''}`}></div>
        </div>

        {/* Upload Photo Section */}
        <div className="add-emp-upload-section">
          <div className="upload-circle">
            <span className="upload-icon">📷</span>
          </div>
          <div className="upload-info">
            <h3>Upload Photo</h3>
            <p>JPG, PNG · max 2MB · Passport size preferred</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="add-emp-tabs">
          <div className={`tab ${activeTab === 'Personal Info' ? 'active' : ''}`} onClick={() => setActiveTab('Personal Info')}>Personal Info</div>
          <div className={`tab ${activeTab === 'Job Details' ? 'active' : ''}`} onClick={() => setActiveTab('Job Details')}>Job Details</div>
          <div className={`tab ${activeTab === 'Documents & Bank' ? 'active' : ''}`} onClick={() => setActiveTab('Documents & Bank')}>Documents & Bank</div>
        </div>

        {/* Form Content */}
        <div className="add-emp-content">
          {activeTab === 'Personal Info' && (
            <>
              <div className="section-title">
                <span className="section-icon">📋</span> BASIC INFORMATION
              </div>

              <form className="add-emp-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name <span className="required">*</span></label>
                    <input type="text" placeholder="e.g. Ramesh" />
                  </div>
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" placeholder="e.g. Kumar" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth <span className="required">*</span></label>
                    <div className="input-with-icon">
                      <input type="text" placeholder="dd-mm-yyyy" />
                      <span className="input-icon">📅</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gender <span className="required">*</span></label>
                    <select defaultValue="">
                      <option value="" disabled>Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mobile Number <span className="required">*</span></label>
                    <input type="text" placeholder="+91 99999 99999" />
                  </div>
                  <div className="form-group">
                    <label>Personal Email</label>
                    <input type="email" placeholder="name@gmail.com" />
                  </div>
                </div>

                <div className="form-row full-width">
                  <div className="form-group">
                    <label>Address <span className="required">*</span></label>
                    <input type="text" placeholder="Door No., Street, Area" />
                  </div>
                </div>

                <div className="form-row three-cols">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" placeholder="Chennai" />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select defaultValue="">
                      <option value="" disabled>Select state</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="KL">Kerala</option>
                      <option value="KA">Karnataka</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input type="text" placeholder="600001" />
                  </div>
                </div>
              </form>
            </>
          )}

          {activeTab === 'Job Details' && (
            <>
              <div className="section-title">
                <span className="section-icon">📋</span> EMPLOYMENT DETAILS
              </div>

              <form className="add-emp-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID <span className="required">*</span></label>
                    <input type="text" placeholder="EMP-007" />
                  </div>
                  <div className="form-group">
                    <label>Date of Joining <span className="required">*</span></label>
                    <div className="input-with-icon">
                      <input type="text" placeholder="dd-mm-yyyy" />
                      <span className="input-icon">📅</span>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department <span className="required">*</span></label>
                    <select defaultValue="Software Dev">
                      <option value="Software Dev">Software Dev</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Designation <span className="required">*</span></label>
                    <input type="text" placeholder="e.g. Software Engineer" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Employment Type</label>
                    <select defaultValue="Full-time">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>CTC (Annual) ₹</label>
                    <input type="text" placeholder="e.g. 600000" />
                  </div>
                </div>
              </form>
            </>
          )}

          {activeTab === 'Documents & Bank' && (
            <div className="documents-container">
              {/* Identity Proof */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon blue">🪪</span> Identity Proof
                  </div>
                  <span className="mandatory-badge">Mandatory</span>
                </div>
                <div className="document-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Aadhaar Number <span className="required">*</span></label>
                      <input type="text" placeholder="XXXX XXXX XXXX" />
                    </div>
                    <div className="form-group">
                      <label>Aadhaar Card (Upload) <span className="required">*</span></label>
                      <div className="upload-box">
                        <span className="upload-box-icon">📄</span>
                        <div className="upload-box-text">
                          <h4>Upload Aadhaar</h4>
                          <p>Front & back · PDF / JPG</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>PAN Number <span className="required">*</span></label>
                      <input type="text" placeholder="ABCDE1234F" />
                    </div>
                    <div className="form-group">
                      <label>PAN Card (Upload) <span className="required">*</span></label>
                      <div className="upload-box">
                        <span className="upload-box-icon">📄</span>
                        <div className="upload-box-text">
                          <h4>Upload PAN Card</h4>
                          <p>Clear photo · PDF / JPG</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PF & ESI Details */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon green">📋</span> PF & ESI Details
                  </div>
                  <span className="mandatory-badge">Mandatory</span>
                </div>
                <div className="document-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>UAN Number (PF) <span className="required">*</span></label>
                      <input type="text" placeholder="100XXXXXXXXX" />
                    </div>
                    <div className="form-group">
                      <label>PF Registration Status</label>
                      <select defaultValue="Already Registered">
                        <option value="Already Registered">Already Registered</option>
                        <option value="Not Registered">Not Registered</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>ESIC Number</label>
                      <input type="text" placeholder="Enter ESIC number if applicable" />
                    </div>
                    <div className="form-group">
                      <label>ESIC Applicable?</label>
                      <select defaultValue="Yes">
                        <option value="Yes">Yes – Salary below ₹21,000</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon orange">🏦</span> Bank Account Details
                  </div>
                  <span className="mandatory-badge">Mandatory</span>
                </div>
                <div className="document-body">
                  <div className="form-row full-width">
                    <div className="form-group">
                      <label>Account Holder Name <span className="required">*</span></label>
                      <input type="text" placeholder="Name exactly as in passbook" />
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Bank Name <span className="required">*</span></label>
                      <select defaultValue="">
                        <option value="" disabled>Select bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Account Type <span className="required">*</span></label>
                      <select defaultValue="Savings">
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Account Number <span className="required">*</span></label>
                      <input type="text" placeholder="Bank account number" />
                    </div>
                    <div className="form-group">
                      <label>IFSC Code <span className="required">*</span></label>
                      <input type="text" placeholder="E.G. SBIN0001234" />
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Cancelled Cheque / Passbook (Upload) <span className="required">*</span></label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Cheque / Passbook</h4>
                          <p>PDF / JPG · for verification</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Proof */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon purple">🏠</span> Address Proof
                  </div>
                  <span className="mandatory-badge">Mandatory</span>
                </div>
                <div className="document-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Address Proof Type <span className="required">*</span></label>
                      <select defaultValue="">
                        <option value="" disabled>Select document</option>
                        <option value="Aadhaar">Aadhaar</option>
                        <option value="Passport">Passport</option>
                        <option value="Voter ID">Voter ID</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Upload Address Proof <span className="required">*</span></label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Document</h4>
                          <p>PDF / JPG · max 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Certificates */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon blue">🎓</span> Educational Certificates
                  </div>
                  <span className="mandatory-badge">Mandatory</span>
                </div>
                <div className="document-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Highest Qualification <span className="required">*</span></label>
                      <select defaultValue="">
                        <option value="" disabled>Select</option>
                        <option value="B.E/B.Tech">B.E / B.Tech</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="M.Sc">M.Sc</option>
                        <option value="MBA">MBA</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>University / Board</label>
                      <input type="text" placeholder="e.g. Anna University" />
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Upload Degree / Marksheet <span className="required">*</span></label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Certificate</h4>
                          <p>PDF / JPG · max 5MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Upload 10th / 12th Marksheet</label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Marksheet</h4>
                          <p>PDF / JPG · optional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Experience Documents */}
              <div className="document-section">
                <div className="document-header">
                  <div className="document-title">
                    <span className="doc-icon brown">💼</span> Previous Experience Documents
                  </div>
                  <span className="applicable-badge">If Applicable</span>
                </div>
                <div className="document-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Offer Letter (Previous Company)</label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Offer Letter</h4>
                          <p>PDF / JPG</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Relieving / Experience Letter</label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Relieving Letter</h4>
                          <p>PDF / JPG</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label>Last 3 Months Payslip</label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Payslips</h4>
                          <p>PDF / JPG · 3 months</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Form 16 / IT Returns</label>
                      <div className="upload-box">
                        <span className="upload-box-icon">⬆️</span>
                        <div className="upload-box-text">
                          <h4>Upload Form 16</h4>
                          <p>Previous year · PDF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="add-emp-footer">
          <div className="footer-left">
            <span className="required-text"><span className="required">*</span> Required fields</span>
          </div>
          <div className="footer-right">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-save">
              <span className="save-icon">💾</span> Save Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
