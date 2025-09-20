import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CashflowForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerID: '',
    vehicleID: '',
    customerName: '',
    vehicleModel: '',
    chesisNumber: '',
    engineNumber: '',
    vehicleColor: '',
    customerAddress: '',
    customerMobile: '',
    paymentMode: 'Cash',
    saleDate: '',
    totalAmount: '',
    paidAmount: '',
    remainigAmount: '',
    lastDate: '',
    status: 'Pending',
  });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }};

}
