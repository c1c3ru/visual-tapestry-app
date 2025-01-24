import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, DollarSign, UserCheck, X } from "lucide-react";
import { Player } from "@/utils/types";
import { motion } from "framer-motion";
import clsx from "clsx";

interface PresenceListItemProps {
  player: Player;
  isAdmin: boolean;
  guestHighlight: string;
  onTogglePresence: (id: number) => void;
  onTogglePayment: (id: number) => void;
}

export const PresenceListItem: React.FC<PresenceListItemProps> = ({
  player,
  isAdmin,
  guestHighlight,
  onTogglePresence,
  onTogglePayment,
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors",
        getGuestHighlightClass(player.isGuest)
      )}
    >
      <div className="flex items-center gap-3">
        <UserCheck
          className={`h-5 w-5 ${
            player.registered ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <span className="font-medium">{player.name}</span>
      </div>

      <div className="flex items-center gap-6">
        {isAdmin ? (
          <>
            <Button
              onClick={() => onTogglePayment(player.id)}
              variant={player.paid ? "default" : "destructive"}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              <span>{player.paid ? "Pago" : "Pendente"}</span>
            </Button>

            <Button
              onClick={() => onTogglePresence(player.id)}
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
                  player.paid ? "text-green-500" : "text-destructive"
                }`}
              />
              <span
                className={`text-sm ${
                  player.paid ? "text-green-500" : "text-destructive"
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
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ausente</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};