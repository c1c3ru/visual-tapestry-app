import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/utils/types';
import { Edit2, Trash2, Save, X, User, Sword, Star, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import clsx from "clsx";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface PlayerCardProps {
  player: Player;
  guestHighlight: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  editValue: string;
  onEditSave: (id: string, value: string) => void;
  setEditValue: (value: string) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  guestHighlight, 
  onEdit, 
  onDelete,
  isEditing,
  editValue,
  onEditSave,
  setEditValue
}) => {
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
    
    return clsx(
      'transition-all duration-200',
      {
        'border-2 border-orange-500': guestHighlight === 'orange',
        'border-2 border-purple-500': guestHighlight === 'purple',
        'border-2 border-pink-500': guestHighlight === 'pink',
        'font-bold bg-gradient-to-r from-gray-100 to-white': guestHighlight === 'bold',
        'italic bg-gray-50': guestHighlight === 'italic',
      }
    );
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Input
          value={editForm.name}
          onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Nome"
        />
        <Input
          value={editForm.nickname}
          onChange={(e) => setEditForm((prev) => ({ ...prev, nickname: e.target.value }))}
          placeholder="Apelido"
        />
        <Select
          value={editForm.sport}
          onValueChange={(value) => setEditForm((prev) => ({ ...prev, sport: value as any }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Esporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="futsal">Futsal</SelectItem>
            <SelectItem value="futebol">Futebol</SelectItem>
            <SelectItem value="volei">Vôlei</SelectItem>
            <SelectItem value="basquete">Basquete</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={editForm.rating}
          onChange={(e) => setEditForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
          placeholder="Avaliação"
        />
        <Checkbox
          checked={editForm.isGuest}
          onCheckedChange={(checked) => setEditForm((prev) => ({ ...prev, isGuest: !!checked }))}
        />
        <Button onClick={handleSave}>Salvar</Button>
        <Button onClick={handleCancel} variant="secondary">
          Cancelar
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springConfig}
    >
      <Card className={clsx(getGuestHighlightClass(player.isGuest), "hover:shadow-lg transition-shadow")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            {player.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <Sword className="h-4 w-4" />
              <span>Apelido: {player.nickname}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Esporte: {player.sport}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Posições: {player.selectedPositions.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Avaliação: {player.rating}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Status: {player.isGuest ? "Convidado" : "Membro"}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => onEdit(player.id)}
                  variant="outline"
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar Jogador</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => onDelete(player.id)} 
                  variant="destructive"
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remover</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remover Jogador</TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
