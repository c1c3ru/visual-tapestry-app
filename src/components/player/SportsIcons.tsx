
import { SportEnum } from "@/utils/enums";
import { Football, Basketball, Volleyball } from "lucide-react";
import { SVGProps } from "react";

interface SportsIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const SportsIcons: Record<SportEnum, React.FC<SportsIconProps>> = {
  [SportEnum.FUTSAL]: Football,
  [SportEnum.SOCCER]: Football,
  [SportEnum.VOLLEYBALL]: Volleyball,
  [SportEnum.BASKETBALL]: Basketball,
  [SportEnum.HANDBALL]: Volleyball,
};

export default SportsIcons;
