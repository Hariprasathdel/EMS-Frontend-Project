import React from 'react';
import './DepartmentList.css'; // <-- ADD THIS

const DepartmentList = ({ departments, onEdit, onDelete }) => {
  return (
    <div className="department-list-card"> {/* <-- UPDATED CLASS */}
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table dept-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Department</th>
                <th scope="col">Head of Department</th>
                <th scope="col">Employees</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr key={dept.id}>
                    <td className="fw-bold text-muted">#{dept.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="dept-icon-wrapper me-3"> {/* <-- UPDATED CLASS */}
                          <i className="bi bi-building"></i>
                        </div>
                        <span className="fw-semibold">{dept.name}</span>
                      </div>
                    </td>
                    <td>{dept.head}</td>
                    <td>
                      <span className="badge badge-employee-count"> {/* <-- UPDATED CLASS */}
                        {dept.employeeCount} Members
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${dept.status === 'Active' ? 'badge-status-active' : 'badge-status-inactive'}`}> {/* <-- UPDATED CLASSES */}
                        {dept.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-edit me-2" onClick={() => onEdit(dept)} title="Edit"> {/* <-- UPDATED CLASSES */}
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn action-btn action-btn-delete" onClick={() => onDelete(dept.id)} title="Delete"> {/* <-- UPDATED CLASSES */}
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state"> {/* <-- UPDATED CLASS */}
                      <i className="bi bi-folder-x d-block"></i>
                      <p className="mb-0">No departments found. Click "Add Department" to create one.</p>
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

export default DepartmentList;
