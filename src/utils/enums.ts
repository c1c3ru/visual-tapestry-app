
export enum SportEnum {
  FUTSAL = "Futsal",
  SOCCER = "Futebol",
  VOLLEYBALL = "Voley",
  BASKETBALL = "Basquete",
  HANDBALL = "Handbol"
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
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export enum TournamentType {
  LEAGUE = "Liga",
  WORLD_CUP = "Copa",
  HOME_AWAY = "Mata-mata"
}

export enum MatchType {
  GROUP_STAGE = "Grupo",
  KNOCKOUT = "Mata-mata",
  FINAL = "Final"
}

export enum MatchStatus {
  SCHEDULED = "Marcada",
  IN_PROGRESS = "Ocorrendo",
  COMPLETED = "Finalizada"
}

export enum ErrorMessages {
  MIN_TEAMS_REQUIRED = "Um numero minimo de times é necessário",
  INVALID_TEAMS_NUMBER = "Numero de times invalido",
  INVALID_TOURNAMENT_TYPE = "Tipo de torneio invalido",
  INVALID_MATCH_TYPE = "Tipo de partida invalido",
  INVALID_MATCH_STATUS = "Status de partida invalido",
  INVALID_MATCH_RESULT = "Resultado de partida invalido",
  INVALID_MATCH_DATE = "Data de partida invalida",
  INVALID_MATCH_TIME = "Horario de partida invalido",
  INVALID_MATCH_TEAMS = "Times de partida invalidos",
  INVALID_MATCH_SCORE = "Placar de partida invalido",
}
