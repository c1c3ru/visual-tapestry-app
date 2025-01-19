import React from 'react';
import { Button } from './ui/button';
import { Shuffle } from 'lucide-react';

interface GenerateMatchupsButtonProps {
  onGenerate: () => void;
}

const GenerateMatchupsButton: React.FC<GenerateMatchupsButtonProps> = ({ onGenerate }) => {
  return (
    <Button onClick={onGenerate} className="gap-2">
      <Shuffle className="h-4 w-4" />
      Gerar Confrontos
    </Button>
  );
};

export default GenerateMatchupsButton;
