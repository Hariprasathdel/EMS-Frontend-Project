import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './LeaveRequestForm.css';

const LeaveRequestForm = ({ show, onHide, leave, onSave }) => {
  const [formData, setFormData] = useState({
    empCode: '',
    name: '',
    type: 'Casual Leave',
    startDate: '',
    endDate: '',
    days: 1,
    reason: '',
    status: 'Pending'
  });

  useEffect(() => {
    if (leave) {
      setFormData(leave);
    } else {
      setFormData({ empCode: '', name: '', type: 'Casual Leave', startDate: '', endDate: '', days: 1, reason: '', status: 'Pending' });
    }
  }, [leave, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'days' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="leave-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {leave ? 'Edit Leave Request' : 'Apply for Leave'}
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
                  name="empCode" 
                  value={formData.empCode} 
                  onChange={handleChange} 
                  placeholder="e.g. EMP005" 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Employee Name</Form.Label>
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
                <Form.Label className="custom-form-label">Leave Type</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  required
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Status</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Start Date</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">End Date</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Total Days</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="number" 
                  name="days" 
                  value={formData.days} 
                  onChange={handleChange} 
                  min="1"
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group>
                <Form.Label className="custom-form-label">Reason for Leave</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  as="textarea" 
                  rows={3}
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleChange} 
                  placeholder="Please provide a brief reason..." 
                  required 
                />
              </Form.Group>
            </div>
          </div>

          <div className="modal-footer px-0 pb-0 pt-3">
            <Button variant="light" className="btn-modal-cancel" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-modal-submit">
              {leave ? 'Update Request' : 'Submit Request'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LeaveRequestForm;