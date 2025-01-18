import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, StarHalf, Edit2, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');
  
  // Mock admin check - replace with your actual auth logic
  const isAdmin = true;

  const handleTitleEdit = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem editar o título");
      return;
    }
    setIsEditing(true);
  };

  const handleTitleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Título atualizado com sucesso!");
  };

  const menuItems = [
    { title: 'Cadastrar Jogador', route: '/player/new' },
    { title: 'Lista de Jogadores', route: '/players' },
    { title: 'Sorteio de Times', route: '/teams/draw' },
    { title: 'Lista de Presença', route: '/presence' },
    { title: 'Estatísticas', route: '/statistics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {isEditing ? (
            <form onSubmit={handleTitleSave} className="flex gap-2">
              <input
                type="text"
                value={dashboardTitle}
                onChange={(e) => setDashboardTitle(e.target.value)}
                className="text-2xl font-bold bg-white border border-teal-200 rounded px-2 py-1"
                autoFocus
              />
              <Button type="submit" size="sm">Salvar</Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <motion.div
              key={item.route}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={item.route}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <div className="h-1 w-20 bg-primary rounded-full" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Star Rating Demo */}
        <motion.div 
          className="mt-8 p-6 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Sistema de Avaliação</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className="text-primary hover:text-primary/80"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toast.success(`${star} estrelas selecionadas!`)}
              >
                <Star className="h-8 w-8" />
              </motion.button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Clique uma vez para meia estrela, duas vezes para estrela completa
          </p>
        </motion.div>

        {/* Guest Player Example */}
        <motion.div 
          className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <User className="text-orange-500" />
            <span className="text-orange-800 font-medium">Exemplo de Jogador Convidado</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;