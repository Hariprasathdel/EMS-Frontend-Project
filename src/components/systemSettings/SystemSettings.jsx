import React, { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import UserRoles from './UserRoles';
import './SystemSettings.css';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="system-settings-container">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">System Settings</h2>
        <p className="text-muted mb-0">Configure global system parameters and manage user roles.</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="settings-tabs mb-4">
        <button 
          className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <i className="bi bi-gear me-2"></i> General Settings
        </button>
        <button 
          className={`settings-tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <i className="bi bi-shield-lock me-2"></i> User Roles & Permissions
        </button>
      </div>

      {/* Content Area */}
      <div className="settings-content">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'roles' && <UserRoles />}
      </div>
    </div>
  );
};

export default SystemSettings;