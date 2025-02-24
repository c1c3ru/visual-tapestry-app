
import React from "react";
import { SportsSoccer, SportsBasketball, SportsVolleyball, SportHandball } from '@mui/icons-material';
import { Box } from "@mui/material";

interface SportsIconsProps {
  sport: string;
  className?: string;
}

export const SportsIcons: React.FC<SportsIconsProps> = ({ sport, className }) => {
  const getIcon = () => {
    switch (sport.toLowerCase()) {
      case "futsal":
      case "futebol":
        return <SportsSoccer sx={{ color: "green" }} className={className} />;
      case "basquete":
        return <SportsBasketball sx={{ color: "orange" }} className={className} />;
      case "volei":
        return <SportsVolleyball sx={{ color: "blue" }} className={className} />;
      case "handbol":
        return <SportHandball sx={{ color: "purple" }} className={className} />;
      default:
        return <span>❓</span>;
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {getIcon()}
    </Box>
  );
};
