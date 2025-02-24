
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { DashboardSettings } from '../dashboard/DashboardSettings';
import { DashboardMenu } from '../dashboard/DashboardMenu';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const { 
    dashboardTitle, 
    isAdmin, 
    setDashboardTitle 
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
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background p-6 font-sans"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="p-6 glass-effect">
              <DashboardHeader
                dashboardTitle={dashboardTitle}
                isAdmin={isAdmin}
                setDashboardTitle={setDashboardTitle}
              />
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          >
            <Card className="p-6 glass-effect">
              <DashboardSettings
                selectedRatingSystem={ratingSystem}
                setSelectedRatingSystem={setRatingSystem}
                guestHighlight={guestHighlight}
                setGuestHighlight={setGuestHighlight}
              />
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <Card className="p-6 glass-effect">
              <DashboardMenu />
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Dashboard;
