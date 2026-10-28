import React from 'react';

const StatsSummary = ({ data }) => {
  return (
    <div className="col-12">
      <div className="stats-summary-container d-flex justify-content-between align-items-center rounded-3 p-3 bg-white shadow-sm">
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`stat-summary-item text-center flex-grow-1 ${index !== data.length - 1 ? 'border-end' : ''}`}
          >
            <h4 className="fw-bold mb-1 text-dark">{item.value}</h4>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>{item.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSummary;