import React, { useState } from 'react';

import { BackToDashboard } from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";

interface PointRecord {
  points: number;
  date: string;
}


interface Statistic {
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[]; // Lista de registros de pontos/gols com data

  lastUpdated: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    { 
      name: 'João', 
      date: '2024-01-15',
      attendanceCount: 5,
      pointRecords: [
        { points: 10, date: '2024-01-15' },
      ],

      lastUpdated: new Date().toISOString()
    },
    { 
      name: 'Maria', 
      date: '2024-01-15',
      attendanceCount: 8,
      pointRecords: [
        { points: 15, date: '2024-01-15' },
      ],

      lastUpdated: new Date().toISOString()
    },
  ]);

  const [isAdmin] = useState(true); // This can be dynamic
  const { toast } = useToast();


  const handlePointsChange = (index: number, value: number) => {
    if (value < 0) {
      toast({
        title: "Erro",
        description: "Os pontos não podem ser negativos.",
        variant: "destructive",
      });
      return;
    }

    const newRecord = {
      points: value,
      date: format(new Date(), 'dd/MM/yyyy'),
    };

    setStatistics((prev) =>
      prev.map((item, i) =>
        i === index 
          ? { 
              ...item, 
              pointRecords: [...item.pointRecords, newRecord], // Adiciona novo registro de pontos

              lastUpdated: new Date().toISOString()
            } 
          : item
      )
    );

    toast({
      title: "Pontos Atualizados",
      description: "Os pontos foram atualizados com sucesso.",
    });
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
                    
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Histórico de Pontos/Gols:</span>
                      {stat.pointRecords.map((record, i) => (
                        <div key={i} className="text-sm text-gray-700">
                          {record.points} pontos/gols - {record.date}
                        </div>
                      ))}
                    </div>


                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pontos:</span>
                      {isAdmin ? (
                        <input
                          type="number"

                          onChange={(e) => handlePointsChange(index, parseInt(e.target.value))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      ) : (
                        <span className="font-medium">{stat.pointRecords[stat.pointRecords.length - 1]?.points}</span>
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