import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './DepartmentForm.css'; // <-- ADD THIS

const DepartmentForm = ({ show, onHide, department, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    head: '',
    employeeCount: '',
    status: 'Active',
  });

  useEffect(() => {
    setFormData(department ? {
      name: department.name ?? '',
      head: department.head ?? '',
      employeeCount: department.employeeCount ?? '',
      status: department.status ?? 'Active',
    } : { name: '', head: '', employeeCount: '', status: 'Active' });
  }, [department, show]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...formData, employeeCount: Number(formData.employeeCount) });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="department-modal"> {/* <-- ADDED CLASS */}
      <Modal.Header closeButton>
        <Modal.Title>
          {department ? 'Edit Department' : 'Add New Department'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <Form.Group>
                <Form.Label className="custom-form-label">Department Name</Form.Label> {/* <-- UPDATED CLASS */}
                <Form.Control 
                  className="custom-form-control" /* <-- UPDATED CLASS */
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Human Resources" 
                  required 
                />
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Head of Department</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="head" 
                  value={formData.head} 
                  onChange={handleChange} 
                  placeholder="e.g. John Doe" 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Number of Employees</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="number" 
                  name="employeeCount" 
                  value={formData.employeeCount} 
                  onChange={handleChange} 
                  min="0"
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group>
                <Form.Label className="custom-form-label">Status</Form.Label>
                <Form.Select 
                  className="custom-form-select" /* <-- UPDATED CLASS */
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

          <div className="modal-footer px-0 pb-0"> {/* <-- UPDATED WRAPPER */}
            <Button variant="light" className="btn-modal-cancel" onClick={onHide}> {/* <-- UPDATED CLASS */}
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-modal-submit"> {/* <-- UPDATED CLASS */}
              {department ? 'Update Department' : 'Save Department'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DepartmentForm;
