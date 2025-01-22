import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const TournamentHeader = () => {
  return (
    <motion.div 
      className="flex items-center gap-2 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Trophy className="h-8 w-8 text-tournament-bg" />
      <h1 className="text-3xl font-bold text-gray-800">Campeonato</h1>
    </motion.div>
  );
};