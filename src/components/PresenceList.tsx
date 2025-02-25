import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { PresenceHeader } from "./presence/PresenceHeader";
import { AddPlayerForm } from "./presence/AddPlayerForm";
import { PresenceListItem } from "./presence/PresenceListItem";
import { Player } from "@/utils/types";

const PresenceList = () => {
  const { players, updatePlayer } = usePlayerStore();
  const addPlayer = async (player: Player): Promise<void> => {
    usePlayerStore.getState().addPlayer(player);
  };
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const isAdmin = true;

  const handleTogglePresence = (id: string) => {
    const player = players.find(p => p.id === id);
    if (player) {
      updatePlayer(id, { present: !player.present });
      toast({
        title: player.present ? "Presença Removida" : "Presença Confirmada",
        description: `${player.name} foi marcado como ${player.present ? "ausente" : "presente"}.`
      });
    }
  };

  const handleTogglePayment = (id: string) => {
    const player = players.find(p => p.id === id);
    if (player) {
      updatePlayer(id, { paid: !player.paid });
      toast({
        title: player.paid ? "Pagamento Pendente" : "Pagamento Confirmado",
        description: `${player.name} foi marcado como ${player.paid ? "não pago" : "pago"}.`
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-4xl mx-auto">
        <PresenceHeader />
        
        <Card>
          <CardContent className="p-6">
            {isAdmin && (
              <AddPlayerForm onAddPlayer={addPlayer} players={players} />
            )}
            
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {players.map((player) => (
                  <PresenceListItem
                    key={player.id}
                    player={player}
                    isAdmin={true}
                    guestHighlight={guestHighlight}
                    onTogglePresence={handleTogglePresence}
                    onTogglePayment={handleTogglePayment}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PresenceList;
