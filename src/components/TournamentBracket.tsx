
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Match } from '@/utils/types';
import { TournamentBracketProps } from '@/utils/tournament';
import { Card, CardContent } from '@/components/ui/card';

const RegionBracket = ({ title, matches }: { title: string; matches: Match[] }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-xl font-bold text-white text-center">{title}</h3>
    <div className="space-y-6">
      {matches.map((match, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white/95 shadow-lg">
            <CardContent className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{match.team1.name}</span>
                  <span className="text-sm font-bold bg-red-600 text-white px-2 py-1 rounded">
                    {match.score1 ?? '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{match.team2.name}</span>
                  <span className="text-sm font-bold bg-red-600 text-white px-2 py-1 rounded">
                    {match.score2 ?? '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

export const TournamentBracket = ({ groups, knockoutMatches }: TournamentBracketProps) => {
  return (
    <div className="relative bg-gradient-to-b from-red-600 to-red-900 p-8 rounded-xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">MARCH MADNESS</h2>
        <p className="text-white/80">BRACKET</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <RegionBracket title="WEST" matches={groups[0]?.matches || []} />
        <RegionBracket title="EAST" matches={groups[1]?.matches || []} />
        <RegionBracket title="SOUTH" matches={groups[2]?.matches || []} />
        <RegionBracket title="MIDWEST" matches={groups[3]?.matches || []} />
      </div>

      {knockoutMatches && (
        <div className="mt-12 text-center">
          <Card className="inline-block bg-red-500 text-white">
            <CardContent className="p-4">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-xl font-bold">WINNER TEAM</h3>
              <p className="mt-2">{knockoutMatches.final.team1.name}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
