import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './ReportGenerator.css';

const ReportGenerator = ({ filters, onFilterChange, onGenerate, isGenerating }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="report-generator-card">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4 d-flex align-items-center">
          <i className="bi bi-funnel me-2 text-primary"></i> 
          Report Filters
        </h5>
        
        <Form>
          <div className="mb-3">
            <Form.Label className="custom-form-label">Report Type</Form.Label>
            <Form.Select 
              name="reportType" 
              value={filters.reportType} 
              onChange={handleChange}
              className="custom-form-select"
            >
              <option value="attendance">Attendance Report</option>
              <option value="salary">Salary Slip Report</option>
              <option value="performance">Performance Report</option>
              <option value="leave">Leave History Report</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label className="custom-form-label">Department</Form.Label>
            <Form.Select 
              name="department" 
              value={filters.department} 
              onChange={handleChange}
              className="custom-form-select"
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
            </Form.Select>
          </div>

          <div className="mb-3">
            <Form.Label className="custom-form-label">Start Date</Form.Label>
            <Form.Control 
              type="date" 
              name="startDate" 
              value={filters.startDate} 
              onChange={handleChange}
              className="custom-form-control"
            />
          </div>

          <div className="mb-4">
            <Form.Label className="custom-form-label">End Date</Form.Label>
            <Form.Control 
              type="date" 
              name="endDate" 
              value={filters.endDate} 
              onChange={handleChange}
              className="custom-form-control"
            />
          </div>

          <Button 
            variant="primary" 
            className="btn-generate w-100" 
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generating...
              </>
            ) : (
              <>
                <i className="bi bi-file-earmark-bar-graph me-2"></i>
                Generate Report
              </>
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ReportGenerator;