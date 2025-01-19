import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DynamicTitle = () => {
  const [title, setTitle] = useState('Dashboard');

  useEffect(() => {
    const savedTitle = localStorage.getItem('dashboardTitle');
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-semibold text-gray-800"
    >
      {title}
    </motion.h1>
  );
};