import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="bg-background/80 backdrop-blur-sm">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={loading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle className="text-2xl">{title}</CardTitle>
        </motion.div>
      </CardHeader>
    </Card>
  );
};