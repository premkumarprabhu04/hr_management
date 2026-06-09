import React, { useState } from 'react';
import './AddHolidayModal.css';

const AddHolidayModal = ({ isOpen, onClose, onSave }) => {
  const [holidayName, setHolidayName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Festival');
  const [tagColor, setTagColor] = useState('orange');

  const handleSave = () => {
    if (holidayName && date) {
      onSave({
        date,
        name: holidayName,
        type,
        color: tagColor
      });
      // Reset form
      setHolidayName('');
      setDate('');
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
