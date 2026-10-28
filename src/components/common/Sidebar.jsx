import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/department', label: 'Department', icon: 'bi-building' },
    { path: '/project', label: 'Project', icon: 'bi-kanban' },
    { path: '/employee', label: 'Employee', icon: 'bi-people' },
    { path: '/work-reports', label: 'Work Reports', icon: 'bi-file-earmark-bar-graph' },
    { path: '/attendance', label: 'Attendance', icon: 'bi-calendar-check' },
    { path: '/leave', label: 'Leave', icon: 'bi-envelope-paper' },
    { path: '/salary-slip', label: 'Salary Slip', icon: 'bi-cash-stack' },
    { path: '/rules-policy', label: 'Rules & Policy', icon: 'bi-book' },
    { path: '/system-settings', label: 'System Settings', icon: 'bi-gear' },
  ];

  return (
    <div className="sidebar-container d-flex flex-column">
      <div className="sidebar-header p-4">
        <h4 className="text-white fw-bold mb-0">Super Admin Dashboard</h4>
      </div>
      
      <nav className="sidebar-nav flex-grow-1">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
              >
                <i className={`bi ${item.icon} me-3`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-item mt-auto">
             <NavLink to="/logout" className="nav-link d-flex align-items-center text-danger">
                <i className="bi bi-box-arrow-right me-3"></i>
                Logout
             </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;