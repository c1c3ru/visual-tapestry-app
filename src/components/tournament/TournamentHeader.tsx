
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { springConfig } from '../../utils/animations';

const TournamentHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="flex items-center gap-3 mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm"
      role="banner"
      aria-label="Cabeçalho do Campeonato"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={springConfig}
        className="p-2 bg-primary/10 rounded-full"
      >
        <Trophy 
          className="h-8 w-8 text-primary" 
          aria-hidden="true"
        />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
      >
        Campeonato
      </motion.h1>
    </motion.header>
  );
};

export default TournamentHeader;
