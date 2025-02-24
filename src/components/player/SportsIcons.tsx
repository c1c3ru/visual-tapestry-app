
import { SportEnum } from "@/utils/types";
import { Football, Basketball } from "lucide-react";

export const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: Football,
  [SportEnum.FOOTBALL]: Football,
  [SportEnum.VOLLEYBALL]: Basketball,
  [SportEnum.BASKETBALL]: Basketball,
  [SportEnum.HANDBALL]: Basketball,
};

export default SportsIcons;
