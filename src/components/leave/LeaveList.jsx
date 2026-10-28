import React from 'react';
import './LeaveList.css';

const LeaveList = ({ leaves, onEdit, onDelete }) => {
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="leave-list-card">
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table leave-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="leave-avatar me-3">
                          {leave.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="fw-semibold d-block">{leave.name}</span>
                          <small className="text-muted">{leave.empCode}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{leave.type}</span>
                    </td>
                    <td>
                      <small className="text-muted d-block">From: {leave.startDate}</small>
                      <small className="text-muted">To: {leave.endDate}</small>
                    </td>
                    <td className="fw-bold">{leave.days}</td>
                    <td>
                      <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }} title={leave.reason}>
                        {leave.reason}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${getStatusClass(leave.status)}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-edit me-2" onClick={() => onEdit(leave)} title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn action-btn action-btn-delete" onClick={() => onDelete(leave.id)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <i className="bi bi-calendar-x d-block mb-2"></i>
                      <p className="mb-0">No leave requests found. Click "Apply Leave" to create one.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;