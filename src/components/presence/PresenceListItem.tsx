import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, DollarSign, UserCheck, X, User } from "lucide-react";
import { Player } from "@/utils/types";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

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
    
    return clsx(
      'border-l-4 transition-all',
      {
        'border-orange-500 bg-orange-50': guestHighlight === 'orange',
        'border-purple-500 bg-purple-50': guestHighlight === 'purple',
        'border-pink-500 bg-pink-50': guestHighlight === 'pink',
        'font-bold border-gray-200': guestHighlight === 'bold',
        'italic border-gray-200': guestHighlight === 'italic',
      }
    );
  };

  const StatusIndicator = ({ paid, present }: { paid: boolean; present: boolean }) => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <DollarSign
            className={clsx(
              "h-5 w-5",
              paid ? "text-green-600" : "text-red-600"
            )}
          />
          <div className="absolute -right-1 -top-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: paid ? 1 : 0 }}
              className="h-2 w-2 rounded-full bg-green-600"
            />
          </div>
        </motion.div>
        <span className={clsx(
          "text-sm font-medium",
          paid ? "text-green-600" : "text-red-600"
        )}>
          {paid ? "Pago" : "Pendente"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          {present ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : (
            <X className="h-5 w-5 text-red-600" />
          )}
        </motion.div>
        <span className={clsx(
          "text-sm font-medium",
          present ? "text-green-600" : "text-red-600"
        )}>
          {present ? "Presente" : "Ausente"}
        </span>
      </div>
    </div>
  );

  const AdminControls = () => (
    <div className="flex items-center gap-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => onTogglePayment(player.id)}
          variant={player.paid ? "default" : "destructive"}
          className="gap-2"
          aria-label={`Marcar pagamento como ${player.paid ? "pendente" : "pago"}`}
        >
          <DollarSign className="h-4 w-4" />
          {player.paid ? "Pago" : "Pendente"}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => onTogglePresence(player.id)}
          variant={player.present ? "default" : "secondary"}
          className="gap-2"
          aria-label={`Marcar presença como ${player.present ? "ausente" : "presente"}`}
        >
          {player.present ? (
            <>
              <Check className="h-4 w-4" />
              Presente
            </>
          ) : (
            <>
              <X className="h-4 w-4" />
              Ausente
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={springConfig}
      className={clsx(
        "flex items-center justify-between p-4 rounded-lg shadow-sm",
        "hover:shadow-md transition-all duration-200",
        getGuestHighlightClass(player.isGuest)
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <motion.div whileHover={{ rotate: 10 }} className="relative">
          <UserCheck
            className={clsx(
              "h-6 w-6",
              player.registered ? "text-blue-600" : "text-gray-400"
            )}
          />
          {player.isGuest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 bg-yellow-500 text-white rounded-full p-0.5"
            >
              <User className="h-3 w-3" />
            </motion.div>
          )}
        </motion.div>
        
        <span className="font-medium truncate">{player.name}</span>
      </div>

      <AnimatePresence mode="wait">
        {isAdmin ? (
          <AdminControls />
        ) : (
          <StatusIndicator paid={player.paid} present={player.present} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};