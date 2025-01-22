import { useEffect } from 'react';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { 
    dashboardTitle, 
    isAdmin, 
    setDashboardTitle, 
    setIsAdmin 
  } = useDashboardStore();
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
  }, [setDashboardTitle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans"
    >
      <div className="max-w-4xl mx-auto">
        <DashboardHeader
          dashboardTitle={dashboardTitle}
          isAdmin={isAdmin}
          setDashboardTitle={setDashboardTitle}
        />
        <DashboardSettings
          selectedRatingSystem={ratingSystem}
          setSelectedRatingSystem={setRatingSystem}
          guestHighlight={guestHighlight}
          setGuestHighlight={setGuestHighlight}
        />
        <DashboardMenu  />
      </div>
    </motion.div>
  );
};

export default Dashboard;