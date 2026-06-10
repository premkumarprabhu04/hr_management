import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../CustomDatePicker.css';
import './AddHolidayModal.css';

const AddHolidayModal = ({ isOpen, onClose, onSave }) => {
  const [holidayName, setHolidayName] = useState('');
  const [date, setDate] = useState(null);
  const [type, setType] = useState('Festival');
  const [tagColor, setTagColor] = useState('orange');

  const handleSave = () => {
    if (holidayName && date) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      onSave({
        date: formattedDate,
        name: holidayName,
        type,
        color: tagColor
      });
      // Reset form
      setHolidayName('');
      setDate(null);
      setType('Festival');
      setTagColor('orange');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content add-holiday-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">Add holiday / event</h2>

        <div className="modal-form">
          {/* Holiday Name */}
          <div className="form-group">
            <label>Holiday name</label>
            <input
              type="text"
              placeholder="e.g. Diwali, Pongal, Republic Day"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Date</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
                className="form-input"
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #d0d0d0', fontSize: '17px' }}
              />
              <span style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }}>📅</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save holiday
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHolidayModal;
