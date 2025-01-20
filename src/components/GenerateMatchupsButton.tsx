import React from 'react';
import { Button } from './ui/button';
import { Shuffle } from 'lucide-react';

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
    <Button
      onClick={onGenerate}
      disabled={disabled}
      className={`gap-2 ${className}`}
    >
      <Shuffle className="h-4 w-4" />
      {children || 'Gerar Confrontos'}
    </Button>
  );
};

export default GenerateMatchupsButton;