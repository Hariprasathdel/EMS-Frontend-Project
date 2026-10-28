import React, { useState } from 'react';
import DepartmentList from './DepartmentList';
import DepartmentForm from './DepartmentForm';
import './Department.css';

const Department = () => {
  // Initial mock data
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Human Resources', head: 'Sarah Jenkins', employeeCount: 12, status: 'Active' },
    { id: 2, name: 'Information Technology', head: 'David Chen', employeeCount: 45, status: 'Active' },
    { id: 3, name: 'Sales & Marketing', head: 'Michael Ross', employeeCount: 28, status: 'Active' },
    { id: 4, name: 'Finance', head: 'Emily White', employeeCount: 15, status: 'Inactive' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  // Open modal for adding a new department
  const handleAddNew = () => {
    setCurrentDepartment(null);
    setShowModal(true);
  };

  // Open modal for editing an existing department
  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setShowModal(true);
  };

  // Handle saving (Add or Update)
  const handleSave = (departmentData) => {
    if (currentDepartment) {
      // Update existing
      setDepartments(departments.map(dept => 
        dept.id === currentDepartment.id ? { ...departmentData, id: currentDepartment.id } : dept
      ));
    } else {
      // Add new
      const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
      setDepartments([...departments, { ...departmentData, id: newId }]);
    }
    setShowModal(false);
  };

  // Handle deleting a department
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  return (
    <div className="department-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Department Management</h2>
          <p className="text-muted mb-0">Manage all company departments and their heads.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleAddNew}>
          <i className="bi bi-plus-lg me-2"></i> Add Department
        </button>
      </div>

      {/* Department List */}
      <DepartmentList 
        departments={departments} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Add/Edit Form Modal */}
      <DepartmentForm 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        department={currentDepartment} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Department;