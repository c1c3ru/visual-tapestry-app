import React from "react";
import { motion } from "framer-motion";
import { Check, DollarSign, UserCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackToDashboard } from "./BackToDashboard";
import { DynamicTitle } from "./DynamicTitle";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Player } from "@/utils/types";
import clsx from "clsx";

interface FormElements extends HTMLFormControlsCollection {
  newPlayerName: HTMLInputElement;
}

interface AddPlayerForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const isAdmin = true;

  const getGuestHighlightClass = (isGuest: boolean) => {
    if (!isGuest) return "";
    
    return clsx({
      'bg-orange-100': guestHighlight === 'orange',
      'bg-purple-100': guestHighlight === 'purple',
      'bg-pink-100': guestHighlight === 'pink',
      'font-bold': guestHighlight === 'bold',
      'italic': guestHighlight === 'italic',
    });
  };

  const handleAddPlayer = (e: React.FormEvent<AddPlayerForm>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newPlayerName = form.elements.newPlayerName.value.trim();
    if (!newPlayerName) {
      toast({
        title: "Erro",
        description: "O nome do jogador não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    const playerExists = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (playerExists) {
      toast({
        title: "Erro",
        description: "Jogador já está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      name: newPlayerName,
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "",
      selectedPositions: [],
      rating: 1 as Rating, // Changed from 0 to 1 to match Rating type
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: false,
      paid: false,
      registered: true,
      selected: false,
    };

    addPlayer(newPlayer);
    toast({
      title: "Jogador Adicionado",
      description: "Novo jogador foi adicionado com sucesso.",
    });
  };

  const togglePresence = (id: number) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      updatePlayer(id, { present: !player.present });
      toast({
        title: "Presença atualizada",
        description: "Status de presença foi atualizado com sucesso.",
      });
    }
  };

  const togglePayment = (id: number) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      updatePlayer(id, { paid: !player.paid });
      toast({
        title: "Pagamento atualizado",
        description: "Status de pagamento foi atualizado com sucesso.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <BackToDashboard />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>

        {isAdmin && (
          <form onSubmit={handleAddPlayer} className="mb-8">
            <div className="flex gap-4">
              <Input
                name="newPlayerName"
                placeholder="Digite o nome do novo jogador..."
              />
              <Button type="submit">Adicionar Jogador</Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                "flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors",
                getGuestHighlightClass(player.isGuest)
              )}
            >
              <div className="flex items-center gap-3">
                <UserCheck
                  className={`h-5 w-5 ${
                    player.registered ? "text-primary" : "text-gray-400"
                  }`}
                />
                <span className="font-medium text-gray-800">{player.name}</span>
              </div>

              <div className="flex items-center gap-6">
                {isAdmin ? (
                  <>
                    <Button
                      onClick={() => togglePayment(player.id)}
                      variant={player.paid ? "default" : "destructive"}
                      className="flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>{player.paid ? "Pago" : "Pendente"}</span>
                    </Button>

                    <Button
                      onClick={() => togglePresence(player.id)}
                      variant={player.present ? "default" : "secondary"}
                      className="flex items-center gap-2"
                    >
                      {player.present ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Presente</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          <span>Ausente</span>
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        className={`h-5 w-5 ${
                          player.paid ? "text-green-500" : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          player.paid ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {player.paid ? "Pago" : "Pendente"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {player.present ? (
                        <>
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-primary">Presente</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400">Ausente</span>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PresenceList;