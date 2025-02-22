import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Star, StarHalf, Brush, Gauge } from 'lucide-react';
import { toast } from 'sonner';

interface MenuSettingsProps {
  selectedRatingSystem: string;
  setSelectedRatingSystem: (system: string) => void;
  guestHighlight: string;
  setGuestHighlight: (highlight: string) => void;
}

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

const ratingSystems = [
  { 
    value: "stars", 
    label: "Estrelas",
    icon: <Star className="h-4 w-4" />,
    description: "Avaliação por estrelas completas"
  },
  { 
    value: "numeric10", 
    label: "Escala 1-10",
    icon: <Gauge className="h-4 w-4" />,
    description: "Escala numérica detalhada"
  },
  { 
    value: "numeric5", 
    label: "Escala 1-5",
    icon: <Gauge className="h-4 w-4" />,
    description: "Escala numérica simplificada"
  },
  { 
    value: "halfStars", 
    label: "Meia Estrela",
    icon: <StarHalf className="h-4 w-4" />,
    description: "Permite meias estrelas na avaliação"
  }
];

const highlightStyles = [
  { value: "none", label: "Sem destaque", color: "bg-gray-200" },
  { value: "orange", label: "Laranja", color: "bg-orange-400" },
  { value: "yellow", label: "Amarelo", color: "bg-yellow-400" },
  { value: "green", label: "Verde", color: "bg-green-500" }
];

export const MenuSettings: React.FC<MenuSettingsProps> = ({
  selectedRatingSystem,
  setSelectedRatingSystem,
  guestHighlight,
  setGuestHighlight,
}) => {
  const handleRatingChange = (value: string) => {
    setSelectedRatingSystem(value);
    localStorage.setItem('ratingSystem', value);
    toast.success("Sistema de avaliação atualizado!", {
      icon: <Star className="w-4 h-4 text-teal-600" />
    });
  };

  const handleHighlightChange = (value: string) => {
    setGuestHighlight(value);
    localStorage.setItem('guestHighlight', value);
    toast.success("Destaque de convidados atualizado!", {
      icon: <Brush className="w-4 h-4 text-teal-600" />
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
    >
      <Card className="mb-8 space-y-6 p-6 hover:shadow-lg transition-shadow duration-200 bg-white/90 backdrop-blur">
        {/* Rating System Section */}
        <div className="space-y-2">
          <Label className="text-gray-600">Sistema de Avaliação</Label>
          <Select
            value={selectedRatingSystem}
            onValueChange={handleRatingChange}
          >
            <SelectTrigger className="hover:border-teal-100 focus:ring-2 focus:ring-teal-200">
              <SelectValue placeholder="Selecione o sistema de avaliação" />
            </SelectTrigger>
            <SelectContent>
              {ratingSystems.map((system) => (
                <SelectItem
                  key={system.value}
                  value={system.value}
                  className="hover:bg-teal-50 focus:bg-teal-50"
                >
                  <div className="flex items-center gap-3">
                    {system.icon}
                    <div>
                      <p className="font-medium">{system.label}</p>
                      <p className="text-xs text-gray-500">{system.description}</p>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guest Highlight Section */}
        <div className="space-y-2">
          <Label className="text-gray-600">Destaque para Convidados</Label>
          <Select
            value={guestHighlight}
            onValueChange={handleHighlightChange}
          >
            <SelectTrigger className="hover:border-teal-100 focus:ring-2 focus:ring-teal-200">
              <SelectValue placeholder="Selecione o destaque" />
            </SelectTrigger>
            <SelectContent>
              {highlightStyles.map((style) => (
                <SelectItem
                  key={style.value}
                  value={style.value}
                  className="hover:bg-teal-50 focus:bg-teal-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${style.color}`} />
                    <span>{style.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
    </motion.div>
  );
};