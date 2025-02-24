
import { SportEnum } from "@/utils/types";
import { Futbol, Basketball, Volleyball } from "lucide-react";

export const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: Futbol,
  [SportEnum.FOOTBALL]: Futbol,
  [SportEnum.VOLLEYBALL]: Volleyball,
  [SportEnum.BASKETBALL]: Basketball,
  [SportEnum.HANDBALL]: Volleyball,
};

export default SportsIcons;
