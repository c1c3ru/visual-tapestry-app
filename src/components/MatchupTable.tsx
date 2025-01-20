import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface MatchupTableProps {
  matchups: string[];
}

const MatchupTable: React.FC<MatchupTableProps> = ({ matchups }) => {
  return (
    <motion.div 
      className="mt-6 bg-white rounded-lg shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Confrontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matchups.map((matchup, index) => (
            <TableRow key={index}>
              <TableCell className="text-center font-medium">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {matchup}
                </motion.div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default MatchupTable;