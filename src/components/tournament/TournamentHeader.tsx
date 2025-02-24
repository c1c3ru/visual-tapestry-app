import React from 'react';
import { Trophy } from 'lucide-react';

const TournamentHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Trophy className="h-8 w-8 text-primary" />
      <h1 className="text-3xl font-bold">Campeonato</h1>
    </div>
  );
};

export default TournamentHeader;