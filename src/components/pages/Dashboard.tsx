import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useDashboardStore } from '@/stores/useDashboardStore';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

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
    try {
      const storedTitle = localStorage.getItem('dashboardTitle');
      if (storedTitle) {
        setDashboardTitle(storedTitle);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [setDashboardTitle]);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen bg-gradient-to-br from-teal-50/80 via-blue-50/80 to-white p-6 font-sans backdrop-blur-sm"
      role="main"
      aria-label="Dashboard principal"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <DashboardHeader
              dashboardTitle={dashboardTitle}
              isAdmin={isAdmin}
              setDashboardTitle={setDashboardTitle}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springConfig, delay: 0.1 }}
          >
            <DashboardSettings
              selectedRatingSystem={ratingSystem}
              setSelectedRatingSystem={setRatingSystem}
              guestHighlight={guestHighlight}
              setGuestHighlight={setGuestHighlight}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            <DashboardMenu />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Dashboard;