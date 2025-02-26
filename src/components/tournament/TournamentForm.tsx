import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy, CupSoda, ListTree, Home } from 'lucide-react';
import clsx from "clsx";
import { springConfig } from '../../utils/animations';


interface TournamentFormProps {
  tournamentName: string;
  tournamentType: 'league' | 'worldCup' | 'homeAway';
  onTournamentNameChange: (value: string) => void;
  onTournamentTypeChange: (value: 'league' | 'worldCup' | 'homeAway') => void;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({
  tournamentName,
  tournamentType,
  onTournamentNameChange,
  onTournamentTypeChange,
}) => {
  const tournamentTypes = [
    {
      value: 'league',
      label: 'Pontos Corridos',
      icon: <ListTree className="h-5 w-5" />,
      description: 'Todos jogam contra todos em turno único'
    },
    {
      value: 'worldCup',
      label: 'Copa do Mundo',
      icon: <CupSoda className="h-5 w-5" />,
      description: 'Fase de grupos seguida de mata-mata'
    },
    {
      value: 'homeAway',
      label: 'Mata-mata Duplo',
      icon: <Home className="h-5 w-5" />,
      description: 'Confrontos de ida e volta'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Configurações do Torneio
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springConfig, delay: 0.1 }}
          >
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nome do Torneio</Label>
              <Input
                value={tournamentName}
                onChange={(e) => onTournamentNameChange(e.target.value)}
                placeholder="Ex: Campeonato Brasileiro 2024"
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>

          <Separator className="my-4" />

          <motion.fieldset
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...springConfig, delay: 0.2 }}
            className="space-y-4"
          >
            <legend className="text-sm font-medium mb-4">Tipo de Torneio</legend>
            
            <RadioGroup
              value={tournamentType}
              onValueChange={onTournamentTypeChange}
              className="grid gap-4"
            >
              {tournamentTypes.map((type, index) => (
                <motion.div
                  key={type.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springConfig, delay: index * 0.1 }}
                >
                  <Label
                    htmlFor={type.value}
                    className={clsx(
                      "flex items-start p-4 border rounded-lg cursor-pointer transition-all",
                      "hover:border-primary hover:bg-accent",
                      tournamentType === type.value && "border-primary bg-accent"
                    )}
                  >
                    <RadioGroupItem
                      value={type.value}
                      id={type.value}
                      className="mt-1 mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-primary">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.fieldset>
        </CardContent>
      </Card>
    </motion.div>
  );
};