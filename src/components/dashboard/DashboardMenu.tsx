
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

interface MenuItem {
  title: string;
  route: string;
  icon: string;
  description: string;
}

export const DashboardMenu = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link to={item.route}>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
