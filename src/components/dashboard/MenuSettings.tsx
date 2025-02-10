
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

interface MenuSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (system: string) => void;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
}

export const MenuSettings: React.FC<MenuSettingsProps> = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight,
}) => {
  return (
    <div className="mb-8 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <Label htmlFor="ratingSystem">Sistema de Avaliação</Label>
        <Select
          value={selectedRatingSystem}
          onValueChange={setSelectedRatingSystem}
        >
          <option value="stars">Estrelas</option>
          <option value="numeric10">Escala 1-10</option>
          <option value="numeric5">Escala 1-5</option>
          <option value="halfStars">Meia Estrela</option>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="guestHighlight">Destaque para Convidados</Label>
        <Select
          value={guestHighlight}
          onValueChange={setGuestHighlight}
        >
          <option value="none">Sem destaque</option>
          <option value="orange">Laranja</option>
          <option value="yellow">Amarelo</option>
          <option value="green">Verde</option>
        </Select>
      </div>
    </div>
  );
};
