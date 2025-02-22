import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { Button } from '@/components/ui/button';
import {
  Users,
  Trophy,
  BarChart,
  Settings,
  ChevronRight,
} from 'lucide-react';

const MotionDiv = motion.div;

const menuItems = [
  {
    title: 'Jogadores',
    icon: Users,
    path: '/players',
    description: 'Gerenciar jogadores e presenças',
  },
  {
    title: 'Campeonatos',
    icon: Trophy,
    path: '/tournaments',
    description: 'Organizar torneios e competições',
  },
  {
    title: 'Estatísticas',
    icon: BarChart,
    path: '/statistics',
    description: 'Visualizar dados e relatórios',
  },
  {
    title: 'Configurações',
    icon: Settings,
    path: '/settings',
    description: 'Ajustar preferências do sistema',
  },
];

export const DashboardMenu = () => {
  const router = useRouter();
  const { setCurrentPage, setDashboardTitle } = useDashboardStore();

  const handleNavigation = (path: string, title: string) => {
    setCurrentPage(path);
    setDashboardTitle(title);
    router.push(path);
  };

  return (
    <MotionDiv
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <MotionDiv
            key={item.path}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="w-full h-full p-6 flex items-center justify-between hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleNavigation(item.path, item.title)}
            >
              <div className="flex items-center space-x-4">
                <Icon className="h-6 w-6" />
                <div className="text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </MotionDiv>
        );
      })}
    </MotionDiv>
  );
};

export default DashboardMenu;
