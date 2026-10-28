import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './PolicyDocument.css';

const PolicyDocument = ({ show, onHide, policy }) => {
  if (!policy) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="policy-document-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="d-flex align-items-center">
          <div className="policy-header-icon me-3">
            <i className="bi bi-file-earmark-text"></i>
          </div>
          <div>
            <Modal.Title className="fw-bold mb-1">{policy.title}</Modal.Title>
            <small className="text-muted">
              Category: {policy.category} • Effective: {policy.effectiveDate}
            </small>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body className="pt-4">
        <div className="policy-content">
          <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
            Document Content
          </h6>
          <p className="lead text-dark mb-4">
            {policy.content}
          </p>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-muted">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" className="btn-modal-action" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-primary" className="btn-modal-action" onClick={handlePrint}>
          <i className="bi bi-printer me-2"></i> Print Document
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PolicyDocument;