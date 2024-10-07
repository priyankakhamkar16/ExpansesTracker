// src/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  income: {
    type: Number,
    required: true,
    default: 0, // Set default income to 0
  },
  expenses: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Expense', expenseSchema);
