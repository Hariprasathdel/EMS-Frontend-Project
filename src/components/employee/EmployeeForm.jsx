import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EmployeeForm.css';

const EmployeeForm = ({ show, onHide, employee, onSave }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: '',
    role: '',
    email: '',
    status: 'Active',
    joinDate: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({ code: '', name: '', department: '', role: '', email: '', status: 'Active', joinDate: '' });
    }
  }, [employee, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="employee-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Employee Code</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleChange} 
                  placeholder="e.g. EMP005" 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Full Name</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. John Doe" 
                  required 
                />
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Email Address</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. john@company.com" 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Department</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="department" 
                  value={formData.department} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Designation / Role</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  placeholder="e.g. Senior Developer" 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-3">
              <Form.Group>
                <Form.Label className="custom-form-label">Join Date</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="date" 
                  name="joinDate" 
                  value={formData.joinDate} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-3">
              <Form.Group>
                <Form.Label className="custom-form-label">Status</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="modal-footer px-0 pb-0 pt-3">
            <Button variant="light" className="btn-modal-cancel" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-modal-submit">
              {employee ? 'Update Employee' : 'Save Employee'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeForm;