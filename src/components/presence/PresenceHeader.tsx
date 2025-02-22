import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { DynamicTitle } from '../DynamicTitle';
import BackToDashboard from '../BackToDashboard';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const PresenceHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-sm"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={springConfig}
      >
        <BackToDashboard>
          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
          </div>
        </BackToDashboard>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key="dynamic-title"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="flex-1 text-center"
        >
          <DynamicTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent" />
        </motion.div>
      </AnimatePresence>
    </motion.header>
  );
};