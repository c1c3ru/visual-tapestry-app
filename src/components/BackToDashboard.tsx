
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToDashboard = () => {
  const location = useLocation();
  
  // Don't render if already on menu or if another BackToDashboard is rendered by a parent component
  const isMenuPage = location.pathname === '/menu' || location.pathname === '/';
  
  if (isMenuPage) {
    return null;
  }

  return (
    <Link
      to="/menu"
      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
      id="back-to-dashboard-button" // Add ID to check for duplicates
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Voltar ao Menu Principal</span>
    </Link>
  );
};

export default BackToDashboard;
