
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player } from "@/utils/types";
import clsx from "clsx";

interface PlayerCardProps {
  player: Player;
  guestHighlight: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PlayerCard = ({ player, guestHighlight, onEdit, onDelete }: PlayerCardProps) => {
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
    <Card className={getGuestHighlightClass(player.isGuest)}>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Apelido: {player.nickname}</p>
          <p>Esporte: {player.sport}</p>
          <p>Posições: {player.selectedPositions.join(", ")}</p>
          <p>Avaliação: {player.rating}</p>
          <p>Status: {player.isGuest ? "Convidado" : "Membro"}</p>
          
          <div className="flex gap-2 mt-4">
            <Button onClick={() => onEdit(player.id)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button onClick={() => onDelete(player.id)} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Remover
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
