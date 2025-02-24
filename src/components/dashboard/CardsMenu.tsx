
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

export const CardsMenu = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={item.path}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-lg font-medium text-gray-800">{item.label}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
