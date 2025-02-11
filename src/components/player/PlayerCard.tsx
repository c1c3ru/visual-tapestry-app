
import React from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from "@/utils/types";
import clsx from "clsx";

interface PlayerCardProps {
  player: Player;
  guestHighlight: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  editValue: string;
  onEditSave: (id: number, value: string) => void;
  setEditValue: (value: string) => void;
}

export const PlayerCard = ({ 
  player, 
  guestHighlight, 
  onEdit, 
  onDelete,
  isEditing,
  editValue,
  onEditSave,
  setEditValue
}: PlayerCardProps) => {
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

  const handleSave = () => {
    onEditSave(player.id, editValue);
  };

  const handleCancel = () => {
    setEditValue(player.name);
    onEdit(player.id);
  };

  return (
    <Card className={getGuestHighlightClass(player.isGuest)}>
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="max-w-[200px]"
              />
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button onClick={handleCancel} size="sm" variant="ghost">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          ) : (
            player.name
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Apelido: {player.nickname}</p>
          <p>Esporte: {player.sport}</p>
          <p>Posições: {player.selectedPositions.join(", ")}</p>
          <p>Avaliação: {player.rating}</p>
          <p>Status: {player.isGuest ? "Convidado" : "Membro"}</p>
          
          {!isEditing && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
