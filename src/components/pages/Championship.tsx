import React, { useState, useEffect } from 'react';
import { BackToDashboard } from '../BackToDashboard';
import { Button } from '../ui/button';
import { Save, Trophy, FileDown, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { TournamentBracket } from '../TournamentBracket';
import { Team, Tournament, Group, KnockoutMatches } from '@/utils/types';
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

  const generatePDF = () => {
    if (!tournamentName) {
      toast({
        title: "Nome do Torneio Necessário",
        description: "Por favor, insira um nome para o torneio antes de gerar o PDF.",
        variant: "destructive"
      });
      return;
    }

    generateTournamentPDF(tournamentName, matches, generatedKnockoutMatches);
    
    toast({
      title: "PDF Gerado com Sucesso",
      description: "O arquivo PDF do torneio foi gerado e baixado."
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
    if (!tournamentName) {
      toast({
        title: "Nome do Torneio Necessário",
        description: "Por favor, insira um nome para o torneio antes de gerar os confrontos.",
        variant: "destructive"
      });
      return;
    }

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
    
    setShowSocialButtons(true);
    toast({
      title: "Confrontos gerados com sucesso!",
      description: "Os confrontos foram gerados e organizados de acordo com o tipo de torneio selecionado."
    });
  };

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
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Confrontos do Campeonato</h2>
            <div className="flex gap-4 items-center">
              <Button onClick={generatePDF} className="gap-2">
                <FileDown className="h-4 w-4" />
                Gerar PDF
              </Button>
              {showSocialButtons && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Compartilhar:</span>
                  <ShareButtons />
                </div>
              )}
            </div>
          </div>
          
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
