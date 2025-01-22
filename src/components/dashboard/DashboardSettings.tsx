import { useSettingsStore } from '@/stores/useSettingsStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const DashboardSettings = () => {
  const { ratingSystem, guestHighlight, setRatingSystem, setGuestHighlight } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <Label>Sistema de Avaliação</Label>
        <Select value={ratingSystem} onValueChange={setRatingSystem}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha o sistema de avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stars">Estrelas</SelectItem>
            <SelectItem value="halfStars">Meia Estrela</SelectItem>
            <SelectItem value="numeric 5">Numérico (1-5)</SelectItem>
            <SelectItem value="numeric 10">Numérico (1-10)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Destaque para Convidados</Label>
        <Select value={guestHighlight} onValueChange={setGuestHighlight}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha a cor de destaque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orange">Laranja</SelectItem>
            <SelectItem value="yellow">Amarelo</SelectItem>
            <SelectItem value="green">Verde</SelectItem>
            <SelectItem value="blue">Azul</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};