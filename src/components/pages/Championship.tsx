import React from 'react';
import { toast } from "sonner";
import { Team } from "@/utils/types";
import { useTournamentStore } from "@/stores/useTournamentStore";
import { TournamentBracket } from "@/components/TournamentBracket";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flag, Shuffle } from "lucide-react";

const Championship = () => {
  const {
    tournamentName,
    tournamentType,
    teams,
    groups,
    knockoutMatches,
    matches,
    teamName,
    responsible,
    setTournamentName,
    setTournamentType,
    setTeamName,
    setResponsible,
    addTeam,
    removeTeam,
    generateMatches,
    generateGroups,
    generateKnockoutStage
  } = useTournamentStore();

  const handleRemoveTeam = (id: string) => {
    removeTeam(id);
    toast.success("Time removido com sucesso");
  };

  const handleGenerateMatches = () => {
    const result = generateMatches();
    if (result.success) {
      toast.success("Partidas geradas com sucesso");
    } else {
      toast.error(result.error || "Erro ao gerar partidas");
    }
  };

  const handleAddTeam = () => {
    if (!teamName.trim() || !responsible.trim()) {
      toast.error("Nome do time e responsável são obrigatórios");
      return;
    }

    const newTeam: Team = {
      id: crypto.randomUUID(),
      name: teamName.trim(),
      responsible: responsible.trim(),
      players: [],
      rating: 0
    };

    const result = addTeam(newTeam);
    if (result.success) {
      toast.success("Time adicionado com sucesso!");
      setTeamName("");
      setResponsible("");
    } else {
      toast.error(result.error || "Erro ao adicionar time");
    }
  };

  const handleGenerateGroups = () => {
    if (teams.length < 4) {
      toast.error("Adicione pelo menos 4 times para gerar os grupos.");
      return;
    }

    const generatedGroups = generateGroups();
    toast.success("Os grupos para o torneio foram gerados aleatoriamente");
  };

  const handleGenerateKnockoutStage = () => {
    if (teams.length < 4) {
      toast.error("Adicione pelo menos 4 times para gerar a fase eliminatória.");
      return;
    }

    const generatedKnockoutStage = generateKnockoutStage(teams);
    toast.success("A fase eliminatória do torneio foi gerada");
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Campeonato</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tournamentName">Nome do Torneio</Label>
              <Input
                id="tournamentName"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="tournamentType">Tipo de Torneio</Label>
              <Select onValueChange={setTournamentType} defaultValue={tournamentType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="league">Liga</SelectItem>
                  <SelectItem value="worldCup">Copa do Mundo</SelectItem>
                  <SelectItem value="homeAway">Mata-Mata (Ida e Volta)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="teamName">Nome do Time</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="responsible">Responsável</Label>
              <Input
                id="responsible"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleAddTeam}>Adicionar Time</Button>

          <div>
            <h3 className="text-lg font-semibold mb-2">Times Participantes</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border">
              {teams.length > 0 ? (
                <ul className="p-2">
                  {teams.map((team) => (
                    <li key={team.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
                      {team.name} - {team.responsible}
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveTeam(team.id)}>Remover</Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2">Nenhum time adicionado.</p>
              )}
            </ScrollArea>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerateMatches}>Gerar Partidas</Button>
            <Button variant="secondary" onClick={handleGenerateGroups}>Gerar Grupos</Button>
            <Button variant="secondary" onClick={handleGenerateKnockoutStage}>Gerar Eliminatórias</Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Tournament Brackets or Match List */}
      {tournamentType === "worldCup" && groups.length > 0 && knockoutMatches ? (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Fase de Grupos</h2>
          {groups.map((group) => (
            <div key={group.name} className="mb-4">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <ul>
                {group.matches.map((match) => (
                  <li key={match.id}>
                    {match.team1.name} vs {match.team2.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6 mb-4">Fase Eliminat��ria</h2>
          {knockoutMatches && (
            <>
              {knockoutMatches.roundOf16 && knockoutMatches.roundOf16.length > 0 && (
                <div>
                  <h3>Oitavas de Final</h3>
                  <ul>
                    {knockoutMatches.roundOf16.map((match) => (
                      <li key={match.id}>
                        {match.team1.name} vs {match.team2.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {knockoutMatches.quarterFinals && knockoutMatches.quarterFinals.length > 0 && (
                <div>
                  <h3>Quartas de Final</h3>
                  <ul>
                    {knockoutMatches.quarterFinals.map((match) => (
                      <li key={match.id}>
                        {match.team1.name} vs {match.team2.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {knockoutMatches.semiFinals && knockoutMatches.semiFinals.length > 0 && (
                <div>
                  <h3>Semi-Finais</h3>
                  <ul>
                    {knockoutMatches.semiFinals.map((match) => (
                      <li key={match.id}>
                        {match.team1.name} vs {match.team2.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {knockoutMatches.final && (
                <div>
                  <h3>Final</h3>
                  <p>{knockoutMatches.final.team1.name} vs {knockoutMatches.final.team2.name}</p>
                </div>
              )}

              {knockoutMatches.thirdPlace && (
                <div>
                  <h3>Disputa pelo Terceiro Lugar</h3>
                  <p>{knockoutMatches.thirdPlace.team1.name} vs {knockoutMatches.thirdPlace.team2.name}</p>
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Championship;
