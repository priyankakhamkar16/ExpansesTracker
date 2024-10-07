import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
