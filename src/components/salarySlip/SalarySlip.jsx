import React, { useState } from 'react';
import SalaryList from './SalaryList';
import SalaryGenerator from './SalaryGenerator';
import './SalarySlip.css';

const SalarySlip = () => {
  // Mock Data
  const [salarySlips, setSalarySlips] = useState([
    { id: 1, empCode: 'EMP001', name: 'Hardik Soni', month: 'October', year: 2023, basicPay: 5000, allowances: 500, deductions: 200, netPay: 5300, status: 'Paid' },
    { id: 2, empCode: 'EMP002', name: 'John William', month: 'October', year: 2023, basicPay: 4500, allowances: 400, deductions: 150, netPay: 4750, status: 'Pending' },
    { id: 3, empCode: 'EMP003', name: 'Sarah Smith', month: 'October', year: 2023, basicPay: 4800, allowances: 450, deductions: 180, netPay: 5070, status: 'Paid' },
    { id: 4, empCode: 'EMP004', name: 'Michael Brown', month: 'September', year: 2023, basicPay: 5200, allowances: 600, deductions: 250, netPay: 5550, status: 'Paid' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentSlip, setCurrentSlip] = useState(null);

  const handleGenerateNew = () => {
    setCurrentSlip(null);
    setShowModal(true);
  };

  const handleEdit = (slip) => {
    setCurrentSlip(slip);
    setShowModal(true);
  };

  const handleSave = (slipData) => {
    // Calculate Net Pay automatically
    const basic = parseFloat(slipData.basicPay) || 0;
    const allow = parseFloat(slipData.allowances) || 0;
    const deduct = parseFloat(slipData.deductions) || 0;
    const calculatedNetPay = basic + allow - deduct;

    const finalData = { ...slipData, netPay: calculatedNetPay };

    if (currentSlip) {
      setSalarySlips(salarySlips.map(s => 
        s.id === currentSlip.id ? { ...finalData, id: currentSlip.id } : s
      ));
    } else {
      const newId = salarySlips.length > 0 ? Math.max(...salarySlips.map(s => s.id)) + 1 : 1;
      setSalarySlips([...salarySlips, { ...finalData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this salary slip?')) {
      setSalarySlips(salarySlips.filter(s => s.id !== id));
    }
  };

  return (
    <div className="salary-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Salary Slips</h2>
          <p className="text-muted mb-0">Generate and manage monthly employee salary slips.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleGenerateNew}>
          <i className="bi bi-calculator me-2"></i> Generate Salary
        </button>
      </div>

      {/* Salary List */}
      <SalaryList 
        salarySlips={salarySlips} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Generator Modal */}
      <SalaryGenerator 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        slip={currentSlip} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default SalarySlip;