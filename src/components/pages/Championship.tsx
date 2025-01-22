import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, Match, KnockoutMatches } from '@/utils/types';
import { generateKnockoutMatches } from '@/utils/tournament';
import TournamentHeader from '../tournament/TournamentHeader';
import TournamentForm from '../tournament/TournamentForm';
import TeamList from '../tournament/TeamList';
import ShareButtons from '../ShareButtons';
import { generateTournamentPDF } from '@/utils/pdf';

const Championship = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState<'league' | 'worldCup' | 'homeAway'>('league');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [matches, setMatches] = useState<Group[]>([]);
  const [generatedKnockoutMatches, setGeneratedKnockoutMatches] = useState<KnockoutMatches | undefined>();
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  const { toast } = useToast();

  const addTeam = () => {
    const newTeam: Team = { id: Date.now().toString(), name: teamName, responsible };
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    setTeams([...teams, newTeam]);
    setTeamName("");
    setResponsible("");
  };

  const removeTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId));
  };

  const saveTournament = async () => {
    try {
      const tournament: Tournament = {
        id: Date.now().toString(),
        name: tournamentName,
        type: tournamentType,
        teams: teams,
        matches: matches,
        knockoutMatches: generatedKnockoutMatches
      };

      // Here you would typically save to your backend
      // For now, we'll just show a success message
      toast({
        title: "Torneio Salvo",
        description: "O torneio foi salvo com sucesso!",
      });

    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar o torneio.",
        variant: "destructive"
      });
    }
  };

  const generateMatches = () => {
    const generatedMatches = generateTournamentMatches(teams, tournamentType);
    setMatches(generatedMatches);
    setGeneratedKnockoutMatches(null); // Atualize conforme necessário para knockout
  };

  const generatePDF = () => {
    if (!tournamentName) {
      toast({
        title: "Nome do Torneio Necessário",
        description: "Por favor, insira um nome para o torneio antes de gerar o PDF.",
        variant: "destructive"
      });
      return;
    }
    const groups = matches.map(match => ({ name: `${match.team1.name} vs ${match.team2.name}`, matches: [match] }));
    generateTournamentPDF(tournamentName, groups);
  };

  // Adiciona dados fictícios para demonstração
  const mockTeams: Team[] = [
    { id: '1', name: 'Flamengo', responsible: 'João' },
    { id: '2', name: 'Palmeiras', responsible: 'Maria' },
    { id: '3', name: 'Santos', responsible: 'Pedro' },
    { id: '4', name: 'São Paulo', responsible: 'Ana' },
    { id: '5', name: 'Corinthians', responsible: 'Carlos' },
    { id: '6', name: 'Grêmio', responsible: 'Paulo' },
    { id: '7', name: 'Internacional', responsible: 'Lucas' },
    { id: '8', name: 'Atlético-MG', responsible: 'Julia' },
  ];

  useEffect(() => {
    if (tournamentType === 'worldCup' && mockTeams.length > 0) {
      const knockoutMatches = generateKnockoutMatches(mockTeams);
      setGeneratedKnockoutMatches(knockoutMatches);
    }
  }, [tournamentType]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <BackToDashboard />
      
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Campeonato</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-4">
            <Label htmlFor="tournamentName">Nome do Torneio</Label>
            <Input
              id="tournamentName"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Digite o nome do torneio"
            />
          </div>

          <div className="space-y-4">
            <Label>Tipo de Torneio</Label>
            <RadioGroup
              value={tournamentType}
              onValueChange={(value: 'league' | 'worldCup' | 'homeAway') => setTournamentType(value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="league" id="league" />
                <Label htmlFor="league">Pontos Corridos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worldCup" id="worldCup" />
                <Label htmlFor="worldCup">Copa do Mundo (Grupos + Mata-mata)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homeAway" id="homeAway" />
                <Label htmlFor="homeAway">Mata-mata (Ida e Volta)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Adicionar Time</Label>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Nome do time"
              />
              <Input
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                placeholder="Responsável"
              />
              <Button onClick={addTeam} className="whitespace-nowrap">
                <Users className="mr-2 h-4 w-4" />
                Adicionar Time
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Label htmlFor="tournamentName">Nome do Torneio</Label>
            <Input
              id="tournamentName"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Digite o nome do torneio"
            />
          </div>

          <div className="space-y-4">
            <Label>Tipo de Torneio</Label>
            <RadioGroup
              value={tournamentType}
              onValueChange={(value: 'league' | 'worldCup' | 'homeAway') => setTournamentType(value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="league" id="league" />
                <Label htmlFor="league">Pontos Corridos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worldCup" id="worldCup" />
                <Label htmlFor="worldCup">Copa do Mundo (Grupos + Mata-mata)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homeAway" id="homeAway" />
                <Label htmlFor="homeAway">Mata-mata (Ida e Volta)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Adicionar Time</Label>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Nome do time"
              />
              <Input
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                placeholder="Responsável"
              />
              <Button onClick={addTeam} className="whitespace-nowrap">
                <Users className="mr-2 h-4 w-4" />
                Adicionar Time
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Times Cadastrados</h2>
            <div className="space-y-4">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-gray-600">{team.responsible}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeTeam(team.id)}
                  >
                    <Trophy className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Times Cadastrados</h2>
            <div className="space-y-4">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-gray-600">{team.responsible}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeTeam(team.id)}
                  >
                    <Trophy className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button onClick={saveTournament} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
            <Button onClick={generateMatches} className="gap-2" disabled={teams.length < 2}>
              <Trophy className="h-4 w-4" />
              Gerar Confrontos
            </Button>
          </div>
        </motion.div>
      </div>

      {(matches.length > 0 || generatedKnockoutMatches) && (
        <motion.div
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Confrontos do Campeonato</h2>
          <TournamentBracket 
            groups={matches} 
            knockoutMatches={generatedKnockoutMatches}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Championship;
