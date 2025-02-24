import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { SportEnum } from "@/utils/enums"; // Importe o enum de esportes
import SportsIcon from "../SportsIcons"; // Importe o componente de ícones

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

interface PlayerSportSelectionProps {
  sport: SportEnum; // Usando o enum SportEnum
  onSportChange: (value: SportEnum) => void; // Atualize o tipo do valor
}

export const PlayerSportSelection = ({
  sport,
  onSportChange,
}: PlayerSportSelectionProps) => {
  // Mapeamento de esportes usando o enum
  const sports = [
    { value: SportEnum.FUTSAL, label: "Futsal" },
    { value: SportEnum.SOCCER, label: "Futebol" },
    { value: SportEnum.VOLLEYBALL, label: "Vôlei" },
    { value: SportEnum.BASKETBALL, label: "Basquete" },
    { value: SportEnum.HANDBALL, label: "Handebol" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-2"
    >
      <Label htmlFor="sport" className="text-sm font-medium text-gray-700">
        Esporte
      </Label>

      <Select value={sport} onValueChange={onSportChange}>
        <SelectTrigger
          className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-200"
          aria-label="Selecione um esporte"
        >
          <div className="flex items-center gap-3">
            {sport && <SportsIcon sport={sport} className="h-5 w-5" />}
            <SelectValue placeholder="Selecione um esporte" />
          </div>
          <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
        </SelectTrigger>

        <SelectContent>
          <AnimatePresence>
            {sports.map((sportItem, index) => (
              <motion.div
                key={sportItem.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ...springConfig, delay: index * 0.05 }}
              >
                <SelectItem value={sportItem.value} className="focus:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <SportsIcon sport={sportItem.value} className="h-5 w-5" />
                    <span>{sportItem.label}</span>
                  </div>
                </SelectItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </SelectContent>
      </Select>
    </motion.div>
  );
};