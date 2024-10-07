// src/graphql/expenseMutations.js
import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation AddExpense($description: String!, $amount: Float!) {
    addExpense(description: $description, amount: $amount) {
      income
      totalExpenses
      remainingIncome
      expenses {
        _id
        description
        amount
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId) {
      income
      totalExpenses
      remainingIncome
      expenses {
        _id
        description
        amount
      }
    }
  }
`;
