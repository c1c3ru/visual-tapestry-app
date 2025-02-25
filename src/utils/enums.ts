
export enum SportEnum {
  FUTSAL = "futsal",
  SOCCER = "soccer",
  VOLLEYBALL = "volleyball",
  BASKETBALL = "basketball",
  HANDBALL = "handball"
}

export enum PositionEnum {
  GOALKEEPER = "Goleiro",
  DEFENDER = "Defensor",
  MIDFIELDER = "Meio-campo",
  FORWARD = "Atacante",
  FIXO = "Fixo",
  ALA = "Ala",
  PIVO_FUTSAL = "Pivô (Futsal)",
  SETTER = "Levantador",
  LIBERO = "Líbero",
  CENTRAL = "Central",
  PONTEIRO = "Ponteiro",
  OPOSTO = "Oposto",
  ARMADOR = "Armador",
  ALA_BASKET = "Ala (Basquete)",
  ALA_PIVO = "Ala-pivô",
  PIVO_BASKET = "Pivô (Basquete)",
  PONTA = "Ponta",
  MEIA = "Meia",
  CENTRAL_HANDBALL = "Central (Handebol)",
  PIVO_HANDBALL = "Pivô (Handebol)"
}

export enum RatingEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export enum TournamentType {
  LEAGUE = "league",
  WORLD_CUP = "worldCup",
  HOME_AWAY = "homeAway"
}

export enum MatchType {
  GROUP_STAGE = "group",
  KNOCKOUT = "knockout",
  FINAL = "final"
}

export enum MatchStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed"
}

export enum ErrorMessages {
  MIN_TEAMS_REQUIRED = "Minimum number of teams required is not met",
  INVALID_TEAMS_NUMBER = "Invalid number of teams",
  INVALID_TOURNAMENT_TYPE = "Invalid tournament type",
  INVALID_MATCH_TYPE = "Invalid match type"
}
