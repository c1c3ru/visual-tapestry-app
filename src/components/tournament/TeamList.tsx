import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { Team } from '@/utils/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TeamListProps {
  teams: Team[];
  onRemoveTeam: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onRemoveTeam }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Times Cadastrados</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {teams.map((team) => (
              <motion.div
                key={team.id}
                className="flex items-center justify-between p-4 bg-accent rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-sm text-muted-foreground">{team.responsible}</p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onRemoveTeam(team.id)}
                >
                  <Trophy className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TeamList;