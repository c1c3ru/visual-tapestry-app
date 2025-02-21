import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SportsIcons } from "./sportsicons.tsx"; // Assume a custom icon component
import { ChevronDown } from "lucide-react";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

interface PlayerSportSelectionProps {
  sport: Sport;
  onSportChange: (value: string) => void;
}

export const PlayerSportSelection = ({
  sport,
  onSportChange
}: PlayerSportSelectionProps) => {
  const sports = [
    { value: "futsal", label: "Futsal" },
    { value: "futebol", label: "Futebol" },
    { value: "volei", label: "Vôlei" },
    { value: "basquete", label: "Basquete" },
    { value: "handbol", label: "Handebol" }
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

      <Select
        value={sport}
        onValueChange={onSportChange}
      >
        <SelectTrigger
          className="hover:bg-gray-50 focus:ring-2 focus:ring-blue-200"
          aria-label="Selecione um esporte"
        >
          <div className="flex items-center gap-3">
            {sport && <SportsIcons sport={sport} className="h-5 w-5" />}
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
                <SelectItem
                  value={sportItem.value}
                  className="focus:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <SportsIcons sport={sportItem.value as Sport} className="h-5 w-5" />
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