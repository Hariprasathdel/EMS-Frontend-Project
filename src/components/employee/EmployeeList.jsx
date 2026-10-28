import React from 'react';
import './EmployeeList.css';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="employee-list-card">
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Code</th>
                <th>Department</th>
                <th>Role</th>
                <th>Join Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="employee-avatar me-3">
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <span className="fw-semibold d-block">{emp.name}</span>
                          <small className="text-muted">{emp.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{emp.code}</span>
                    </td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                    <td>{emp.joinDate}</td>
                    <td>
                      <span className={`badge rounded-pill ${emp.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-edit me-2" onClick={() => onEdit(emp)} title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn action-btn action-btn-delete" onClick={() => onDelete(emp.id)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <i className="bi bi-people d-block mb-2"></i>
                      <p className="mb-0">No employees found. Click "Add Employee" to create one.</p>
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

export default EmployeeList;