import React from "react";

// Importe os ícones necessários (você pode usar bibliotecas como Lucide, FontAwesome ou criar seus próprios SVGs)
import { Football, Basketball, Volleyball, Handball } from "lucide-react";

interface SportsIconsProps {
  sport: string; // Nome do esporte (ex.: "futsal", "futebol", "volei", etc.)
}

export const SportsIcons: React.FC<SportsIconsProps> = ({ sport }) => {
  // Mapeie os esportes para seus respectivos ícones
  const getIcon = () => {
    switch (sport.toLowerCase()) {
      case "futsal":
      case "futebol":
        return <Football className="h-6 w-6 text-green-600" />;
      case "basquete":
        return <Basketball className="h-6 w-6 text-orange-500" />;
      case "volei":
        return <Volleyball className="h-6 w-6 text-blue-500" />;
      case "handbol":
        return <Handball className="h-6 w-6 text-purple-600" />;
      default:
        return <span>❓</span>; // Ícone padrão para esportes não mapeados
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};