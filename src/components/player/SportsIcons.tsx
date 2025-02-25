
import { SportEnum } from "@/utils/enums";
import { 
  Soccer as Football,
  Basketball,
  Volleyball
} from "lucide-react";

export const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: Football,
  [SportEnum.SOCCER]: Football,
  [SportEnum.VOLLEYBALL]: Volleyball,
  [SportEnum.BASKETBALL]: Basketball,
  [SportEnum.HANDBALL]: Volleyball,
};

export default SportsIcons;
