import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem' }}>
        <h1>Admin Dashboard</h1>
        {/* Dashboard content goes here */}
      </main>
    </div>
  );
};

export default Dashboard;
