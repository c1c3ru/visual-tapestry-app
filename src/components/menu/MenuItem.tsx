import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { springConfig } from '../../utils/animations';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  description: string;
}


const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, ...springConfig }}
  >
    <Link 
      to={item.route} 
      className="focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-xl"
      aria-label={`Acessar ${item.title}`}
    >
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card 
          className="p-6 hover:shadow-lg transition-all duration-200 bg-white/90 backdrop-blur
                     group hover:border-teal-100 relative overflow-hidden"
        >
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-50
                          group-hover:bg-teal-100 transition-colors duration-200">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1.5">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
        </Card>
      </motion.div>
    </Link>
  </motion.div>
);

export const Menu = () => {
  const menuItems: MenuItem[] = [
    { 
      title: 'Cadastrar Jogador', 
      route: '/player/new',
      icon: '👤',
      description: 'Adicione novos jogadores ao sistema'
    },
    { 
      title: 'Lista de Jogadores', 
      route: '/players',
      icon: '📋',
      description: 'Visualize e gerencie todos os jogadores'
    },
    { 
      title: 'Sorteio de Times', 
      route: '/teams/draw',
      icon: '🎲',
      description: 'Sorteie times equilibrados automaticamente'
    },
    { 
      title: 'Lista de Presença', 
      route: '/presence',
      icon: '✓',
      description: 'Controle a presença dos jogadores'
    },
    { 
      title: 'Estatísticas', 
      route: '/statistics',
      icon: '📊',
      description: 'Visualize estatísticas e desempenho'
    },
    { 
      title: 'Campeonato', 
      route: '/championship',
      icon: '🏆',
      description: 'Gerencie campeonatos e torneios'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menuItems.map((item, index) => (
        <MenuCard key={item.route} item={item} index={index} />
      ))}
    </div>
  );
};