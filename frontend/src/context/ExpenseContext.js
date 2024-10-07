import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES } from '../graphql/expenseQueries';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(null);
  const { loading, data, error } = useQuery(GET_EXPENSES);

  useEffect(() => {
    if (data) {
      setExpenses(data.getExpenses);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading expenses!</p>;

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
