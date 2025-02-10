import React from 'react';
import { motion } from 'framer-motion';
import { Match } from '@/utils/types';
import { TournamentBracketProps } from '@/utils/tournament';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const KnockoutStage = ({ round, matches }: { round: string; matches: Match[] }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {matches.map((match, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-yellow-500/30">
            <CardContent className="p-3">
              <div className="flex flex-col space-y-2">
                {match.isHomeGame && (
                  <div className="text-xs text-yellow-400 mb-1">Jogo em Casa</div>
                )}
                <div className="flex justify-between items-center">
                  <span>{match.team1.name}</span>
                  <span className="text-sm font-semibold bg-accent px-2 py-1 rounded">
                    {match.score1 ?? '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{match.team2.name}</span>
                  <span className="text-sm font-semibold bg-accent px-2 py-1 rounded">
                    {match.score2 ?? '-'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const FinalAndThirdPlace = ({ final, thirdPlace }: { final: Match; thirdPlace: Match }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-2 border-yellow-400">
        <CardHeader>
          <CardTitle className="text-center text-yellow-400">Final</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">{final.team1.name}</span>
            <span className="text-lg font-bold bg-accent px-2 py-1 rounded">
              {final.score1 ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">{final.team2.name}</span>
            <span className="text-lg font-bold bg-accent px-2 py-1 rounded">
              {final.score2 ?? '-'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-bronze">
        <CardHeader>
          <CardTitle className="text-center text-bronze">Terceiro Lugar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{thirdPlace.team1.name}</span>
            <span className="text-sm font-bold bg-accent px-2 py-1 rounded">
              {thirdPlace.score1 ?? '-'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{thirdPlace.team2.name}</span>
            <span className="text-sm font-bold bg-accent px-2 py-1 rounded">
              {thirdPlace.score2 ?? '-'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TournamentBracket = ({ groups, knockoutMatches }: TournamentBracketProps) => {
  return (
    <Card className="bg-[#9b87f5]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-white">
          Campeonato de Futebol
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Fase de Grupos */}
        {groups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {groups.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-400">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {group.matches.map((match, matchIndex) => (
                      <div key={matchIndex} className="bg-accent/5 rounded p-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>{match.team1.name}</span>
                          <span className="text-xs bg-accent/20 px-2 py-1 rounded">
                            {match.score1 !== undefined ? match.score1 : '-'} : {match.score2 !== undefined ? match.score2 : '-'}
                          </span>
                          <span>{match.team2.name}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Fases Eliminatórias */}
        {knockoutMatches && (
          <div className="relative mt-12">
            <CardTitle className="text-2xl font-bold text-center mb-8 text-yellow-400">
              Fase Eliminatória
            </CardTitle>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Oitavas de Final
                </h3>
                <KnockoutStage round="Oitavas de Final" matches={knockoutMatches.roundOf16} />
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Quartas de Final
                </h3>
                <KnockoutStage round="Quartas de Final" matches={knockoutMatches.quarterFinals} />
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Semi-Finais
                </h3>
                <KnockoutStage round="Semi-Finais" matches={knockoutMatches.semiFinals} />
              </div>

              <Separator className="my-8" />

              <FinalAndThirdPlace final={knockoutMatches.final} thirdPlace={knockoutMatches.thirdPlace} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};