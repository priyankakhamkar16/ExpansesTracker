// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul>
        <li onClick={() => setActiveSection('dashboard')} className="active">Dashboard</li>
        <li onClick={() => setActiveSection('expenses')}>Expenses</li>
        <li onClick={() => setActiveSection('transactions')}>Transactions</li>
        <li onClick={() => setActiveSection('income')}>Income</li>
      </ul>
    </div>
  );
};

export default Sidebar;
