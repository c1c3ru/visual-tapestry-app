import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Trophy } from 'lucide-react';
import { Team } from '@/utils/types';

interface TeamListProps {
  teams: Team[];
  onRemoveTeam: (id: string) => void;
}

export const TeamList: React.FC<TeamListProps> = ({ teams, onRemoveTeam }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Times Cadastrados</h2>
      <div className="space-y-4">
        {teams.map((team) => (
          <motion.div
            key={team.id}
            className="flex items-center justify-between p-3 bg-tournament-accent rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <p className="font-medium text-gray-800">{team.name}</p>
              <p className="text-sm text-gray-600">{team.responsible}</p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemoveTeam(team.id)}
              className="hover:bg-red-600"
            >
              <Trophy className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};