import React from 'react';

const StatsCards = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <div className="col-md-4" key={index}>
          <div className="stat-card p-4 rounded-4 position-relative overflow-hidden">
            <h2 className="stat-value fw-bold mb-1">{item.value}</h2>
            <p className="stat-label text-muted mb-0 small">{item.label}</p>
            {/* Decorative circle matching the image */}
            <div className="stat-circle"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default StatsCards;