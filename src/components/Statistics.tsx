import React, { useState, useEffect } from 'react';
import { BackToDashboard } from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

interface PointRecord {
  id: number;
  points: number;
  date: string;
}

interface Statistic {
  id: string;
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[];
  lastUpdated: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [editingRecord, setEditingRecord] = useState<{id: string, recordId: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const savedStats = getFromLocalStorage('statistics') || [];
    setStatistics(savedStats);
  }, []);

  const saveStatistics = (newStats: Statistic[]) => {
    saveToLocalStorage('statistics', newStats);
    setStatistics(newStats);
  };

  const handlePointsChange = (statId: string, points: number) => {
    const newRecord = {
      id: Date.now(),
      points,
      date: format(new Date(), 'dd/MM/yyyy'),
    };

    const updatedStats = statistics.map(stat => 
      stat.id === statId 
        ? { 
            ...stat, 
            pointRecords: [...stat.pointRecords, newRecord],
            lastUpdated: new Date().toISOString()
          }
        : stat
    );

    saveStatistics(updatedStats);
    toast({
      title: "Pontos Atualizados",
      description: "Os pontos foram atualizados com sucesso.",
    });
  };

  const handleEdit = (statId: string, recordId: number, currentPoints: number) => {
    setEditingRecord({ id: statId, recordId });
    setEditValue(currentPoints.toString());
  };

  const handleSaveEdit = (statId: string, recordId: number) => {
    const updatedStats = statistics.map(stat => {
      if (stat.id === statId) {
        const updatedRecords = stat.pointRecords.map(record =>
          record.id === recordId
            ? { ...record, points: Number(editValue) }
            : record
        );
        return { ...stat, pointRecords: updatedRecords, lastUpdated: new Date().toISOString() };
      }
      return stat;
    });

    saveStatistics(updatedStats);
    setEditingRecord(null);
    setEditValue('');
    toast({
      title: "Registro Atualizado",
      description: "O registro foi atualizado com sucesso.",
    });
  };

  const handleDelete = (statId: string, recordId: number) => {
    const updatedStats = statistics.map(stat => {
      if (stat.id === statId) {
        return {
          ...stat,
          pointRecords: stat.pointRecords.filter(record => record.id !== recordId),
          lastUpdated: new Date().toISOString()
        };
      }
      return stat;
    });

    saveStatistics(updatedStats);
    toast({
      title: "Registro Excluído",
      description: "O registro foi excluído com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <div className="max-w-4xl mx-auto">
        <DynamicTitle />
        
        <div className="grid gap-6 mt-6">
          {statistics.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{stat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Presenças: {stat.attendanceCount}</span>
                      <Input
                        type="number"
                        placeholder="Adicionar pontos/gols"
                        className="w-40"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            handlePointsChange(stat.id, Number(target.value));
                            target.value = '';
                          }
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {stat.pointRecords.map((record) => (
                        <div key={record.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          {editingRecord?.id === stat.id && editingRecord?.recordId === record.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-20"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(stat.id, record.id)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span>{record.points} pontos/gols - {record.date}</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEdit(stat.id, record.id, record.points)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(stat.id, record.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;