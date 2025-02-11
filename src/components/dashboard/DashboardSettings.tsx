
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, StarHalf } from 'lucide-react';
import { toast } from "sonner";

interface DashboardSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (value: string) => void;
  guestHighlight: string;
  setGuestHighlight: (value: string) => void;
}

export const DashboardSettings = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight
}: DashboardSettingsProps) => {
  const handleRatingSystemChange = (value: string) => {
    setSelectedRatingSystem(value);
    localStorage.setItem('ratingSystem', value);
    toast.success("Sistema de avaliação atualizado!");
  };

  const handleGuestHighlightChange = (value: string) => {
    setGuestHighlight(value);
    localStorage.setItem('guestHighlight', value);
    toast.success("Destaque de convidados atualizado!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sistema de Avaliação</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Avaliação</Label>
            <Select value={selectedRatingSystem} onValueChange={handleRatingSystemChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sistema" />
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
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Destaque para Convidados</h2>
        <div className="space-y-2">
          <Label>Estilo de Destaque</Label>
          <Select value={guestHighlight} onValueChange={handleGuestHighlightChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o destaque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orange">Laranja</SelectItem>
              <SelectItem value="purple">Roxo</SelectItem>
              <SelectItem value="pink">Rosa</SelectItem>
              <SelectItem value="bold">Negrito</SelectItem>
              <SelectItem value="italic">Itálico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};
