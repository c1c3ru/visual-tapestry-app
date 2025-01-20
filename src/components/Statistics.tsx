import React, { useState, useEffect } from 'react';
import { BackToDashboard } from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

interface PointRecord {
  points: number;
  date: string;
}

interface Statistic {
  name: string;
  date: string;
  attendanceCount: number;
  pointRecords: PointRecord[];
  lastUpdated: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [editingRecord, setEditingRecord] = useState<{index: number, recordIndex: number} | null>(null);
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
      date: new Date().toISOString(),
    };

    const updatedStatistics = [...statistics];
    updatedStatistics[index].pointRecords.push(newRecord);
    updatedStatistics[index].lastUpdated = new Date().toISOString();
    saveStatistics(updatedStatistics);

    toast({
      title: "Pontos Atualizados",
      description: "Os pontos foram atualizados com sucesso.",
    });
  };

  const handleEdit = (index: number, recordIndex: number, currentPoints: number) => {
    setEditingRecord({ index, recordIndex });
    setEditValue(currentPoints.toString());
  };

  const handleSaveEdit = (index: number, recordIndex: number) => {
    const updatedStatistics = [...statistics];
    updatedStatistics[index].pointRecords[recordIndex].points = Number(editValue);
    updatedStatistics[index].lastUpdated = new Date().toISOString();
    saveStatistics(updatedStatistics);
    setEditingRecord(null);
    setEditValue('');

    toast({
      title: "Registro Atualizado",
      description: "O registro foi atualizado com sucesso.",
    });
  };

  const handleDelete = (index: number, recordIndex: number) => {
    const updatedStatistics = [...statistics];
    updatedStatistics[index].pointRecords.splice(recordIndex, 1);
    updatedStatistics[index].lastUpdated = new Date().toISOString();
    saveStatistics(updatedStatistics);

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
          {statistics.length === 0 ? (
            <p>Nenhuma estatística disponível.</p>
          ) : (
            statistics.map((stat, index) => (
              <motion.div
                key={index}
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
                              handlePointsChange(index, Number(target.value));
                              target.value = '';
                            }
                          }}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        {stat.pointRecords.map((record, recordIndex) => (
                          <div key={recordIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            {editingRecord?.index === index && editingRecord?.recordIndex === recordIndex ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-20"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(index, recordIndex)}
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
                                    onClick={() => handleEdit(index, recordIndex, record.points)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDelete(index, recordIndex)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;