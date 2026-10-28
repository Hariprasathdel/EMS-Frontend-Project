import React from 'react';
import useAttendance from '../../hooks/useAttendance';
import AttendanceHeader from './AttendanceHeader';
import StatsCards from './StatsCards';
import AttendanceTable from './AttendanceTable';
import './Attendance.css';

const Attendance = () => {
  // 1. Call the custom hook
  const { attendanceData, stats, loading, error, punchIn, punchOut } = useAttendance();

  return (
    <div className="attendance-container">
      <AttendanceHeader />

      {/* Bootstrap Error Alert (Driven by Hook) */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Bootstrap Loading Spinner (Driven by Hook) */}
      {loading && !attendanceData.length ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Pass stats data to the cards component */}
          {stats && <StatsCards data={stats.cards} />}
          
          {/* Pass table data to the table component */}
          <AttendanceTable data={attendanceData} />
        </>
      )}

      {/* Example Action Buttons */}
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-success rounded-pill" onClick={punchIn} disabled={loading}>
          <i className="bi bi-box-arrow-in-right me-2"></i> Punch In
        </button>
        <button className="btn btn-danger rounded-pill" onClick={punchOut} disabled={loading}>
          <i className="bi bi-box-arrow-right me-2"></i> Punch Out
        </button>
      </div>
    </div>
  );
};

export default Attendance;