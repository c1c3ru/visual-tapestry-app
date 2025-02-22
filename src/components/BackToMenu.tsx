import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

// Enhanced BackToDashboard Component
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
      <Card className="bg-background/90 backdrop-blur-sm border-2 hover:border-primary/20 transition-all shadow-lg">
        <Link 
          to="/dashboard" 
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          aria-label="Navegar de volta ao painel principal"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springConfig}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 group"
            >
              <motion.div
                className="p-1 bg-primary/10 rounded-full"
                whileHover={{ rotate: -10 }}
                transition={springConfig}
              >
                <ChevronLeft 
                  className="h-4 w-4 text-primary group-hover:-translate-x-1 transition-transform" 
                  aria-hidden="true"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...springConfig, delay: 0.1 }}
                className="font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
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

// Enhanced DynamicTitle Component
export const DynamicTitle = () => {
  const [title, setTitle] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTitle = () => {
      try {
        const savedTitle = localStorage.getItem('dashboardTitle') || 'Dashboard';
        setTitle(savedTitle);
      } catch (error) {
        console.error('Error loading title:', error);
        setTitle('Dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadTitle();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
    >
      <Card className="bg-background/80 backdrop-blur-sm border-2 border-transparent hover:border-primary/20 transition-all">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </motion.div>
          
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse"
                aria-label="Carregando título..."
              />
            )}
          </AnimatePresence>
        </CardHeader>
      </Card>
    </motion.div>
  );
};