import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

const BackToDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springConfig}
      className="mb-4"
      role="navigation"
      aria-label="Voltar ao menu principal"
    >
      <Link
        to="/dashboard"
        className={clsx(
          "inline-flex items-center gap-2 p-2 pr-3 rounded-full",
          "text-gray-600 hover:text-gray-800 transition-all",
          "hover:bg-gray-100 focus:outline-none focus:ring-2",
          "focus:ring-primary focus:ring-offset-2"
        )}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.div>
        <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Voltar ao Menu Principal
        </span>
      </Link>
    </motion.div>
  );
};

export default BackToDashboard;