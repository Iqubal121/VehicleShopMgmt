import React from 'react';

const Sidebar = ({ openEMIDialog }) => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">↔️</div>
        <div className="logo-text">
          <strong>Premium Auto</strong>
          <br />
          Finance
        </div>
      </div>
      <nav className="nav-links">
        <a href="/" className="nav-link">
          <span className="icon">🏠</span> Dashboard
        </a>
        <a href="/customers" className="nav-link">
          <span className="icon">👥</span> Customers
        </a>
        <a href="/vehicles" className="nav-link">
          <span className="icon">🚙</span> Vehicle
        </a>
        <a href="#">
          <span className="icon">💱</span> Loans
        </a>
        <a href="#">
          <span className="icon">💳</span> Payments
        </a>
        <a href="/customerEnquiry" className="nav-link">
          <span className="icon">📝</span> Customer Enquiry
        </a>
         <a href="/cashflows" className="nav-link">
          <span className="icon">💲</span> Cash Flow
        </a>
        <button className="nav-link button-link" onClick={openEMIDialog} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
          <span className="icon">📅</span> EMI Calculator
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
