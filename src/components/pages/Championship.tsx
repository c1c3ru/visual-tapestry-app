
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentForm } from "../tournament/TournamentForm";
import { TournamentBracket } from "../TournamentBracket";
import { useTournamentStore } from "@/stores/useTournamentStore";
import { TournamentType } from "@/utils/enums";
import { Team } from "@/utils/types";
import BackToDashboard from "../BackToDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy } from "lucide-react";

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

    const result = addTeam(team);
    if (result && result.success) {
      setNewTeam({ name: "", responsible: "", ranking: 0 });
    }
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
        <BackToDashboard />
        
        <div className="flex items-center gap-3 mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
          <div className="p-2 bg-primary/10 rounded-full">
            <Trophy className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          
          <div className="flex-1">
            <input 
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Nome do Campeonato"
              className="bg-transparent text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent outline-none w-full"
            />
          </div>
          
          <div>
            <Select
              value={tournamentType}
              onValueChange={(value: TournamentType) => setTournamentType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Campeonato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TournamentType.LEAGUE}>Liga</SelectItem>
                <SelectItem value={TournamentType.WORLD_CUP}>Copa</SelectItem>
                <SelectItem value={TournamentType.HOME_AWAY}>Mata-mata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Time</CardTitle>
              </CardHeader>
              <CardContent>
                <TournamentForm
                  teamName={newTeam.name}
                  responsible={newTeam.responsible}
                  ranking={newTeam.ranking}
                  onTeamNameChange={(name) => setNewTeam({...newTeam, name})}
                  onResponsibleChange={(responsible) => setNewTeam({...newTeam, responsible})}
                  onRankingChange={(ranking) => setNewTeam({...newTeam, ranking})}
                  onSubmit={handleAddTeam}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      Nenhum time cadastrado
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {teams.map((team) => (
                        <div 
                          key={team.id} 
                          className="p-3 border rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-sm text-gray-500">
                              Responsável: {team.responsible}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeTeam(team.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                ) : tournamentType === TournamentType.HOME_AWAY &&
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
