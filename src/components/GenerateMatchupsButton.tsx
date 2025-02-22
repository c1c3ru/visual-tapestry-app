import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface GenerateMatchupsButtonProps {
  onGenerate: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const GenerateMatchupsButton: React.FC<GenerateMatchupsButtonProps> = ({
  onGenerate,
  disabled = false,
  className = '',
  children,
  isLoading = false
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            transition={springConfig}
          >
            <Button
              onClick={onGenerate}
              disabled={disabled || isLoading}
              className={`gap-2 relative overflow-hidden ${className}`}
              variant="default"
              aria-label="Gerar novos confrontos aleatórios"
            >
              <motion.div
                animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={isLoading ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
                className="flex items-center"
              >
                <Shuffle className="h-4 w-4" />
              </motion.div>
              
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoading ? 0.7 : 1 }}
                className="relative"
              >
                {children || 'Gerar Confrontos'}
              </motion.span>

              {isLoading && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 left-0 h-1 bg-primary/20"
                />
              )}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="border bg-background">
          <p className="flex items-center gap-2">
            <Shuffle className="h-4 w-4 text-primary" />
            Gerar novos confrontos aleatórios
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GenerateMatchupsButton;