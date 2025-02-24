
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

const PresenceList = () => {
  const { players, addPlayer, updatePlayer } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const isAdmin = true;

  const handleTogglePresence = (id: string) => {
    const player = players.find(p => p.id === id);
    if (player) {
      updatePlayer(id, { present: !player.present });
      toast({
        description: "Status de presença foi atualizado com sucesso.",
      });
    }
  };

  const handleTogglePayment = (id: string) => {
    const player = players.find(p => p.id === id);
    if (player) {
      updatePlayer(id, { paid: !player.paid });
      toast({
        description: "Status de pagamento foi atualizado com sucesso.",
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
        <PresenceHeader>
          <h1 className="text-2xl font-bold">Lista de Presença</h1>
        </PresenceHeader>
        
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
                    isAdmin={isAdmin}
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
