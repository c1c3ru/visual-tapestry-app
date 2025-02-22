
import React from "react";
import { Trophy, CircleDot, Dumbbell } from "lucide-react";
import { SportEnum } from "@/utils/types";

export interface SportsIconsProps {
  sport: SportEnum | string;
  className?: string;
  position?: string;
}

export const SportsIcons: React.FC<SportsIconsProps> = ({ sport, className, position }) => {
  const getIcon = () => {
    if (position) {
      return <Trophy className={className || "h-6 w-6 text-green-600"} />;
    }

    switch (sport.toUpperCase()) {
      case SportEnum.FUTSAL:
      case SportEnum.FOOTBALL:
        return <Trophy className={className || "h-6 w-6 text-green-600"} />;
      case SportEnum.BASKETBALL:
      case SportEnum.VOLLEYBALL:
        return <CircleDot className={className || "h-6 w-6 text-orange-500"} />;
      case SportEnum.HANDBALL:
        return <Dumbbell className={className || "h-6 w-6 text-purple-600"} />;
      default:
        return <span>❓</span>;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};
