// src/components/IncomeForm.js
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_INCOME } from '../graphql/incomeQueries'; // Create this query
import { ExpenseContext } from '../context/ExpenseContext';
import '../styles/IncomeForm.css';

const IncomeForm = () => {
  const { setExpenses } = useContext(ExpenseContext);
  const [income, setIncome] = useState('');

  const [addIncome] = useMutation(ADD_INCOME, {
    onCompleted: (data) => {
      setExpenses((prev) => ({
        ...prev,
        income: data.setIncome.income,
      }));
      setIncome('');
    },
    onError: (error) => {
      console.error("Error adding income:", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income) {
      alert('Please enter your monthly income');
      return;
    }
    addIncome({ variables: { income: parseFloat(income) } });
  };

  return (
    <div className="income-form-container">
      <form className="income-form" onSubmit={handleSubmit}>
        <h2>Set Monthly Income</h2>
        <div className="form-group">
          <label>Income:</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your income"
          />
        </div>
        <button type="submit" className="submit-btn">Set Income</button>
      </form>
    </div>
  );
};

export default IncomeForm;
