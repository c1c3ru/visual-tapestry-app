import React from "react";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Player, Rating } from "@/utils/types";
import { PlayerHeader } from "./player/PlayerHeader";
import { PlayerBasicInfo } from "./player/PlayerBasicInfo";
import { PlayerSportInfo } from "./player/PlayerSportInfo";
import { PlayerRating } from "./player/PlayerRating";
import { Card } from "@/components/ui/card";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm } = usePlayerStore();
  const { ratingSystem } = useSettingsStore();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPlayer({ [name]: type === "checkbox" ? checked : value });
  };

  const handleSelectChange = (value: string) => {
    setNewPlayer({ sport: value as any, selectedPositions: [] });
  };

  const handlePositionChange = (position: string, checked: boolean) => {
    const positions = checked 
      ? [...newPlayer.selectedPositions, position]
      : newPlayer.selectedPositions.filter(p => p !== position);
    
    setNewPlayer({ selectedPositions: positions });
  };

  const handleRatingChange = (newRating: Rating) => {
    setNewPlayer({ rating: newRating });
  };

  const validateForm = () => {
    const newErrors = {
      name: newPlayer.name.trim() === "",
      isGuest: newPlayer.isGuest === null,
      selectedPositions: newPlayer.selectedPositions.length === 0,
      rating: newPlayer.rating < 1,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos requeridos",
        variant: "destructive",
      });
      return;
    }

    const player: Player = {
      ...newPlayer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      registered: true,
      present: false,
      paid: false,
      selected: false,
    };

    addPlayer(player);
    resetForm();

    toast({
      title: "Jogador cadastrado",
      description: `${player.name} foi adicionado com sucesso!`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen bg-gray-50 p-6"
    >
      <PlayerHeader />
      
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={springConfig}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="basic-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springConfig}
              >
                <PlayerBasicInfo
                  name={newPlayer.name}
                  nickname={newPlayer.nickname}
                  birthDate={newPlayer.birthDate}
                  isGuest={newPlayer.isGuest}
                  onChange={handleChange}
                  onGuestChange={(checked) => setNewPlayer({ isGuest: checked })}
                  errors={errors}
                />
              </motion.div>

              <motion.div
                key="sport-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: 0.1 }}
              >
                <PlayerSportInfo
                  sport={newPlayer.sport}
                  selectedPositions={newPlayer.selectedPositions}
                  onSportChange={handleSelectChange}
                  onPositionChange={handlePositionChange}
                  errors={errors}
                />
              </motion.div>

              <motion.div
                key="rating-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: 0.2 }}
              >
                <PlayerRating
                  rating={newPlayer.rating}
                  ratingSystem={ratingSystem}
                  onRatingChange={handleRatingChange}
                  error={errors.rating}
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-end"
            >
              <Button 
                type="submit"
                className="w-full md:w-auto gap-2"
                aria-label="Salvar jogador"
              >
                <Save className="h-4 w-4" />
                Salvar Jogador
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PlayerForm;