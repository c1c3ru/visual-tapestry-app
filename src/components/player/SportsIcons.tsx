
import { SportEnum } from "@/utils/enums";
import { 
  Dumbbell,
  User,
  Baseball,
  CircleDot,
  Headphones
} from "lucide-react";

interface IconProps {
  className?: string;
  size?: number;
}

export const SportsIcons: Record<SportEnum, React.FC<IconProps>> = {
  [SportEnum.FUTSAL]: (props) => <Baseball {...props} />,
  [SportEnum.SOCCER]: (props) => <CircleDot {...props} />,
  [SportEnum.VOLLEYBALL]: (props) => <User {...props} />,
  [SportEnum.BASKETBALL]: (props) => <Dumbbell {...props} />,
  [SportEnum.HANDBALL]: (props) => <Headphones {...props} />
};

export default SportsIcons;
