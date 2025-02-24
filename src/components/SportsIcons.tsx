import React from "react";
import { SportEnum } from "@/utils/enums";
import { SportsIcons } from "@/utils/sportsIcons"; // Importe o objeto de constantes

interface SportsIconProps {
  sport: SportEnum; // Nome do esporte (usando o enum)
  className?: string; // Classes adicionais para estilização
}

const SportsIcon: React.FC<SportsIconProps> = ({ sport, className }) => {
  const IconComponent = SportsIcons[sport]; // Obtém o ícone correspondente ao esporte

  if (!IconComponent) {
    return <span>❓</span>; // Ícone padrão para esportes não mapeados
  }

  // Renderiza o ícone com a classe passada
  return <IconComponent className={className} />;
};

export default SportsIcon;