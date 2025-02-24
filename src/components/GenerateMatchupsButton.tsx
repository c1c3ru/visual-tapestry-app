import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GenerateMatchupsButtonProps {
  onGenerate: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const GenerateMatchupsButton: React.FC<GenerateMatchupsButtonProps> = ({
  onGenerate,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onGenerate}
            disabled={disabled}
            className={`gap-2 ${className}`}
            variant="default"
          >
            <Shuffle className="h-4 w-4" />
            {children || 'Gerar Confrontos'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Gerar novos confrontos aleatórios</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GenerateMatchupsButton;