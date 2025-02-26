
import React from "react";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Player} from "@/utils/types";
import { PositionEnum, RatingEnum } from "@/utils/enums";
import { PlayerBasicInfo } from "./player/PlayerBasicInfo";
import { PlayerSportInfo } from "./player/PlayerSportInfo";
import { PlayerRating } from "./player/PlayerRating";
import { SportEnum } from "@/utils/enums";

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm, players } = usePlayerStore();
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

  const handleSelectChange = (value: SportEnum) => {
    setNewPlayer({ sport: value, selectedPositions: [] });
    toast({
      title: "Esporte Selecionado",
      description: `${value} foi selecionado como esporte.`,
    });
  };

  const handlePositionChange = (position: PositionEnum, checked: boolean) => {
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

  const validateForm = () => {
    const nameExists = players.some(
      p => p.name.toLowerCase() === newPlayer.name.toLowerCase()
    );

    const newErrors = {
      name: {
        hasError: !newPlayer.name.trim() || nameExists,
        message: nameExists ? "Este nome já está cadastrado" : "Nome é obrigatório"
      },
      isGuest: {
        hasError: newPlayer.isGuest === null,
        message: "Selecionar se é convidado ou não"
      },
      selectedPositions: {
        hasError: !newPlayer.selectedPositions.length,
        message: "Selecione pelo menos uma posição"
      },
      rating: {
        hasError: newPlayer.rating === RatingEnum.NONE,
        message: "Avaliação é obrigatória"
      }
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error.hasError);
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
      id: String(Date.now()),
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PlayerBasicInfo
            name={newPlayer.name}
            nickname={newPlayer.nickname}
            birthDate={newPlayer.birthDate instanceof Date ? newPlayer.birthDate.toISOString().split('T')[0] : newPlayer.birthDate}
            isGuest={newPlayer.isGuest}
            onChange={handleChange}
            onGuestChange={(checked) => setNewPlayer({ isGuest: checked })}
            errors={errors}
          />

          <PlayerSportInfo
            sport={newPlayer.sport}
            selectedPositions={newPlayer.selectedPositions}
            onSportChange={handleSelectChange}
            onPositionChange={handlePositionChange}
            errors={errors}
          />

          <PlayerRating
            rating={newPlayer.rating}
            ratingSystem={ratingSystem}
            onRatingChange={(rating) => setNewPlayer({ rating })}
            error={errors.rating}
          />

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
