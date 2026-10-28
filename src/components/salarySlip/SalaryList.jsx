import React from 'react';
import './SalaryList.css';

const SalaryList = ({ salarySlips, onEdit, onDelete }) => {
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="salary-list-card">
      <div className="card-body p-4">
        <div className="table-responsive">
          <table className="table salary-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Period</th>
                <th>Basic Pay</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salarySlips.length > 0 ? (
                salarySlips.map((slip) => (
                  <tr key={slip.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="salary-avatar me-3">
                          {slip.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="fw-semibold d-block">{slip.name}</span>
                          <small className="text-muted">{slip.empCode}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="fw-semibold">{slip.month}</span>
                      <small className="text-muted d-block">{slip.year}</small>
                    </td>
                    <td>{formatCurrency(slip.basicPay)}</td>
                    <td className="text-success">+{formatCurrency(slip.allowances)}</td>
                    <td className="text-danger">-{formatCurrency(slip.deductions)}</td>
                    <td className="fw-bold text-primary">{formatCurrency(slip.netPay)}</td>
                    <td>
                      <span className={`badge rounded-pill ${slip.status === 'Paid' ? 'status-paid' : 'status-pending'}`}>
                        {slip.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn action-btn action-btn-edit me-2" onClick={() => onEdit(slip)} title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn action-btn action-btn-delete" onClick={() => onDelete(slip.id)} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="empty-state">
                      <i className="bi bi-cash-stack d-block mb-2"></i>
                      <p className="mb-0">No salary slips generated yet.</p>
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

export default SalaryList;