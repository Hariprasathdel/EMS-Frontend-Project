import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ProjectForm.css';

const ProjectForm = ({ show, onHide, project, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    startDate: '',
    endDate: '',
    status: 'Not Started',
    progress: 0
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({ name: '', manager: '', startDate: '', endDate: '', status: 'Not Started', progress: 0 });
    }
  }, [project, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="project-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {project ? 'Edit Project' : 'Create New Project'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <Form.Group>
                <Form.Label className="custom-form-label">Project Name</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Website Redesign" 
                  required 
                />
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="custom-form-label">Project Manager</Form.Label>
                <Form.Control 
                  className="custom-form-control"
                  type="text" 
                  name="manager" 
                  value={formData.manager} 
                  onChange={handleChange} 
                  placeholder="e.g. John Doe" 
                  required 
                />
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
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-md-12">
              <Form.Group>
                <Form.Label className="custom-form-label d-flex justify-content-between">
                  <span>Progress</span>
                  <span className="text-primary fw-bold">{formData.progress}%</span>
                </Form.Label>
                <Form.Range 
                  name="progress" 
                  min="0" 
                  max="100" 
                  value={formData.progress} 
                  onChange={handleChange}
                  className="custom-range"
                />
              </Form.Group>
            </div>
          </div>

          <div className="modal-footer px-0 pb-0 pt-3">
            <Button variant="light" className="btn-modal-cancel" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-modal-submit">
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectForm;