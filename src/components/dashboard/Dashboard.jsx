import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Data for the top summary cards
  const summaryCards = [
    { id: 1, title: 'Total Employees', value: '124', icon: 'bi-people', color: 'text-primary' },
    { id: 2, title: 'Present Today', value: '98', icon: 'bi-person-check', color: 'text-success' },
    { id: 3, title: 'On Leave', value: '12', icon: 'bi-calendar-x', color: 'text-warning' },
    { id: 4, title: 'Late Arrivals', value: '5', icon: 'bi-clock-history', color: 'text-danger' },
  ];

  // Mock data for recent activity table
  const recentAttendance = [
    { id: 1, name: 'Hardik Soni', code: 'EMP001', checkIn: '9:30 AM', status: 'On Time' },
    { id: 2, name: 'John William', code: 'EMP002', checkIn: '9:45 AM', status: 'Late' },
    { id: 3, name: 'Sarah Smith', code: 'EMP003', checkIn: '9:15 AM', status: 'On Time' },
    { id: 4, name: 'Michael Brown', code: 'EMP004', checkIn: '-', status: 'Absent' },
  ];

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard Overview</h2>
          <p className="text-muted mb-0">Welcome back, Super Admin. Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-download me-2"></i> Export Report
        </button>
      </div>

      {/* Summary Cards Row */}
      <div className="row g-4 mb-4">
        {summaryCards.map((card) => (
          <div className="col-xl-3 col-md-6" key={card.id}>
            <div className="stat-card p-4 h-100 rounded-4 position-relative overflow-hidden">
              <div className="stat-icon mb-3">
                <i className={`bi ${card.icon} fs-3 ${card.color}`}></i>
              </div>
              <h3 className="fw-bold mb-1">{card.value}</h3>
              <p className="text-muted small mb-0">{card.title}</p>
              {/* Decorative background circle */}
              <div className="stat-circle"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity Row */}
      <div className="row g-4">
        {/* Chart Placeholder */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Attendance Overview</h5>
                <select className="form-select form-select-sm w-auto border-0 bg-light">
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              {/* Placeholder for a Chart Library like Chart.js or Recharts */}
              <div className="chart-placeholder d-flex align-items-center justify-content-center bg-light rounded-3" style={{ height: '300px' }}>
                <p className="text-muted mb-0"><i className="bi bi-bar-chart-line fs-1 d-block text-center mb-2"></i>Chart Component Goes Here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity / Quick Stats */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Department Stats</h5>
              <div className="d-flex flex-column gap-3">
                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>IT Department</span>
                    <span className="fw-bold">85%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-primary" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>HR Department</span>
                    <span className="fw-bold">92%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Sales Department</span>
                    <span className="fw-bold">78%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Marketing</span>
                    <span className="fw-bold">88%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-info" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance Table */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Recent Check-Ins</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 rounded-start">Employee</th>
                      <th className="border-0">Code</th>
                      <th className="border-0">Check-In Time</th>
                      <th className="border-0 rounded-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttendance.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '35px', height: '35px', fontSize: '0.8rem'}}>
                              {emp.name.charAt(0)}
                            </div>
                            {emp.name}
                          </div>
                        </td>
                        <td>{emp.code}</td>
                        <td>{emp.checkIn}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            emp.status === 'On Time' ? 'bg-success-subtle text-success' :
                            emp.status === 'Late' ? 'bg-warning-subtle text-warning' :
                            'bg-danger-subtle text-danger'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;