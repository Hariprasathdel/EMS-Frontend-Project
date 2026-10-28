import React, { useState } from 'react';
import RulesList from './RulesList';
import PolicyDocument from './PolicyDocument';
import './RulesPolicy.css';

const RulesPolicy = () => {
  // Mock Data
  const [policies, setPolicies] = useState([
    { id: 1, title: 'Employee Code of Conduct', category: 'HR', effectiveDate: '2023-01-01', status: 'Active', content: 'All employees are expected to maintain the highest standards of professional conduct...' },
    { id: 2, title: 'Remote Work Policy', category: 'HR', effectiveDate: '2023-06-15', status: 'Active', content: 'This policy outlines the guidelines and expectations for employees working remotely...' },
    { id: 3, title: 'IT Security Guidelines', category: 'IT', effectiveDate: '2023-03-10', status: 'Active', content: 'To ensure the security of company data, all employees must adhere to the following IT protocols...' },
    { id: 4, title: 'Expense Reimbursement', category: 'Finance', effectiveDate: '2022-11-01', status: 'Draft', content: 'Employees may be reimbursed for reasonable and necessary business expenses incurred...' },
  ]);

  const [showDocument, setShowDocument] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const handleViewPolicy = (policy) => {
    setSelectedPolicy(policy);
    setShowDocument(true);
  };

  return (
    <div className="rules-policy-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Rules & Policies</h2>
          <p className="text-muted mb-0">Manage and view company rules, regulations, and policy documents.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4">
          <i className="bi bi-plus-lg me-2"></i> Add Policy
        </button>
      </div>

      {/* Rules List */}
      <RulesList 
        policies={policies} 
        onView={handleViewPolicy} 
      />

      {/* Policy Document Viewer Modal */}
      <PolicyDocument 
        show={showDocument} 
        onHide={() => setShowDocument(false)} 
        policy={selectedPolicy} 
      />
    </div>
  );
};

export default RulesPolicy;