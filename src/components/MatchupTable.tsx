import React from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface MatchupTableProps {
  matchups: string[];
}

const MatchupTable: React.FC<MatchupTableProps> = ({ matchups }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confrontos</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Partidas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchups.map((matchup, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {matchup}
                    </motion.div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default MatchupTable;