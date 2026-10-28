import React from 'react';
import './RulesList.css';

const RulesList = ({ policies, onView }) => {
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'HR': return 'cat-hr';
      case 'IT': return 'cat-it';
      case 'Finance': return 'cat-finance';
      default: return 'cat-default';
    }
  };

  return (
    <div className="rules-list-card">
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table rules-table">
            <thead>
              <tr>
                <th>Policy Title</th>
                <th>Category</th>
                <th>Effective Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.length > 0 ? (
                policies.map((policy) => (
                  <tr key={policy.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="policy-icon-wrapper me-3">
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <span className="fw-semibold">{policy.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge category-badge ${getCategoryColor(policy.category)}`}>
                        {policy.category}
                      </span>
                    </td>
                    <td>{policy.effectiveDate}</td>
                    <td>
                      <span className={`badge rounded-pill ${policy.status === 'Active' ? 'status-active' : 'status-draft'}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-view" onClick={() => onView(policy)} title="View Document">
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="empty-state">
                      <i className="bi bi-journal-text d-block mb-2"></i>
                      <p className="mb-0">No policies found. Click "Add Policy" to create one.</p>
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

export default RulesList;