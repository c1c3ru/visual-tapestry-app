import { useState, useEffect } from 'react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');
  const [isAdmin, setIsAdmin] = useState(true);
  const { 
    ratingSystem, 
    guestHighlight, 
    setRatingSystem, 
    setGuestHighlight 
  } = useSettingsStore();

  useEffect(() => {
    const storedTitle = localStorage.getItem('dashboardTitle');
    if (storedTitle) {
      setDashboardTitle(storedTitle);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans"
    >
      <div className="max-w-4xl mx-auto">
        <DashboardHeader 
          isAdmin={isAdmin}
          dashboardTitle={dashboardTitle}
          setDashboardTitle={setDashboardTitle}
        />
        
        <DashboardSettings 
          selectedRatingSystem={ratingSystem}
          setSelectedRatingSystem={setRatingSystem}
          guestHighlight={guestHighlight}
          setGuestHighlight={setGuestHighlight}
        />

        <DashboardMenu />
      </div>
    </motion.div>
  );
};

export default Dashboard;