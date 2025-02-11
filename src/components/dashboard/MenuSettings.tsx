
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Star, StarHalf } from 'lucide-react';

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
    <Card className="mb-8 space-y-6 p-6">
      <div className="space-y-2">
        <Label htmlFor="ratingSystem">Sistema de Avaliação</Label>
        <Select
          value={selectedRatingSystem}
          onValueChange={setSelectedRatingSystem}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o sistema de avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Estrelas
              </div>
            </SelectItem>
            <SelectItem value="numeric10">Escala 1-10</SelectItem>
            <SelectItem value="numeric5">Escala 1-5</SelectItem>
            <SelectItem value="halfStars">
              <div className="flex items-center gap-2">
                <StarHalf className="h-4 w-4" />
                Meia Estrela
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="guestHighlight">Destaque para Convidados</Label>
        <Select
          value={guestHighlight}
          onValueChange={setGuestHighlight}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o destaque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem destaque</SelectItem>
            <SelectItem value="orange">Laranja</SelectItem>
            <SelectItem value="yellow">Amarelo</SelectItem>
            <SelectItem value="green">Verde</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};
