import { Group, KnockoutMatches } from "../utils/types";
import { TournamentType } from "../utils/enums";

interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: KnockoutMatches;
  tournamentType: TournamentType;
}

export const TournamentBracket = ({
  groups,
  knockoutMatches,
  tournamentType
}: TournamentBracketProps) => {
  // Função para renderizar grupos
  const renderGroups = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Fase de Grupos</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id} className="p-4 border rounded-lg bg-card">
            <h3 className="mb-4 text-lg font-semibold">{group.name}</h3>
            <div className="space-y-2">
              {group.matches.map((match) => (
                <div key={match.id} className="p-2 border rounded bg-muted">
                  <div className="flex justify-between">
                    <span>{match.team1.name}</span>
                    <span>{match.score1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{match.team2.name}</span>
                    <span>{match.score2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Função para renderizar fases eliminatórias
  const renderKnockoutStage = (stage: keyof KnockoutMatches, title: string) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid gap-4">
        {Array.isArray(knockoutMatches?.[stage]) && knockoutMatches?.[stage].map((match) => (
          <div key={match.id} className="p-3 border rounded bg-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between">
                  <span>{match.team1.name}</span>
                  <span>{match.score1}</span>
                </div>
                <div className="flex justify-between">
                  <span>{match.team2.name}</span>
                  <span>{match.score2}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {tournamentType === TournamentType.WORLD_CUP && renderGroups()}
      
      {tournamentType !== TournamentType.LEAGUE && knockoutMatches && (
        <div className="space-y-8">
          {knockoutMatches.roundOf16.length > 0 && renderKnockoutStage('roundOf16', 'Oitavas de Final')}
          {knockoutMatches.quarterFinals.length > 0 && renderKnockoutStage('quarterFinals', 'Quartas de Final')}
          {knockoutMatches.semiFinals.length > 0 && renderKnockoutStage('semiFinals', 'Semifinais')}
          {renderKnockoutStage('final', 'Final')}
          {renderKnockoutStage('thirdPlace', 'Disputa pelo 3º Lugar')}
        </div>
      )}
    </div>
  );
};