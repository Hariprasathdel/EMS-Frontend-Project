import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import './Employee.css';

const Employee = () => {
  // Mock Data
  const [employees, setEmployees] = useState([
    { id: 1, code: 'EMP001', name: 'Hardik Soni', department: 'IT', role: 'Senior Developer', email: 'hardik@company.com', status: 'Active', joinDate: '2021-05-12' },
    { id: 2, code: 'EMP002', name: 'John William', department: 'HR', role: 'HR Manager', email: 'john@company.com', status: 'Active', joinDate: '2020-08-20' },
    { id: 3, code: 'EMP003', name: 'Sarah Smith', department: 'Sales', role: 'Sales Executive', email: 'sarah@company.com', status: 'Inactive', joinDate: '2022-01-15' },
    { id: 4, code: 'EMP004', name: 'Michael Brown', department: 'Finance', role: 'Accountant', email: 'michael@company.com', status: 'Active', joinDate: '2019-11-05' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAddNew = () => {
    setCurrentEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleSave = (employeeData) => {
    if (currentEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === currentEmployee.id ? { ...employeeData, id: currentEmployee.id } : emp
      ));
    } else {
      const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      setEmployees([...employees, { ...employeeData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee record?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="employee-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Employee Directory</h2>
          <p className="text-muted mb-0">Manage all employee records and details.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleAddNew}>
          <i className="bi bi-person-plus me-2"></i> Add Employee
        </button>
      </div>

      {/* Employee List */}
      <EmployeeList 
        employees={employees} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Add/Edit Form Modal */}
      <EmployeeForm 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        employee={currentEmployee} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Employee;