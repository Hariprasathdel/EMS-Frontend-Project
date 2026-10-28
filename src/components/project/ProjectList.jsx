import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'Not Started': return 'status-not-started';
      default: return '';
    }
  };

  return (
    <div className="project-list-card">
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Manager</th>
                <th>Timeline</th>
                <th style={{ width: '20%' }}>Progress</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((proj) => (
                  <tr key={proj.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="project-icon-wrapper me-3">
                          <i className="bi bi-folder2-open"></i>
                        </div>
                        <div>
                          <span className="fw-semibold d-block">{proj.name}</span>
                          <small className="text-muted">ID: #{proj.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person-circle me-2 text-muted"></i>
                        {proj.manager}
                      </div>
                    </td>
                    <td>
                      <small className="text-muted d-block">Start: {proj.startDate}</small>
                      <small className="text-muted">End: {proj.endDate}</small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '6px' }}>
                          <div 
                            className="progress-bar custom-progress-bar" 
                            role="progressbar" 
                            style={{ width: `${proj.progress}%` }}
                          ></div>
                        </div>
                        <small className="fw-bold text-muted">{proj.progress}%</small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${getStatusClass(proj.status)}`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-edit me-2" onClick={() => onEdit(proj)} title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn action-btn action-btn-delete" onClick={() => onDelete(proj.id)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state">
                      <i className="bi bi-kanban d-block mb-2"></i>
                      <p className="mb-0">No projects found. Click "New Project" to create one.</p>
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

export default ProjectList;