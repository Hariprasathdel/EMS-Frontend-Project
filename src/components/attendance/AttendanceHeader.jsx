import React from 'react';

const AttendanceHeader = () => {
  return (
    <div className="attendance-header mb-4">
      <h2 className="fw-bold mb-2 text-dark">My Attendance</h2>
      <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
        Date-wise attendance view with employee flow: 
        <span className="fw-semibold text-secondary"> Punch-In </span> → 
        <span className="fw-semibold text-secondary"> Break In (start break) </span> → 
        <span className="fw-semibold text-secondary"> Break Out (resume work) </span> → 
        <span className="fw-semibold text-secondary"> Punch-Out.</span>
      </p>
    </div>
  );
};

export default AttendanceHeader;