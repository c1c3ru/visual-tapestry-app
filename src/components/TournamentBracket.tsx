
import React from 'react';
import { motion } from 'framer-motion';

interface Match {
  team1: string;
  team2: string;
  score1?: number;
  score2?: number;
}

interface Group {
  name: string;
  matches: Match[];
}

interface KnockoutMatch {
  round: string;
  matches: Match[];
}

interface TournamentBracketProps {
  groups: Group[];
  knockoutMatches?: {
    roundOf16: Match[];
    quarterFinals: Match[];
    semiFinals: Match[];
    final: Match;
    thirdPlace: Match;
  };
}

const KnockoutStage = ({ round, matches }: KnockoutMatch) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {matches.map((match, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span>{match.team1}</span>
              <span className="text-sm font-semibold">{match.score1 ?? '-'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>{match.team2}</span>
              <span className="text-sm font-semibold">{match.score2 ?? '-'}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const FinalAndThirdPlace = ({ final, thirdPlace }: { final: Match; thirdPlace: Match }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        className="bg-white rounded-lg shadow p-4 border-2 border-yellow-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-center font-bold mb-3 text-yellow-600">Final</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">{final.team1}</span>
            <span className="text-lg font-bold">{final.score1 ?? '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">{final.team2}</span>
            <span className="text-lg font-bold">{final.score2 ?? '-'}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow p-4 border-2 border-bronze"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h3 className="text-center font-bold mb-3 text-orange-600">Third Place</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{thirdPlace.team1}</span>
            <span className="text-sm font-bold">{thirdPlace.score1 ?? '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{thirdPlace.team2}</span>
            <span className="text-sm font-bold">{thirdPlace.score2 ?? '-'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const TournamentBracket = ({ groups, knockoutMatches }: TournamentBracketProps) => {
  return (
    <motion.div
      className="w-full bg-white rounded-lg shadow-lg p-6 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Groups Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {groups.map((group, index) => (
          <motion.div
            key={group.name}
            className="bg-primary/5 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-bold mb-3 text-primary">{group.name}</h3>
            <div className="space-y-2">
              {group.matches.map((match, matchIndex) => (
                <div key={matchIndex} className="bg-white rounded p-2 shadow-sm">
                  <div className="flex justify-between items-center text-sm">
                    <span>{match.team1}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {match.score1 !== undefined ? match.score1 : '-'} : {match.score2 !== undefined ? match.score2 : '-'}
                    </span>
                    <span>{match.team2}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Knockout Stages */}
      {knockoutMatches && (
        <div className="relative mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">Knockout Stage</h2>

          <KnockoutStage round="Round of 16" matches={knockoutMatches.roundOf16} />
          <KnockoutStage round="Quarter Finals" matches={knockoutMatches.quarterFinals} />
          <KnockoutStage round="Semi Finals" matches={knockoutMatches.semiFinals} />

          <FinalAndThirdPlace final={knockoutMatches.final} thirdPlace={knockoutMatches.thirdPlace} />
        </div>
      )}
    </motion.div>
  );
};