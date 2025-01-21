import React, { useState } from 'react';
import { BackToDashboard } from '../BackToDashboard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Trophy,
  Save,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, KnockoutMatches } from '@/utils/types';

const Championship = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState<'league' | 'worldCup' | 'homeAway'>('league');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [matches, setMatches] = useState<Group[]>([]);
  const [generatedKnockoutMatches, setGeneratedKnockoutMatches] = useState<KnockoutMatches | undefined>();
  const { toast } = useToast();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Tournament: ${tournamentName}`, 20, 20);
    
    let yPosition = 40;
    matches.forEach((group, index) => {
      doc.text(`${group.name}`, 20, yPosition);
      yPosition += 10;
      
      group.matches.forEach((match) => {
        doc.text(`${match.team1} vs ${match.team2}`, 30, yPosition);
        yPosition += 10;
      });
      
      yPosition += 10;
    });

    if (generatedKnockoutMatches) {
      doc.text('Knockout Stage', 20, yPosition);
      yPosition += 10;
      
      // Add knockout matches to PDF
      doc.text('Round of 16', 20, yPosition);
      yPosition += 10;
      generatedKnockoutMatches.roundOf16.forEach((match) => {
        doc.text(`${match.team1} vs ${match.team2}`, 30, yPosition);
        yPosition += 10;
      });
    }

    doc.save(`${tournamentName}-tournament.pdf`);
  };

  const saveTournament = () => {
    const tournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentName,
      type: tournamentType,
      teams: teams,
      matches: matches
    };
    localStorage.setItem('tournament', JSON.stringify(tournament));
    toast({
      title: "Torneio salvo com sucesso!",
      description: "Seus dados foram salvos localmente."
    });
  };

  const addTeam = () => {
    if (!teamName || !responsible) {
      toast({
        title: "Erro ao adicionar time",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setTeams([...teams, {
      id: Date.now().toString(),
      name: teamName,
      responsible
    }]);
    setTeamName('');
    setResponsible('');
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const generateMatches = () => {
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    
    if (tournamentType === 'worldCup') {
      // Gerar grupos para a fase de classificação
      const groups: Group[] = [];
      const teamsPerGroup = 4;
      
      for (let i = 0; i < shuffledTeams.length; i += teamsPerGroup) {
        const groupTeams = shuffledTeams.slice(i, i + teamsPerGroup);
        const groupMatches: Match[] = [];
        
        for (let j = 0; j < groupTeams.length; j++) {
          for (let k = j + 1; k < groupTeams.length; k++) {
            groupMatches.push({
              team1: groupTeams[j],
              team2: groupTeams[k]
            });
          }
        }
        
        groups.push({
          name: `Grupo ${String.fromCharCode(65 + groups.length)}`,
          matches: groupMatches
        });
      }

      setMatches(groups);
      
      // Gerar fase eliminatória
      const knockoutMatches: KnockoutMatches = {
        roundOf16: Array(8).fill(null).map(() => ({
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        })),
        quarterFinals: Array(4).fill(null).map(() => ({
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        })),
        semiFinals: Array(2).fill(null).map(() => ({
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        })),
        final: {
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        },
        thirdPlace: {
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        }
      };
      
      setGeneratedKnockoutMatches(knockoutMatches);
    } else if (tournamentType === 'homeAway') {
      // Gerar confrontos ida e volta
      const knockoutMatches: KnockoutMatches = {
        roundOf16: shuffledTeams.slice(0, 16).reduce<Match[]>((acc, team, index) => {
          if (index % 2 === 0) {
            acc.push(
              {
                team1: team,
                team2: shuffledTeams[index + 1],
                isHomeGame: true
              },
              {
                team1: shuffledTeams[index + 1],
                team2: team,
                isHomeGame: true
              }
            );
          }
          return acc;
        }, []),
        quarterFinals: Array(8).fill(null).map(() => ({
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' },
          isHomeGame: true
        })),
        semiFinals: Array(4).fill(null).map(() => ({
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' },
          isHomeGame: true
        })),
        final: {
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        },
        thirdPlace: {
          team1: { id: 'tbd', name: 'A Definir', responsible: '' },
          team2: { id: 'tbd', name: 'A Definir', responsible: '' }
        }
      };
      
      setGeneratedKnockoutMatches(knockoutMatches);
    } else {
      // Liga (código existente)
      const groups: Group[] = [];
      const teamsPerGroup = 4;
      
      for (let i = 0; i < shuffledTeams.length; i += teamsPerGroup) {
        const groupTeams = shuffledTeams.slice(i, i + teamsPerGroup);
        const groupMatches: Match[] = [];
        
        for (let j = 0; j < groupTeams.length; j++) {
          for (let k = j + 1; k < groupTeams.length; k++) {
            groupMatches.push({
              team1: groupTeams[j],
              team2: groupTeams[k]
            });
          }
        }
        
        groups.push({
          name: `Grupo ${String.fromCharCode(65 + groups.length)}`,
          matches: groupMatches
        });
      }

      setMatches(groups);
    }
    
    toast({
      title: "Confrontos gerados com sucesso!",
      description: "Os confrontos foram gerados e organizados de acordo com o tipo de torneio selecionado."
    });
  };

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
          className="mt-8"
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