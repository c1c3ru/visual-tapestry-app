import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Swords } from 'lucide-react';
import { cn } from '@/lib/utils';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface MatchupTableProps {
  matchups: string[];
  isLoading?: boolean;
}

const MatchupTable: React.FC<MatchupTableProps> = ({ matchups, isLoading = false }) => {
  return (
    <Card className="bg-background/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-3">
          <Swords className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Confrontos Gerados
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] w-full">
          <Table className="relative" role="table" aria-label="Tabela de confrontos">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="text-center py-4 font-bold text-primary">
                  Partidas Agendadas
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <TableRow>
                    <TableCell>
                      <div className="space-y-2 p-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="h-8 bg-gray-200 rounded-lg animate-pulse"
                            aria-label="Carregando confrontos..."
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence>
                    {matchups.map((matchup, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-accent/50 group"
                      >
                        <TableCell className="py-3">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ ...springConfig, delay: index * 0.05 }}
                            className="flex justify-center items-center"
                          >
                            <div className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                              {matchup}
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </AnimatePresence>
                )}
              </AnimatePresence>

              {!isLoading && matchups.length === 0 && (
                <TableRow>
                  <TableCell>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-8 text-center text-muted-foreground"
                      role="alert"
                    >
                      Nenhum confronto gerado ainda
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MatchupTable;