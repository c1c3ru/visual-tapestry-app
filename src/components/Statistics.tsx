import React, { useState } from 'react';
import { BackToDashboard } from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';

interface Statistic {
  name: string;
  points: number;
  date: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    { name: 'João', points: 10, date: '2025-01-15' },
    { name: 'Maria', points: 15, date: '2025-01-15' },
  ]);

  const [isAdmin] = useState(true);

  const handlePointsChange = (index: number, value: number) => {
    setStatistics((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, points: value } : item
      )
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <BackToDashboard />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Participante</th>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <motion.tr 
                  key={index} 
                  className="border-b hover:bg-gray-100"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-4 py-2">{stat.name}</td>
                  <td className="px-4 py-2">{stat.date}</td>
                  <td className="px-4 py-2">
                    {isAdmin ? (
                      <input
                        type="number"
                        value={stat.points}
                        onChange={(e) =>
                          handlePointsChange(index, parseInt(e.target.value))
                        }
                        className="border border-primary/30 p-2 rounded-lg w-20 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                      />
                    ) : (
                      stat.points
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;