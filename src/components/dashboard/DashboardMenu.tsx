import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

interface MenuItem {
  title: string;
  route: string;
}

export const DashboardMenu = () => {
  const menuItems: MenuItem[] = [
    { title: 'Cadastrar Jogador', route: '/player/new' },
    { title: 'Lista de Jogadores', route: '/players' },
    { title: 'Sorteio de Times', route: '/teams/draw' },
    { title: 'Lista de Presença', route: '/presence' },
    { title: 'Estatísticas', route: '/statistics' },
    { title: 'Campeonato', route: '../pages/Championship.tsx' },
  ];

  return (
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
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};