import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToDashboard = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu' || location.pathname === '/';
  
  if (isMenuPage) {
    return null;
  }

  return (
    <Link
      to="/menu"
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar ao Menu Principal</span>
    </Link>
  );
};

export default BackToDashboard;
