
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentHeader } from "../tournament/TournamentHeader";
import { TeamList } from "../tournament/TeamList";
import { TournamentForm } from "../tournament/TournamentForm";
import { TournamentBracket } from "../TournamentBracket";
import { useTournamentStore } from "@/stores/useTournamentStore";
import { TournamentType } from "@/utils/enums";
import { Team } from "@/utils/types";

const Championship = () => {
  const {
    tournamentName,
    tournamentType,
    teams,
    matches,
    groups,
    knockoutMatches,
    setTournamentName,
    setTournamentType,
    addTeam,
    removeTeam,
    generateGroups,
    generateMatches,
  } = useTournamentStore();

  const [newTeam, setNewTeam] = useState<Omit<Team, "id" | "players" | "stats">>({
    name: "",
    responsible: "",
    ranking: 0,
  });

  const handleAddTeam = () => {
    if (!newTeam.name) return;

    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      responsible: newTeam.responsible,
      ranking: newTeam.ranking,
      players: [],
      stats: {
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      },
    };

    addTeam(team);
    setNewTeam({ name: "", responsible: "", ranking: 0 });
  };

  const handleGenerateGroups = () => {
    generateGroups(teams);
  };

  const handleGenerateMatches = () => {
    generateMatches();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <TournamentHeader
          title={tournamentName}
          onTitleChange={setTournamentName}
          type={tournamentType}
          onTypeChange={setTournamentType}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Time</CardTitle>
              </CardHeader>
              <CardContent>
                <TournamentForm
                  team={newTeam}
                  onChange={setNewTeam}
                  onSubmit={handleAddTeam}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Times</CardTitle>
              </CardHeader>
              <CardContent>
                <TeamList teams={teams} onRemove={removeTeam} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tabela do Campeonato</CardTitle>
              </CardHeader>
              <CardContent>
                {tournamentType === TournamentType.LEAGUE && teams.length > 0 ? (
                  <div>
                    {groups.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500 mb-4">
                          Nenhum grupo gerado ainda. Adicione times e clique em
                          Gerar Grupos.
                        </p>
                        <button
                          onClick={handleGenerateGroups}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Gerar Grupos
                        </button>
                      </div>
                    ) : (
                      <div>
                        {matches.length === 0 ? (
                          <div className="text-center py-10">
                            <p className="text-gray-500 mb-4">
                              Grupos gerados. Clique em Gerar Partidas para
                              continuar.
                            </p>
                            <button
                              onClick={handleGenerateMatches}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Gerar Partidas
                            </button>
                          </div>
                        ) : (
                          <div>
                            <TournamentBracket
                              groups={groups}
                              knockoutMatches={knockoutMatches}
                              tournamentType={tournamentType}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : tournamentType === TournamentType.KNOCKOUT &&
                  teams.length > 0 ? (
                  <div>
                    {knockoutMatches === null ? (
                      <div className="text-center py-10">
                        <p className="text-gray-500 mb-4">
                          Nenhuma partida gerada ainda. Adicione times e clique
                          em Gerar Partidas.
                        </p>
                        <button
                          onClick={handleGenerateMatches}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Gerar Partidas
                        </button>
                      </div>
                    ) : (
                      <div>
                        <TournamentBracket
                          groups={[]}
                          knockoutMatches={knockoutMatches}
                          tournamentType={tournamentType}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      Adicione times para começar o campeonato
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Championship;
