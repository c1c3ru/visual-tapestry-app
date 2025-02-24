
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const BackToDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springConfig}
      className="fixed top-4 left-4 z-50"
      role="navigation"
      aria-label="Voltar ao menu principal"
    >
      <Card className="bg-background/90 backdrop-blur-sm border-2 border-transparent hover:border-primary/20 transition-all shadow-lg">
        <Link to="/dashboard" className="focus:outline-none">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springConfig}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 group"
              aria-label="Voltar ao menu principal"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={springConfig}
                className="p-1 bg-primary/10 rounded-full"
              >
                <ChevronLeft className="h-4 w-4 text-primary group-hover:-translate-x-0.5 transition-transform" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...springConfig, delay: 0.1 }}
                className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
              >
                Voltar ao Menu
              </motion.span>
            </Button>
          </motion.div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default BackToDashboard;
