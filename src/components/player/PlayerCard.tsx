
import React from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from "@/utils/types";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [editForm, setEditForm] = React.useState({
    name: player.name,
    nickname: player.nickname,
    sport: player.sport,
    selectedPositions: player.selectedPositions,
    rating: player.rating,
    isGuest: player.isGuest
  });

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
    onEditSave(player.id, JSON.stringify(editForm));
  };

  const handleCancel = () => {
    setEditForm({
      name: player.name,
      nickname: player.nickname,
      sport: player.sport,
      selectedPositions: player.selectedPositions,
      rating: player.rating,
      isGuest: player.isGuest
    });
    onEdit(player.id);
  };

  if (isEditing) {
    return (
      <Card className={getGuestHighlightClass(player.isGuest)}>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>Nome</Label>
            <Input
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label>Apelido</Label>
            <Input
              value={editForm.nickname}
              onChange={(e) => setEditForm(prev => ({ ...prev, nickname: e.target.value }))}
            />
          </div>

          <div>
            <Label>Esporte</Label>
            <Select
              value={editForm.sport}
              onValueChange={(value) => setEditForm(prev => ({ ...prev, sport: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futsal">Futsal</SelectItem>
                <SelectItem value="futebol">Futebol</SelectItem>
                <SelectItem value="volei">Vôlei</SelectItem>
                <SelectItem value="basquete">Basquete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Avaliação</Label>
            <Input
              type="number"
              min="1"
              max="5"
              value={editForm.rating}
              onChange={(e) => setEditForm(prev => ({ ...prev, rating: Number(e.target.value) as any }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isGuest"
              checked={editForm.isGuest}
              onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, isGuest: !!checked }))}
            />
            <Label htmlFor="isGuest">É convidado?</Label>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} variant="default">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
