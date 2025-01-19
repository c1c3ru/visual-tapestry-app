import React from 'react';

interface TeamNameSelectorProps {
  onNameFormatChange: (format: string) => void;
}

const TeamNameSelector: React.FC<TeamNameSelectorProps> = ({ onNameFormatChange }) => {
  return (
    <div className="flex gap-4">
      <label>
        <input
          type="radio"
          name="teamNaming"
          value="numeric"
          onChange={() => onNameFormatChange('numeric')}
        />
        Time 01, Time 02, ...
      </label>
      <label>
        <input
          type="radio"
          name="teamNaming"
          value="alphabet"
          onChange={() => onNameFormatChange('alphabet')}
        />
        Time A, Time B, ...
      </label>
      <label>
        <input
          type="radio"
          name="teamNaming"
          value="color"
          onChange={() => onNameFormatChange('color')}
        />
        Por cores
      </label>
    </div>
  );
};

export default TeamNameSelector;
