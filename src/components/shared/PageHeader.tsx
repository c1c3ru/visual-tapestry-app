
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackToDashboard from "@/components/BackToDashboard";
import { User, ListChecks, Shuffle, Trophy } from "lucide-react";

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface PageHeaderProps {
  pageName: "player" | "presence" | "draw" | "championship";
}

const pageConfigs = {
  player: {
    title: "Cadastrar Novo Jogador",
    icon: User,
    colors: {
      gradient: "from-blue-50 to-teal-50",
      border: "border-teal-500",
      icon: "text-teal-600",
      iconBg: "bg-teal-100",
      textGradient: "from-teal-600 to-blue-600"
    }
  },
  presence: {
    title: "Lista de Presença",
    icon: ListChecks,
    colors: {
      gradient: "from-purple-50 to-blue-50",
      border: "border-purple-500",
      icon: "text-purple-600",
      iconBg: "bg-purple-100",
      textGradient: "from-purple-600 to-blue-600"
    }
  },
  draw: {
    title: "Sorteio de Times",
    icon: Shuffle,
    colors: {
      gradient: "from-green-50 to-blue-50",
      border: "border-green-500",
      icon: "text-green-600",
      iconBg: "bg-green-100",
      textGradient: "from-green-600 to-blue-600"
    }
  },
  championship: {
    title: "Campeonato",
    icon: Trophy,
    colors: {
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-500",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
      textGradient: "from-amber-600 to-orange-600"
    }
  }
};

export const PageHeader: React.FC<PageHeaderProps> = ({ pageName }) => {
  const config = pageConfigs[pageName];
  const IconComponent = config.icon;

  return (
    <div className="mb-6 space-y-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springConfig}
        >
          <BackToDashboard />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <Card className={`hover:shadow-lg transition-shadow bg-gradient-to-r ${config.colors.gradient} border-b-4 ${config.colors.border}`}>
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className={`p-3 ${config.colors.iconBg} rounded-full`}>
              <IconComponent className={`h-6 w-6 ${config.colors.icon}`} />
            </div>
            <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${config.colors.textGradient} bg-clip-text text-transparent`}>
              {config.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};
