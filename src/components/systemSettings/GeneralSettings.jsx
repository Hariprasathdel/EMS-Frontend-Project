import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './GeneralSettings.css';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Super Admin Corp',
    supportEmail: 'support@superadmin.com',
    timezone: 'UTC+05:30',
    dateFormat: 'YYYY-MM-DD',
    currency: 'USD',
    language: 'English'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="general-settings-card">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4 text-dark">General Configuration</h5>
        
        <Form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Logo Upload Section */}
            <div className="col-12">
              <div className="logo-upload-section p-4 rounded-3 bg-light border text-center">
                <div className="mb-3">
                  <div className="logo-placeholder mx-auto d-flex align-items-center justify-content-center">
                    <i className="bi bi-building fs-2 text-primary"></i>
                  </div>
                </div>
                <h6 className="fw-bold mb-2">Company Logo</h6>
                <p className="text-muted small mb-3">PNG, JPG up to 2MB. Recommended size: 200x200px.</p>
                <Button variant="outline-primary" className="btn-sm rounded-pill px-4">
                  <i className="bi bi-cloud-upload me-2"></i> Upload New Logo
                </Button>
              </div>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Company Name</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="companyName" 
                  value={settings.companyName} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Support Email</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="email" 
                  name="supportEmail" 
                  value={settings.supportEmail} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Timezone</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="timezone" 
                  value={settings.timezone} 
                  onChange={handleChange}
                >
                  <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
                  <option value="UTC+00:00">UTC+00:00 (GMT)</option>
                  <option value="UTC+05:30">UTC+05:30 (India Standard Time)</option>
                  <option value="UTC+08:00">UTC+08:00 (China Standard Time)</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Date Format</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="dateFormat" 
                  value={settings.dateFormat} 
                  onChange={handleChange}
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Currency</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="currency" 
                  value={settings.currency} 
                  onChange={handleChange}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4 pt-3 border-top">
            <Button variant="primary" type="submit" className="btn-save-settings rounded-pill px-4">
              <i className="bi bi-check-lg me-2"></i> Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GeneralSettings;