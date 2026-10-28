import React from 'react';
import { Button } from 'react-bootstrap';
import './UserRoles.css';

const UserRoles = () => {
  const roles = [
    { id: 1, name: 'Super Admin', users: 1, permissions: 'Full Access', status: 'Active' },
    { id: 2, name: 'HR Manager', users: 3, permissions: 'Employee, Leave, Attendance', status: 'Active' },
    { id: 3, name: 'Project Manager', users: 5, permissions: 'Project, Reports, Employee (View)', status: 'Active' },
    { id: 4, name: 'Employee', users: 124, permissions: 'Attendance, Leave, Salary Slip (View)', status: 'Active' },
    { id: 5, name: 'Guest', users: 0, permissions: 'Read Only', status: 'Inactive' },
  ];

  return (
    <div className="user-roles-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0 text-dark">Role Management</h5>
          <Button variant="primary" className="btn-sm rounded-pill px-3">
            <i className="bi bi-plus-lg me-1"></i> Create Role
          </Button>
        </div>

        <div className="table-responsive">
          <table className="table roles-table">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Assigned Users</th>
                <th>Permissions Scope</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="role-icon-wrapper me-3">
                        <i className="bi bi-person-badge"></i>
                      </div>
                      <span className="fw-semibold">{role.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {role.users} User{role.users !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td>
                    <small className="text-muted">{role.permissions}</small>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${role.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn action-btn action-btn-edit me-2" title="Edit Role">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn action-btn action-btn-view" title="View Permissions">
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;