import { SportEnum } from "@/utils/enums";
import {
  SportsSoccer as SoccerIcon,
  SportsVolleyball as VolleyballIcon,
  SportsBasketball as BasketballIcon,
  SportsHandball as HandballIcon,
} from "@mui/icons-material";

interface IconProps {
  className?: string;
  size?: number;
}

export const SportsIcons: Record<SportEnum, React.FC<IconProps>> = {
  [SportEnum.FUTSAL]: (props) => <SoccerIcon {...props} />,
  [SportEnum.SOCCER]: (props) => <SoccerIcon {...props} />,
  [SportEnum.VOLLEYBALL]: (props) => <VolleyballIcon {...props} />,
  [SportEnum.BASKETBALL]: (props) => <BasketballIcon {...props} />,
  [SportEnum.HANDBALL]: (props) => <HandballIcon {...props} />
};

export default SportsIcons;