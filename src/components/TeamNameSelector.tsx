import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

const TeamNameSelector: React.FC<TeamNameSelectorProps> = ({
  onNameFormatChange,
  value,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Formato de Nomenclatura</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default TeamNameSelector;