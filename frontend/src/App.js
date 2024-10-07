// src/App.js
import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import { ExpenseProvider } from './context/ExpenseContext';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './styles/App.css'; // Add new CSS for layout

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <ApolloProvider client={client}>
      <ExpenseProvider>
        <div className="dashboard-layout">
          <Sidebar setActiveSection={setActiveSection} />
          <div className="main-content">
            {activeSection === 'dashboard' && <DashboardContent />}
            {activeSection === 'income' && <IncomeForm />}
            {activeSection === 'expenses' && <ExpenseForm />}
            {activeSection === 'transactions' && <ExpenseList />}
          </div>
        </div>
      </ExpenseProvider>
    </ApolloProvider>
  );
};

export default App;
