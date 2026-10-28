import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import Layout Components
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

// Import Page Components
import Login from '../pages/Login';
import DashboardPage from '../pages/DashboardPage';
import AttendancePage from '../pages/AttendancePage';
import NotFound from '../pages/NotFound';

// Import Module Pages (Create these wrappers if you haven't already, or import components directly)
// For this example, we assume you have page wrappers. If not, you can import the components directly.
import Department from '../components/department/Department';
import Project from '../components/project/Project';
import Employee from '../components/employee/Employee';
import WorkReports from '../components/workReports/WorkReports';
import Leave from '../components/leave/Leave';
import SalarySlip from '../components/salarySlip/SalarySlip';
import RulesPolicy from '../components/rulesPolicy/RulesPolicy';
import SystemSettings from '../components/systemSettings/SystemSettings';

import PrivateRoute from './PrivateRoute';

/**
 * DashboardLayout: 
 * Wraps all protected pages with the Sidebar and Header.
 * Uses Bootstrap flexbox for layout and the <Outlet /> to render child routes.
 */
const DashboardLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="main-content flex-grow-1 d-flex flex-column" style={{ marginLeft: '250px' }}>
        {/* Sticky Header */}
        <Header />
        
        {/* Page Content Area */}
        <div className="container-fluid p-4 flex-grow-1" style={{ minHeight: 'calc(100vh - 70px)' }}>
          {/* Outlet renders the specific page component based on the URL */}
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/login" element={<Login />} />

      {/* --- Protected Routes (Wrapped in PrivateRoute & DashboardLayout) --- */}
      <Route 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Default route redirects to dashboard */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Module Routes */}
        <Route path="/department" element={<Department />} />
        <Route path="/project" element={<Project />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/work-reports" element={<WorkReports />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/salary-slip" element={<SalarySlip />} />
        <Route path="/rules-policy" element={<RulesPolicy />} />
        <Route path="/system-settings" element={<SystemSettings />} />
      </Route>

      {/* --- Fallback Route (404) --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;