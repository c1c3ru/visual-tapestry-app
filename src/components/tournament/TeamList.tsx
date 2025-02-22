import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, Users, Trophy } from 'lucide-react';
import { Team } from '@/utils/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface TeamListProps {
  teams: Team[];
  onRemoveTeam: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onRemoveTeam }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Times Cadastrados
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <AnimatePresence>
            {teams.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 text-center text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-8 w-8" />
                  <p>Nenhum time cadastrado</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                role="list"
                className="space-y-2 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AnimatePresence>
                  {teams.map((team) => (
                    <motion.div
                      key={team.id}
                      role="listitem"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={springConfig}
                      className="group relative p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 border hover:border-primary transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{team.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Responsável: {team.responsible}
                          </p>
                        </div>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveTeam(team.id)}
                                className="text-destructive hover:bg-red-50"
                                aria-label={`Remover time ${team.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>Remover Time</TooltipContent>
                        </Tooltip>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeamList;