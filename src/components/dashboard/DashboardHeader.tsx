import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDashboardStore } from '@/stores/useDashboardStore';

interface DashboardHeaderProps {
  isAdmin: boolean;
  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
}

export const DashboardHeader = ({ isAdmin, dashboardTitle, setDashboardTitle }: DashboardHeaderProps) => {
  const { isEditing, newTitle, setIsEditing, setNewTitle } = useDashboardStore();

  const handleTitleEdit = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem editar o título");
      return;
    }
    setIsEditing(true);
  };

  const handleTitleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle !== dashboardTitle) {
      setDashboardTitle(newTitle);
      toast.success("Título atualizado com sucesso!");
    }
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setIsEditing(false);
    setNewTitle(dashboardTitle);
  };

  return (
    <div className="flex items-center justify-between mb-8">
      {isEditing ? (
        <form onSubmit={handleTitleSave} className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-2xl font-bold bg-white border border-teal-200 rounded px-2 py-1"
            autoFocus
          />
          <Button type="submit" size="sm">Salvar</Button>
          <Button type="button" size="sm" onClick={handleTitleCancel}>Cancelar</Button>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{dashboardTitle}</h1>
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTitleEdit}
              className="text-teal-600 hover:text-teal-700"
            >
              <Edit2 className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};