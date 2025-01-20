import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const DynamicTitle = () => {
  const [title, setTitle] = useState('Dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTitle = localStorage.getItem('dashboardTitle');
    if (savedTitle) {
      setTitle(savedTitle);
    }
    setLoading(false);
  }, []);

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={loading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-semibold text-gray-800"
    >
      {title}
    </motion.h1>
  );
};