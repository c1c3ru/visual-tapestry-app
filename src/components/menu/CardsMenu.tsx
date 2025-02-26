import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/player/new', label: 'Cadastrar Jogador', icon: '👤' },
  { path: '/players', label: 'Lista de Jogadores', icon: '📋' },
  { path: '/teams/draw', label: 'Sorteio de Times', icon: '🎲' },
  { path: '/presence', label: 'Lista de Presença', icon: '✓' },
  { path: '/statistics', label: 'Estatísticas', icon: '📊' },
  { path: '/championship', label: 'Campeonato', icon: '🏆' }
];

const MotionLink = motion(Link);

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

const MenuCard = ({ item, index }) => (
  <MotionLink
    to={item.path}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, ...springConfig }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md 
               transition-all duration-200 ease-out focus:outline-none 
               focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    role="navigation"
    aria-label={`Ir para ${item.label}`}
  >
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full 
                      bg-blue-50 text-xl transition-colors duration-200
                      group-hover:bg-blue-100">
        {item.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
        <p className="text-sm text-gray-500 mt-1">Clique para acessar</p>
      </div>
    </div>
  </MotionLink>
);

export const CardsMenu = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {menuItems.map((item, index) => (
        <MenuCard key={item.path} item={item} index={index} />
      ))}
    </div>
  );
};