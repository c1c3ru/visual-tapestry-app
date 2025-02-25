import { SportEnum } from "@/utils/enums";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; // Futebol
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball"; // Basquete
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball"; // Vôlei
import SportsHandballIcon from "@mui/icons-material/SportsHandball"; // Handebol
export const getSportIcon = (sport: SportEnum) => {
// Mapeamento de esportes para ícones do Material-UI
 const SportsIcons: Record<SportEnum, React.ComponentType> = {
  [SportEnum.FUTSAL]: SportsSoccerIcon, // Futsal usa o ícone de futebol
  [SportEnum.SOCCER]: SportsSoccerIcon, // Futebol
  [SportEnum.VOLLEYBALL]: SportsVolleyballIcon, // Vôlei
  [SportEnum.BASKETBALL]: SportsBasketballIcon, // Basquete
  [SportEnum.HANDBALL]: SportsHandballIcon, // Handebol
}};