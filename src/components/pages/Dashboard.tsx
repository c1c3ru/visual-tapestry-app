import { useState, useEffect } from 'react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';

const Dashboard = () => {
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader 
          isAdmin={isAdmin}
          dashboardTitle={dashboardTitle}
          setDashboardTitle={setDashboardTitle}
        />
        
        <DashboardSettings />

        <DashboardMenu />
      </div>
    </div>
  );
};

export default Dashboard;