import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ExpenseContext } from '../context/ExpenseContext';
import { useMutation } from '@apollo/client';
import { DELETE_EXPENSE } from '../graphql/expenseMutations';
import '../styles/ExpenseList.css';

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: (data) => {
      setExpenses(data.deleteExpense); // Update state after deletion
    },
    onError: (error) => {
      console.error("Error deleting expense:", error);
    },
  });

  const handleDelete = async (id) => {
    console.log("Deleting expense with ID:", id); // Log the ID
    if (!id) {
      console.error('Expense ID is undefined');
      return;
    }
    try {
      await deleteExpense({ variables: { expenseId: id } });
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  if (!expenses || !expenses.expenses || expenses.expenses.length === 0) {
    return <p>No transactions to display.</p>;
  }

  return (
    <div className="expense-list-container">
      <h2>Transactions</h2>
      <ul className="expense-list">
        {expenses.expenses.map((expense) => {
          console.log("Expense ID:", expense._id); // Debugging each ID
          return (
            <li key={expense._id}>
              <span>{expense.description}</span>
              <span className="amount">${expense.amount.toFixed(2)}</span>
              <FaTrash className="delete-icon" onClick={() => handleDelete(expense._id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;
