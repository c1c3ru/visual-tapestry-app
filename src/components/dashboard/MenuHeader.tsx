import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

interface MenuHeaderProps {
  menuTitle: string;
  isAdmin: boolean;
  setMenuTitle: (title: string) => void;
}

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  menuTitle,
  isAdmin,
  setMenuTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(menuTitle);

  const handleEditStart = () => {
    setNewTitle(menuTitle);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newTitle.trim() === '') {
      toast.error('O título não pode estar vazio');
      return;
    }
    
    setMenuTitle(newTitle);
    setIsEditing(false);
    toast.success('Título atualizado com sucesso!');
  };

  const handleCancel = () => {
    setNewTitle(menuTitle);
    setIsEditing(false);
  };

  return (
    <div className="mb-8 relative">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={springTransition}
            className="flex items-center gap-4"
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-4xl font-bold bg-transparent border-b-2 border-gray-300 
                         focus:border-teal-500 focus:outline-none pb-1 pr-12
                         transition-colors duration-200"
              autoFocus
              aria-label="Editar título do menu"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                aria-label="Salvar alterações"
              >
                <Check className="h-5 w-5 text-teal-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                aria-label="Cancelar edição"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="view-mode"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={springTransition}
            className="group relative"
          >
            <h1 className="text-4xl font-bold text-gray-800 inline-block">
              {menuTitle}
            </h1>
            {isAdmin && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditStart}
                className="absolute -right-12 top-2 text-teal-600 hover:text-teal-700 
                           transition-colors duration-200"
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