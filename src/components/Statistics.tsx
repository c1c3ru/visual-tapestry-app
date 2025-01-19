import React, { useState, useEffect } from 'react';
import { BackToDashboard } from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Statistic {
  name: string;
  points: number;
  date: string;
  attendanceCount: number;
  lastUpdated: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    { 
      name: 'João', 
      points: 10, 
      date: '2024-01-15',
      attendanceCount: 5,
      lastUpdated: new Date().toISOString()
    },
    { 
      name: 'Maria', 
      points: 15, 
      date: '2024-01-15',
      attendanceCount: 8,
      lastUpdated: new Date().toISOString()
    },
  ]);

  const [isAdmin] = useState(true);

  const handlePointsChange = (index: number, value: number) => {
    setStatistics((prev) =>
      prev.map((item, i) =>
        i === index 
          ? { 
              ...item, 
              points: value,
              lastUpdated: new Date().toISOString()
            } 
          : item
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{stat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Presenças:</span>
                      <span className="font-medium">{stat.attendanceCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pontos:</span>
                      {isAdmin ? (
                        <input
                          type="number"
                          value={stat.points}
                          onChange={(e) => handlePointsChange(index, parseInt(e.target.value))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <span className="font-medium">{stat.points}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <div>Cadastro: {format(new Date(stat.date), 'dd/MM/yyyy')}</div>
                      <div>Última atualização: {format(new Date(stat.lastUpdated), 'dd/MM/yyyy HH:mm')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;