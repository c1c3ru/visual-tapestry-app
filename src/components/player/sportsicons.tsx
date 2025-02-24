import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; // Futebol
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball"; // Basquete
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball"; // Vôlei
import SportsHandballIcon from "@mui/icons-material/SportsHandball"; // Handebol
import { Box } from "@mui/material"; // Componente de layout do MUI

interface SportsIconsProps {
  sport: string; // Nome do esporte (ex.: "futsal", "futebol", "volei", etc.)
}

export const SportsIcons: React.FC<SportsIconsProps> = ({ sport }) => {
  // Mapeie os esportes para seus respectivos ícones
  const getIcon = () => {
    switch (sport.toLowerCase()) {
      case "futsal":
      case "futebol":
        return <SportsSoccerIcon sx={{ color: "green", fontSize: 24 }} />;
      case "basquete":
        return <SportsBasketballIcon sx={{ color: "orange", fontSize: 24 }} />;
      case "volei":
        return <SportsVolleyballIcon sx={{ color: "blue", fontSize: 24 }} />;
      case "handbol":
        return <SportsHandballIcon sx={{ color: "purple", fontSize: 24 }} />;
      default:
        return <span>❓</span>; // Ícone padrão para esportes não mapeados
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {getIcon()}
    </Box>
  );
};