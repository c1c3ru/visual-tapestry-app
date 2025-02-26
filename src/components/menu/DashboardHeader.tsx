import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { springConfig } from '../../utils/animations';

interface DashboardHeaderProps {
  isAdmin: boolean;
  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
}


export const DashboardHeader = ({ 
  isAdmin, 
  dashboardTitle, 
  setDashboardTitle 
}: DashboardHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(dashboardTitle);

  const handleTitleEdit = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem editar o título");
      return;
    }
    setIsEditing(true);
  };

  const handleTitleSave = () => {
    if (newTitle.trim() === "") {
      toast.error("O título não pode estar vazio");
      return;
    }
    
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
    <div className="flex items-center justify-between mb-8 px-4">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={springTransition}
            className="flex gap-3 items-center w-full"
          >
            <motion.input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-2xl font-bold bg-white border-2 border-teal-100 rounded-lg px-4 py-2
                         focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                         transition-all duration-200 w-full max-w-xl"
              autoFocus
              aria-label="Editar título do dashboard"
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            />
            <div className="flex gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={handleTitleSave}>
                  Salvar
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" onClick={handleTitleCancel}>
                  Cancelar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springTransition}
            className="flex items-center gap-3 group"
          >
            <h1 className="text-3xl font-bold text-gray-800">{dashboardTitle}</h1>
            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTitleEdit}
                className="text-teal-600 hover:text-teal-700 transition-colors"
                aria-label="Editar título"
              >
                <Edit2 className="h-6 w-6" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};