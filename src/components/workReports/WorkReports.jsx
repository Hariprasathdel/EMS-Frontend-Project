import React, { useState } from 'react';
import ReportGenerator from './ReportGenerator';
import ReportViewer from './ReportViewer';
import './WorkReports.css';

const WorkReports = () => {
  const [filters, setFilters] = useState({
    reportType: 'attendance',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    department: 'All'
  });

  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock Data Generation based on filters
      const mockData = [
        { id: 1, empCode: 'EMP001', name: 'Hardik Soni', dept: 'IT', presentDays: 22, absentDays: 2, lateCount: 1 },
        { id: 2, empCode: 'EMP002', name: 'John William', dept: 'HR', presentDays: 20, absentDays: 4, lateCount: 3 },
        { id: 3, empCode: 'EMP003', name: 'Sarah Smith', dept: 'Sales', presentDays: 24, absentDays: 0, lateCount: 0 },
        { id: 4, empCode: 'EMP004', name: 'Michael Brown', dept: 'Finance', presentDays: 21, absentDays: 3, lateCount: 2 },
      ];

      setReportData(mockData);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="work-reports-container">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Work Reports</h2>
        <p className="text-muted mb-0">Generate and view detailed reports for attendance, salary, and performance.</p>
      </div>

      <div className="row g-4">
        {/* Left Column: Report Generator */}
        <div className="col-lg-4">
          <ReportGenerator 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onGenerate={handleGenerateReport}
            isGenerating={isGenerating}
          />
        </div>

        {/* Right Column: Report Viewer */}
        <div className="col-lg-8">
          <ReportViewer 
            reportData={reportData} 
            filters={filters} 
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkReports;