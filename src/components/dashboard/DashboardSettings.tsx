
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, StarHalf, Brush } from 'lucide-react';
import { toast } from "sonner";

interface DashboardSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (value: string) => void;
  guestHighlight: string;
  setGuestHighlight: (value: string) => void;
}

const SettingsCard = ({ children, title }: { 
  children: React.ReactNode; 
  title: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200"
  >
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </motion.div>
);

const ratingSystems = [
  { value: "stars", label: "Estrelas", icon: <Star className="h-4 w-4" /> },
  { value: "halfStars", label: "Meia Estrela", icon: <StarHalf className="h-4 w-4" /> },
  { value: "numeric5", label: "Escala 1-5", icon: <Star className="h-4 w-4" /> },
  { value: "numeric10", label: "Escala 1-10", icon: <Star className="h-4 w-4" /> },
];

const highlightStyles = [
  { value: "orange", label: "Laranja", color: "bg-orange-400" },
  { value: "purple", label: "Roxo", color: "bg-purple-500" },
  { value: "pink", label: "Rosa", color: "bg-pink-400" },
  { value: "bold", label: "Negrito", style: "font-bold" },
  { value: "italic", label: "Itálico", style: "italic" }
];

export const DashboardSettings = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight
}: DashboardSettingsProps) => {
  const handleChange = (type: 'rating' | 'highlight', value: string) => {
    try {
      if (type === 'rating') {
        setSelectedRatingSystem(value);
        localStorage.setItem('ratingSystem', value);
        toast.success("Sistema de avaliação atualizado!");
      } else {
        setGuestHighlight(value);
        localStorage.setItem('guestHighlight', value);
        toast.success("Destaque de convidados atualizado!");
      }
    } catch (error) {
      toast.error("Erro ao salvar configuração");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SettingsCard title="Sistema de Avaliação">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Tipo de Avaliação</Label>
            <Select 
              value={selectedRatingSystem} 
              onValueChange={(v) => handleChange('rating', v)}
            >
              <SelectTrigger className="w-full bg-white border border-gray-200 hover:border-primary/50 focus:ring-1 focus:ring-primary/30">
                <SelectValue placeholder="Selecione o sistema" />
              </SelectTrigger>
              <SelectContent>
                {ratingSystems.map((system) => (
                  <SelectItem 
                    key={system.value} 
                    value={system.value}
                    className="hover:bg-primary/5 focus:bg-primary/5"
                  >
                    <div className="flex items-center gap-2">
                      {system.icon}
                      <span>{system.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Destaque para Convidados">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Estilo de Destaque</Label>
          <Select 
            value={guestHighlight} 
            onValueChange={(v) => handleChange('highlight', v)}
          >
            <SelectTrigger className="w-full bg-white border border-gray-200 hover:border-primary/50 focus:ring-1 focus:ring-primary/30">
              <SelectValue placeholder="Selecione o destaque" />
            </SelectTrigger>
            <SelectContent>
              {highlightStyles.map((style) => (
                <SelectItem 
                  key={style.value} 
                  value={style.value}
                  className="hover:bg-primary/5 focus:bg-primary/5"
                >
                  <div className="flex items-center gap-2">
                    {style.color ? (
                      <div className={`w-4 h-4 rounded-full ${style.color}`} />
                    ) : (
                      <span className={`${style.style} w-4 text-center`}>A</span>
                    )}
                    <span>{style.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SettingsCard>
    </div>
  );
};
