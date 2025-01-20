import React, { useState } from 'react';
import { BackToDashboard } from '../BackToDashboard';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Trophy,
  Save,
  Edit2,
  Trash2,
  Share2,
  FileDown,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface Team {
  id: string;
  name: string;
  responsible: string;
}

interface Tournament {
  id: string;
  name: string;
  type: string;
  teams: Team[];
  matches?: string[][];
}

const Championship = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentType, setTournamentType] = useState('league');
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [matches, setMatches] = useState<string[][]>([]);
  const [isDrawGenerated, setIsDrawGenerated] = useState(false);
  const { toast } = useToast();

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
    const newMatches: string[][] = [];
    
    if (tournamentType === 'knockout') {
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (i + 1 < shuffledTeams.length) {
          newMatches.push([shuffledTeams[i].name, shuffledTeams[i + 1].name]);
        }
      }
    } else if (tournamentType === 'league') {
      for (let i = 0; i < shuffledTeams.length; i++) {
        for (let j = i + 1; j < shuffledTeams.length; j++) {
          newMatches.push([shuffledTeams[i].name, shuffledTeams[j].name]);
        }
      }
    }
    
    setMatches(newMatches);
    setIsDrawGenerated(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(tournamentName, 20, 20);
    matches.forEach((match, index) => {
      doc.text(`${match[0]} vs ${match[1]}`, 20, 40 + (index * 10));
    });
    doc.save('tournament.pdf');
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
              onValueChange={setTournamentType}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="league" id="league" />
                <Label htmlFor="league">Pontos Corridos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="knockout" id="knockout" />
                <Label htmlFor="knockout">Mata-mata</Label>
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
                    <Trash2 className="h-4 w-4" />
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
            {isDrawGenerated && (
              <>
                <Button onClick={generatePDF} className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Gerar PDF
                </Button>
                <Button className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {isDrawGenerated && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-4">Confrontos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{match[0]}</span>
                  <span className="text-primary font-bold">VS</span>
                  <span className="font-medium">{match[1]}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Championship;