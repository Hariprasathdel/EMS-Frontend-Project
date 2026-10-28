import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SalaryGenerator.css';

const SalaryGenerator = ({ show, onHide, slip, onSave }) => {
  const [formData, setFormData] = useState({
    empCode: '',
    name: '',
    month: 'October',
    year: 2023,
    basicPay: 0,
    allowances: 0,
    deductions: 0,
    status: 'Pending'
  });

  const [calculatedNetPay, setCalculatedNetPay] = useState(0);

  useEffect(() => {
    if (slip) {
      setFormData(slip);
      setCalculatedNetPay(slip.netPay);
    } else {
      setFormData({ empCode: '', name: '', month: 'October', year: 2023, basicPay: 0, allowances: 0, deductions: 0, status: 'Pending' });
      setCalculatedNetPay(0);
    }
  }, [slip, show]);

  // Real-time Net Pay calculation
  useEffect(() => {
    const basic = parseFloat(formData.basicPay) || 0;
    const allow = parseFloat(formData.allowances) || 0;
    const deduct = parseFloat(formData.deductions) || 0;
    setCalculatedNetPay(basic + allow - deduct);
  }, [formData.basicPay, formData.allowances, formData.deductions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="salary-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {slip ? 'Edit Salary Slip' : 'Generate Salary Slip'}
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
                <Form.Label className="custom-form-label">Month</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="month" 
                  value={formData.month} 
                  onChange={handleChange}
                  required
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Year</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Basic Pay</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="number" 
                  name="basicPay" 
                  value={formData.basicPay} 
                  onChange={handleChange} 
                  min="0"
                  required 
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Allowances</Form.Label>
                <Form.Control 
                  className="custom-form-control text-success"
                  type="number" 
                  name="allowances" 
                  value={formData.allowances} 
                  onChange={handleChange} 
                  min="0"
                />
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Deductions</Form.Label>
                <Form.Control 
                  className="custom-form-control text-danger"
                  type="number" 
                  name="deductions" 
                  value={formData.deductions} 
                  onChange={handleChange} 
                  min="0"
                />
              </Form.Group>
            </div>

            {/* Calculated Net Pay Display */}
            <div className="col-md-8">
              <Form.Group>
                <Form.Label className="custom-form-label">Status</Form.Label>
                <Form.Select 
                  className="custom-form-select"
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="custom-form-label">Net Pay (Calculated)</Form.Label>
                <div className="net-pay-display">
                  {formatCurrency(calculatedNetPay)}
                </div>
              </Form.Group>
            </div>
          </div>

          <div className="modal-footer px-0 pb-0 pt-3">
            <Button variant="light" className="btn-modal-cancel" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-modal-submit">
              {slip ? 'Update Slip' : 'Generate Slip'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SalaryGenerator;