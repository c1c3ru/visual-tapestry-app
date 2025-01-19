import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const BackToDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-4 left-4"
    >
      <Link to="/dashboard">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
    </motion.div>
  );
};