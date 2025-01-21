import React, { useState, useEffect } from 'react';
import { BackToDashboard } from '../BackToDashboard';
import { Button } from '../ui/button';
import { Save, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, KnockoutMatches, Match } from '@/utils/types';
import { generateKnockoutMatches } from '@/utils/tournament';
import TournamentHeader from '../tournament/TournamentHeader';
import TournamentForm from '../tournament/TournamentForm';
import TeamList from '../tournament/TeamList';

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
        doc.text(`${match.team1.name} vs ${match.team2.name}`, 30, yPosition);
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
        doc.text(`${match.team1.name} vs ${match.team2.name}`, 30, yPosition);
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
      
      const knockoutMatches = generateKnockoutMatches(shuffledTeams);
      setGeneratedKnockoutMatches(knockoutMatches);
    } else if (tournamentType === 'homeAway') {
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

  // Mock teams for demonstration
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
      <TournamentHeader />

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TournamentForm
            tournamentName={tournamentName}
            tournamentType={tournamentType}
            teamName={teamName}
            responsible={responsible}
            onTournamentNameChange={setTournamentName}
            onTournamentTypeChange={setTournamentType}
            onTeamNameChange={setTeamName}
            onResponsibleChange={setResponsible}
            onAddTeam={addTeam}
          />
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TeamList teams={teams} onRemoveTeam={removeTeam} />

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
