import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // Import Recharts components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../styles/DashboardContent.css';

const DashboardContent = () => {
  const { expenses } = useContext(ExpenseContext);

  if (!expenses) return <p>Loading...</p>;

  // Prepare data for the charts
  const data = [
    { name: 'Remaining Income', value: expenses.remainingIncome },
    { name: 'Total Expenses', value: expenses.totalExpenses },
  ];

  const expenseData = [
    { name: 'Expenses', value: expenses.totalExpenses },
    { name: 'Remaining Income', value: expenses.remainingIncome },
  ];

  const COLORS = ['#27ae60', '#e74c3c']; // Colors for the pie chart

  return (
    <div className="dashboard-content">
      {/* Pie Chart */}
      <div className="chart-container">
        <h3>Expense Breakdown (Pie Chart)</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={150}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Expense Overview (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#27ae60" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income Info Section */}
      <div className="dashboard-header">
        <div className="income-info">
          <h3>Total Income: ${expenses.income.toFixed(2)}</h3>
          <h3>Total Expenses: ${expenses.totalExpenses.toFixed(2)}</h3>
          <h3>Remaining Income: ${expenses.remainingIncome.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
