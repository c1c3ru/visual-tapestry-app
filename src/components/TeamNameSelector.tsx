import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface TeamNameSelectorProps {
  onNameFormatChange: (format: string) => void;
  value: string;
}

const TeamNameSelector: React.FC<TeamNameSelectorProps> = ({ onNameFormatChange, value }) => {
  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Formato de Nomenclatura</h3>
      <RadioGroup
        value={value}
        onValueChange={onNameFormatChange}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="numeric" id="numeric" />
          <Label htmlFor="numeric">Time 01, Time 02, ...</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="alphabet" id="alphabet" />
          <Label htmlFor="alphabet">Time A, Time B, ...</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="color" id="color" />
          <Label htmlFor="color">Por cores</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TeamNameSelector;