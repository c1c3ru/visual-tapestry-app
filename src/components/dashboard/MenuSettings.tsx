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

const SettingsCard = ({ children, title, icon }: { 
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={springConfig}
  >
    <Card className="p-6 mb-6 hover:shadow-lg transition-shadow duration-200 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-100/50 rounded-lg text-teal-600">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </Card>
  </motion.div>
);

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
  const handleChange = (type: 'rating' | 'highlight', value: string) => {
    try {
      if (type === 'rating') {
        setSelectedRatingSystem(value);
        localStorage.setItem('ratingSystem', value);
        toast.success("Sistema de avaliação atualizado!", {
          icon: <Star className="w-4 h-4 text-teal-600" />
        });
      } else {
        setGuestHighlight(value);
        localStorage.setItem('guestHighlight', value);
        toast.success("Destaque de convidados atualizado!", {
          icon: <Brush className="w-4 h-4 text-teal-600" />
        });
      }
    } catch (error) {
      toast.error("Erro ao salvar configuração");
    }
  };

  return (
    <div className="space-y-4">
      <SettingsCard title="Sistema de Avaliação" icon={<Star className="h-5 w-5" />}>
        <div className="space-y-2">
          <Label className="text-gray-600">Tipo de Avaliação</Label>
          <Select
            value={selectedRatingSystem}
            onValueChange={(v) => handleChange('rating', v)}
          >
            <SelectTrigger className="hover:border-teal-100 focus:ring-2 focus:ring-teal-200">
              <SelectValue placeholder="Selecione o sistema" />
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
      </SettingsCard>

      <SettingsCard title="Destaque para Convidados" icon={<Brush className="h-5 w-5" />}>
        <div className="space-y-2">
          <Label className="text-gray-600">Estilo de Destaque</Label>
          <Select
            value={guestHighlight}
            onValueChange={(v) => handleChange('highlight', v)}
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
      </SettingsCard>
    </div>
  );
};