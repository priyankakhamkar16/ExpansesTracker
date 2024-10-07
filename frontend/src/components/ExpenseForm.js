// src/components/ExpenseForm.js
import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../graphql/expenseMutations';
import '../styles/ExpenseForm.css';

const ExpenseForm = () => {
  const { setExpenses } = useContext(ExpenseContext); // Removed 'expenses' since it's not used
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [addExpense] = useMutation(ADD_EXPENSE, {
    onCompleted: (data) => {
      setExpenses(data.addExpense);
    },
    onError: (error) => {
      console.error("Error adding expense:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Please enter both description and amount');
      return;
    }

    const newExpense = {
      description,
      amount: parseFloat(amount),
    };

    await addExpense({ variables: { description: newExpense.description, amount: newExpense.amount } });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="expense-form-container">
      <form className="expense-form" onSubmit={handleSubmit}>
        <h2>Add New Expense</h2>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description"
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter expense amount"
          />
        </div>
        <button type="submit" className="submit-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
