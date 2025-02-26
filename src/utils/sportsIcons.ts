
import { SportEnum } from "@/utils/enums";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; // Futebol
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball"; // Basquete
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball"; // Vôlei
import SportsHandballIcon from "@mui/icons-material/SportsHandball"; // Handebol

export const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: SportsSoccerIcon,
  [SportEnum.SOCCER]: SportsSoccerIcon,
  [SportEnum.VOLLEYBALL]: SportsVolleyballIcon,
  [SportEnum.BASKETBALL]: SportsBasketballIcon,
  [SportEnum.HANDBALL]: SportsHandballIcon,
};
