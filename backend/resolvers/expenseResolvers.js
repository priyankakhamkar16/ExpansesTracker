const Expense = require('../models/Expense');


const resolvers = {
  Query: {
    getExpenses: async () => {
      const expenses = await Expense.findOne();
      if (!expenses) return { income: 0, expenses: [], totalExpenses: 0, remainingIncome: 0 };

      const totalExpenses = expenses.expenses.reduce((total, item) => total + item.amount, 0);
      const remainingIncome = expenses.income - totalExpenses;

      return {
        ...expenses._doc,
        totalExpenses,
        remainingIncome,
      };
    },
  },
  Mutation: {
    addExpense: async (_, { description, amount }) => {
      const expenses = await Expense.findOne();
      if (!expenses) return null;

      expenses.expenses.push({ description, amount });
      await expenses.save();

      const totalExpenses = expenses.expenses.reduce((total, item) => total + item.amount, 0);
      const remainingIncome = expenses.income - totalExpenses;

      return {
        ...expenses._doc,
        totalExpenses,
        remainingIncome,
      };
    },
    setIncome: async (_, { income }) => {
      let expenses = await Expense.findOne();
      if (!expenses) {
        expenses = new Expense({ income, expenses: [] });
      } else {
        expenses.income = income;
      }

      await expenses.save();

      const totalExpenses = expenses.expenses.reduce((total, item) => total + item.amount, 0);
      const remainingIncome = expenses.income - totalExpenses;

      return {
        ...expenses._doc,
        totalExpenses,
        remainingIncome,
      };
    },
    deleteExpense: async (_, { expenseId }) => {
      const expenses = await Expense.findOne();
      if (!expenses) return null;

      const existingExpenseIndex = expenses.expenses.findIndex(expense => expense._id.equals(expenseId));
      if (existingExpenseIndex === -1) {
        throw new Error('Expense not found');
      }

      // Remove the expense
      expenses.expenses.splice(existingExpenseIndex, 1);
      await expenses.save(); // Save the updated document

      const totalExpenses = expenses.expenses.reduce((total, item) => total + item.amount, 0);
      const remainingIncome = expenses.income - totalExpenses;

      return {
        ...expenses._doc,
        totalExpenses,
        remainingIncome,
      };
    },
  },
};

module.exports = resolvers;

