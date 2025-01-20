import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface TeamNameSelectorProps {
  onNameFormatChange: (format: string) => void;
  value: string;
}

interface TeamNameFormat {
  value: string;
  label: string;
}

const teamNameFormats: TeamNameFormat[] = [
  { value: 'numeric', label: 'Time 01, Time 02, ...' },
  { value: 'alphabet', label: 'Time A, Time B, ...' },
  { value: 'color', label: 'Por cores' },
];

const TeamNameSelector: React.FC<TeamNameSelectorProps> = ({ onNameFormatChange, value }) => {
  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Formato de Nomenclatura</h3>
      <RadioGroup
        value={value}
        onValueChange={onNameFormatChange}
        className="flex flex-col space-y-2"
      >
        {teamNameFormats.map((format) => (
          <div key={format.value} className="flex items-center space-x-2">
            <RadioGroupItem value={format.value} id={format.value} />
            <Label htmlFor={format.value}>{format.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TeamNameSelector;