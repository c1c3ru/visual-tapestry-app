
import React from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { 
  Player,
  SportEnum,
  PositionEnum,
  RatingEnum,
  FormErrors 
} from "@/utils/types";
import { PlayerBasicInfo } from "./player/PlayerBasicInfo";
import { PlayerSportInfo } from "./player/PlayerSportInfo";
import { PlayerRating } from "./player/PlayerRating";
import { PlayerHeader } from "./player/PlayerHeader";
import { Card } from "@/components/ui/card";

const PlayerForm = () => {
  const { addPlayer, newPlayer, setNewPlayer, errors, setErrors, resetForm } = usePlayerStore();
  const { ratingSystem } = useSettingsStore();
  const { toast } = useToast();

  const validateForm = () => {
    const basicErrors = {
      name: !newPlayer.name.trim(),
      isGuest: newPlayer.isGuest === null,
    };

    const sportErrors = {
      selectedPositions: newPlayer.selectedPositions.length === 0,
    };

    const formErrors: FormErrors = {
      name: { 
        hasError: basicErrors.name, 
        message: "Nome é obrigatório" 
      },
      isGuest: { 
        hasError: basicErrors.isGuest, 
        message: "Selecione o status de convidado" 
      },
      selectedPositions: { 
        hasError: sportErrors.selectedPositions, 
        message: "Selecione ao menos uma posição" 
      },
      rating: { 
        hasError: newPlayer.rating < 1, 
        message: "Avaliação é obrigatória" 
      }
    };

    setErrors(formErrors);
    return !Object.values(formErrors).some(error => error.hasError);
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
      id: crypto.randomUUID(),
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <PlayerHeader />
        
        <Card className="mt-6 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PlayerBasicInfo
              name={newPlayer.name}
              nickname={newPlayer.nickname}
              birthDate={newPlayer.birthDate}
              isGuest={newPlayer.isGuest}
              onChange={(e) => setNewPlayer({ [e.target.name]: e.target.value })}
              onGuestChange={(checked) => setNewPlayer({ isGuest: checked })}
              errors={errors}
            />

            <PlayerSportInfo
              sport={newPlayer.sport}
              selectedPositions={newPlayer.selectedPositions}
              onSportChange={(sport) => {
                setNewPlayer({ sport, selectedPositions: [] });
              }}
              onPositionChange={(position, checked) => {
                const positions = checked
                  ? [...newPlayer.selectedPositions, position]
                  : newPlayer.selectedPositions.filter(p => p !== position);
                setNewPlayer({ selectedPositions: positions });
              }}
              errors={errors}
            />

            <PlayerRating
              rating={newPlayer.rating}
              ratingSystem={ratingSystem}
              onRatingChange={(rating) => setNewPlayer({ rating })}
              error={errors.rating.hasError}
            />

            <Button 
              type="submit"
              className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90"
            >
              <Save className="h-4 w-4" />
              Salvar Jogador
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PlayerForm;
