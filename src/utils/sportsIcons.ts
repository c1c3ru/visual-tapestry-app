
import { SportEnum } from "@/utils/enums";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

export const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: SportsSoccerIcon,
  [SportEnum.SOCCER]: SportsSoccerIcon,
  [SportEnum.VOLLEYBALL]: SportsVolleyballIcon,
  [SportEnum.BASKETBALL]: SportsBasketballIcon,
  [SportEnum.HANDBALL]: SportsHandballIcon,
};

export const getSportIcon = (sport: SportEnum): React.ComponentType => {
  return SportsIcons[sport];
};
