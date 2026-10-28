import React from 'react';
import { Button } from 'react-bootstrap';
import './ReportViewer.css';

const ReportViewer = ({ reportData, filters, isGenerating }) => {
  
  const handleExport = () => {
    alert(`Exporting ${filters.reportType} report as PDF...`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isGenerating) {
    return (
      <div className="report-viewer-card d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="text-center text-muted">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Compiling your report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="report-viewer-card d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="text-center text-muted empty-state-viewer">
          <i className="bi bi-file-earmark-text display-4 mb-3 d-block opacity-50"></i>
          <h5 className="fw-bold">No Report Generated</h5>
          <p className="mb-0">Select your filters on the left and click "Generate Report" to view data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-viewer-card">
      <div className="card-body p-4">
        {/* Viewer Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h5 className="fw-bold mb-1 text-capitalize">{filters.reportType} Report</h5>
            <small className="text-muted">
              {filters.department} Dept • {filters.startDate} to {filters.endDate}
            </small>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" className="btn-action-sm" onClick={handlePrint}>
              <i className="bi bi-printer me-1"></i> Print
            </Button>
            <Button variant="primary" className="btn-action-sm" onClick={handleExport}>
              <i className="bi bi-file-earmark-pdf me-1"></i> Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="stat-box">
              <span className="stat-value text-primary">{reportData.length}</span>
              <span className="stat-label">Total Records</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-box">
              <span className="stat-value text-success">92%</span>
              <span className="stat-label">Avg. Attendance</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-box">
              <span className="stat-value text-warning">1.5</span>
              <span className="stat-label">Avg. Late Count</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="table report-table">
            <thead>
              <tr>
                <th>Emp Code</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Present Days</th>
                <th>Absent Days</th>
                <th>Late Count</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row) => (
                <tr key={row.id}>
                  <td><span className="badge bg-light text-dark border">{row.empCode}</span></td>
                  <td className="fw-semibold">{row.name}</td>
                  <td>{row.dept}</td>
                  <td><span className="text-success fw-bold">{row.presentDays}</span></td>
                  <td><span className="text-danger fw-bold">{row.absentDays}</span></td>
                  <td><span className="text-warning fw-bold">{row.lateCount}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;