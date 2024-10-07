// src/schemas/expenseSchema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type ExpenseItem {
    _id: ID
    description: String
    amount: Float
  }

  type Expense {
    income: Float
    expenses: [ExpenseItem]
    totalExpenses: Float
    remainingIncome: Float
  }

  type Query {
    getExpenses: Expense
  }

  type Mutation {
    addExpense(description: String!, amount: Float!): Expense
    setIncome(income: Float!): Expense
    deleteExpense(expenseId: ID!): Expense  # Added this line
  }
`;

module.exports = typeDefs;
