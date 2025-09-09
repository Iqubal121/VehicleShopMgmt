import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

const CustomerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const customerFromState = location.state?.customer;

  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    loanNumber: '',
    mobile: '',
    email: '',
    loanDetails: '',
    loanStatus: '',
    nextEmiDate: '',
  });

  useEffect(() => {
    if (customerFromState) {
      setCustomer(customerFromState);
    }
  }, [customerFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    alert('Edit functionality not implemented yet.');
  };

  const handleDelete = () => {
    alert('Delete functionality not implemented yet.');
  };

  if (!customerFromState) {
    return (
      <div className="customer-container">
        <p>No customer data available.</p>
        <button className="btn btn-primary" onClick={() => navigate('/customers')}>
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="customer-container">
      <header className="customer-header">
        <h1><span className="customer-icon">🔒</span> Customer Detail</h1>
        <button className="btn btn-primary" onClick={() => navigate('/customers')}>
          ← Back to Customers
        </button>
      </header>

      <section className="customer-detail customer-detail-form">
        <label>
          Name:
          <input type="text" name="name" value={customer.name} onChange={handleChange} />
        </label>
        <label>
          Loan Number:
          <input type="text" name="loanNumber" value={customer.loanNumber} onChange={handleChange} />
        </label>
        <label>
          Mobile:
          <input type="text" name="mobile" value={customer.mobile} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={customer.email} onChange={handleChange} />
        </label>
        <label>
          Loan Details:
          <textarea name="loanDetails" value={customer.loanDetails} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="loanStatus" value={customer.loanStatus} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>

        <div className="customer-detail-actions">
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </section>
    </div>
  );
};

export default CustomerDetail;
