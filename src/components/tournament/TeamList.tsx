import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useTournamentStore } from '@/stores/useTournamentStore';

const TeamList: React.FC = () => {
  const { teams, removeTeam } = useTournamentStore();

  return (
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
  );
};

export default TeamList;