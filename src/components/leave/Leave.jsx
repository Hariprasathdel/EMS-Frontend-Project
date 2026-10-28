import React, { useState } from 'react';
import LeaveList from './LeaveList';
import LeaveRequestForm from './LeaveRequestForm';
import './Leave.css';

const Leave = () => {
  // Mock Data
  const [leaves, setLeaves] = useState([
    { id: 1, empCode: 'EMP001', name: 'Hardik Soni', type: 'Sick Leave', startDate: '2023-10-15', endDate: '2023-10-16', days: 2, reason: 'Flu and fever', status: 'Approved', appliedOn: '2023-10-14' },
    { id: 2, empCode: 'EMP002', name: 'John William', type: 'Casual Leave', startDate: '2023-10-20', endDate: '2023-10-20', days: 1, reason: 'Personal work', status: 'Pending', appliedOn: '2023-10-18' },
    { id: 3, empCode: 'EMP003', name: 'Sarah Smith', type: 'Annual Leave', startDate: '2023-11-01', endDate: '2023-11-05', days: 5, reason: 'Family vacation', status: 'Pending', appliedOn: '2023-10-25' },
    { id: 4, empCode: 'EMP004', name: 'Michael Brown', type: 'Sick Leave', startDate: '2023-09-10', endDate: '2023-09-11', days: 2, reason: 'Medical appointment', status: 'Rejected', appliedOn: '2023-09-09' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);

  const handleAddNew = () => {
    setCurrentLeave(null);
    setShowModal(true);
  };

  const handleEdit = (leave) => {
    setCurrentLeave(leave);
    setShowModal(true);
  };

  const handleSave = (leaveData) => {
    if (currentLeave) {
      setLeaves(leaves.map(l => 
        l.id === currentLeave.id ? { ...leaveData, id: currentLeave.id } : l
      ));
    } else {
      const newId = leaves.length > 0 ? Math.max(...leaves.map(l => l.id)) + 1 : 1;
      setLeaves([...leaves, { ...leaveData, id: newId, appliedOn: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaves(leaves.filter(l => l.id !== id));
    }
  };

  return (
    <div className="leave-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Leave Management</h2>
          <p className="text-muted mb-0">Track and manage employee leave requests.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleAddNew}>
          <i className="bi bi-plus-lg me-2"></i> Apply Leave
        </button>
      </div>

      {/* Leave List */}
      <LeaveList 
        leaves={leaves} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Add/Edit Form Modal */}
      <LeaveRequestForm 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        leave={currentLeave} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Leave;