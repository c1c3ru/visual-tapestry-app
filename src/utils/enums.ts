export enum SportEnum {
  FUTSAL = "futsal",
  SOCCER = "futebol",
  VOLLEYBALL = "volei",
  BASKETBALL = "basquete",
  HANDBALL = "handbol"
}

export enum PositionEnum {
  // Posições comuns a vários esportes
  GOALKEEPER = "Goleiro", // Presente no futsal, futebol, handebol
  DEFENDER = "Defensor", // Presente no futebol
  MIDFIELDER = "Meio-campo", // Presente no futebol
  FORWARD = "Atacante", // Presente no futebol

  // Posições específicas do futsal
  FIXO = "Fixo",
  ALA = "Ala",
  PIVO_FUTSAL = "Pivô (Futsal)",

  // Posições específicas do vôlei
  SETTER = "Levantador",
  LIBERO = "Líbero",
  CENTRAL = "Central",
  PONTEIRO = "Ponteiro",
  OPOSTO = "Oposto",

  // Posições específicas do basquete
  ARMADOR = "Armador",
  ALA_BASKET = "Ala (Basquete)",
  ALA_PIVO = "Ala-pivô",
  PIVO_BASKET = "Pivô (Basquete)",

  // Posições específicas do handebol
  PONTA = "Ponta",
  MEIA = "Meia",
  CENTRAL_HANDBALL = "Central (Handebol)",
  PIVO_HANDBALL = "Pivô (Handebol)",
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
  HOME_AWAY = "homeAway",
}

export enum MatchType {
  GROUP_STAGE = "group",
  KNOCKOUT = "knockout",
  FINAL = "final",
}

export enum MatchStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum ErrorMessages {
  INVALID_TEAMS_NUMBER = "Número de times inválido para este formato de torneio",
  MIN_TEAMS_REQUIRED = "Mínimo de 4 times necessários",
}