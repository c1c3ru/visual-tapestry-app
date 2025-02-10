
import React from "react";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Player, Rating } from "@/utils/types";
import { RatingInput } from "./player/RatingInput";
import { PlayerHeader } from "./player/PlayerHeader";
import { PlayerBasicInfo } from "./player/PlayerBasicInfo";
import { PlayerSportSelection } from "./player/PlayerSportSelection";
import { PlayerPositions } from "./player/PlayerPositions";

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm } = usePlayerStore();
  const { ratingSystem } = useSettingsStore();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPlayer({ [name]: type === "checkbox" ? checked : value });
    toast({
      title: "Campo Atualizado",
      description: `O campo ${name} foi atualizado.`,
    });
  };

  const handleSelectChange = (value: string) => {
    setNewPlayer({ sport: value as any, selectedPositions: [] });
    toast({
      title: "Esporte Selecionado",
      description: `${value} foi selecionado como esporte.`,
    });
  };

  const handlePositionChange = (position: string, checked: boolean) => {
    if (checked) {
      setNewPlayer({ selectedPositions: [position] });
      toast({
        title: "Posição selecionada",
        description: `${position} foi selecionada como posição.`,
      });
    } else {
      setNewPlayer({ selectedPositions: [] });
    }
  };

  const handleRatingChange = (newRating: Rating) => {
    setNewPlayer({ rating: newRating });
    toast({
      title: "Avaliação Atualizada",
      description: `Nova avaliação: ${newRating}`,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: newPlayer.name.trim() === "",
      isGuest: newPlayer.isGuest === null,
      selectedPositions: newPlayer.selectedPositions.length === 0,
      rating: newPlayer.rating === 0 as Rating,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const player: Player = {
      ...newPlayer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    addPlayer(player);
    resetForm();
    
    toast({
      title: "Sucesso!",
      description: "Jogador cadastrado com sucesso!",
      variant: "default",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <PlayerHeader />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PlayerBasicInfo
            name={newPlayer.name}
            nickname={newPlayer.nickname}
            birthDate={newPlayer.birthDate}
            isGuest={newPlayer.isGuest}
            onChange={handleChange}
            onGuestChange={(checked) => setNewPlayer({ isGuest: checked })}
            errors={errors}
          />

          <PlayerSportSelection
            sport={newPlayer.sport}
            onSportChange={handleSelectChange}
          />

          <div>
            <PlayerPositions
              sport={newPlayer.sport}
              selectedPositions={newPlayer.selectedPositions}
              onPositionChange={handlePositionChange}
            />
            {errors.selectedPositions && (
              <p className="text-red-500">Escolher pelo menos uma posição é obrigatório.</p>
            )}
          </div>

          <div>
            <RatingInput
              ratingSystem={ratingSystem}
              rating={newPlayer.rating}
              onRatingChange={handleRatingChange}
            />
            {errors.rating && <p className="text-red-500">Avaliação é obrigatória.</p>}
          </div>

          <Button 
            type="submit"
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default PlayerForm;
