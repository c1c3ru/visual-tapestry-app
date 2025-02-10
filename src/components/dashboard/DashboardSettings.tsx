
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DashboardSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (system: string) => void;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
}

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight,
}) => {
  const { toast } = useToast();

  const handleRatingChange = (value: string) => {
    setSelectedRatingSystem(value);
    toast({
      title: "Configuração salva",
      description: "Sistema de avaliação atualizado com sucesso.",
    });
  };

  const handleHighlightChange = (value: string) => {
    setGuestHighlight(value);
    toast({
      title: "Configuração salva",
      description: "Destaque para convidados atualizado com sucesso.",
    });
  };

  return (
    <div className="mb-8 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <Label htmlFor="ratingSystem">Sistema de Avaliação</Label>
        <Select
          value={selectedRatingSystem}
          onValueChange={handleRatingChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o sistema de avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">Estrelas</SelectItem>
            <SelectItem value="numeric10">Escala 1-10</SelectItem>
            <SelectItem value="numeric5">Escala 1-5</SelectItem>
            <SelectItem value="halfStars">Meia Estrela</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="guestHighlight">Destaque para Convidados</Label>
        <Select
          value={guestHighlight}
          onValueChange={handleHighlightChange}
        >
          <SelectTrigger>
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
    </div>
  );
};
