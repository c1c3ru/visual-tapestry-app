import { useState, useEffect } from 'react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';

const Dashboard = () => {
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');
  const [selectedRatingSystem, setSelectedRatingSystem] = useState('stars');
  const [guestHighlight, setGuestHighlight] = useState('orange');
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const storedRatingSystem = localStorage.getItem('ratingSystem');
    const storedGuestHighlight = localStorage.getItem('guestHighlight');
    if (storedRatingSystem) setSelectedRatingSystem(storedRatingSystem);
    if (storedGuestHighlight) setGuestHighlight(storedGuestHighlight);
  }, []);

  useEffect(() => {
    localStorage.setItem('ratingSystem', selectedRatingSystem);
    localStorage.setItem('guestHighlight', guestHighlight);
  }, [selectedRatingSystem, guestHighlight]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader 
          isAdmin={isAdmin}
          dashboardTitle={dashboardTitle}
          setDashboardTitle={setDashboardTitle}
        />
        
        <DashboardSettings 
          selectedRatingSystem={selectedRatingSystem}
          setSelectedRatingSystem={setSelectedRatingSystem}
          guestHighlight={guestHighlight}
          setGuestHighlight={setGuestHighlight}
        />

        <DashboardMenu />
      </div>
    </div>
  );
};

export default Dashboard;