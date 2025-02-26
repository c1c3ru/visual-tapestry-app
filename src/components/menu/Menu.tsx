
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuSettings } from './MenuSettings';
import { MenuItems } from './MenuItem';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { springConfig } from '@/utils/animations';
import {PagesTitle} from '../shared/PagesTitle'; // Adjust the import path as necessary

const Menu = () => {
  const { 
    menuTitle, 
    isAdmin, 
  
  } = useMenuStore();

  const { 
    ratingSystem, 
    guestHighlight, 
    setRatingSystem, 
    setGuestHighlight 
  } = useSettingsStore();

  useEffect(() => {
    document.title = menuTitle;
  }, [menuTitle]);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen bg-gradient-to-br from-teal-50/80 via-blue-50/80 to-white p-6 font-sans backdrop-blur-sm"
      role="main"
      aria-label="Menu principal"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springConfig}
          >
            <PagesTitle />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springConfig, delay: 0.1 }}
          >
            <MenuSettings
              selectedRatingSystem={ratingSystem}
              setSelectedRatingSystem={setRatingSystem}
              guestHighlight={guestHighlight}
              setGuestHighlight={setGuestHighlight}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.div
            key="menu-items"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            <MenuItems />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Menu;
