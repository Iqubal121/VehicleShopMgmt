import React, { useState, useEffect } from 'react';
import '../index.css';

const CalculateEMI = ({ onClose }) => {
  const [formData, setFormData] = useState({
    vehiclePrice: '',
    downPayment: '',
    remainingAmount: '',
    tenure: '',
    interestRate: '',
    emi: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const vehiclePrice = parseFloat(formData.vehiclePrice) || 0;
    const downPayment = parseFloat(formData.downPayment) || 0;
    const remainingAmount = vehiclePrice - downPayment;
    setFormData(prev => ({ ...prev, remainingAmount: remainingAmount > 0 ? remainingAmount.toFixed(2) : '' }));
  }, [formData.vehiclePrice, formData.downPayment]);

  useEffect(() => {
    const remainingAmount = parseFloat(formData.remainingAmount) || 0;
    const tenure = parseFloat(formData.tenure) || 0; // in months
    const interestRate = parseFloat(formData.interestRate) || 0; // annual %

    if (remainingAmount > 0 && tenure > 0 && interestRate > 0) {
      const monthlyRate = interestRate / 12 / 100;
      const months = tenure;
      const emi = (remainingAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      setFormData(prev => ({ ...prev, emi: emi.toFixed(2) }));
    } else {
      setFormData(prev => ({ ...prev, emi: '' }));
    }
  }, [formData.remainingAmount, formData.tenure, formData.interestRate]);

  return (
    <div className="multi-step-form-container">
      <div className="form-header">
        <button className="cancel-btn" onClick={onClose}>×</button>
        <h2>Calculate EMI</h2>
      </div>
      <form className="multi-step-form">
        <div className="form-row">
          <label>Vehicle Price:</label>
          <input type="number" name="vehiclePrice" value={formData.vehiclePrice} onChange={handleChange} placeholder="Enter vehicle price" />
        </div>
        <div className="form-row">
          <label>Down Payment:</label>
          <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} placeholder="Enter down payment" />
        </div>
        <div className="form-row">
          <label>Remaining Amount:</label>
          <input type="number" name="remainingAmount" value={formData.remainingAmount} readOnly />
        </div>
        <div className="form-row">
          <label>Tenure (Months):</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} placeholder="Enter tenure in months" />
        </div>
        <div className="form-row">
          <label>Interest Rate (% per annum):</label>
          <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} placeholder="Enter annual interest rate" />
        </div>
        <div className="form-row">
          <label>Calculated EMI:</label>
          <input type="number" name="emi" value={formData.emi} readOnly />
        </div>
      </form>
    </div>
  );
};

export default CalculateEMI;
