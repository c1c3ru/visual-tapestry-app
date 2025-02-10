import React, { useState } from 'react';
import BackToDashboard from './BackToDashboard';
import { DynamicTitle } from './DynamicTitle';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { useStatisticsStore } from "@/stores/useStatisticsStore";

const Statistics = () => {
  const { statistics, updateStatistic, removeStatistic } = useStatisticsStore();

  const [editingRecord, setEditingRecord] = useState<{index: number, recordIndex: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const { toast } = useToast();

  const handleEdit = (index: number, recordIndex: number, currentPoints?: number) => {
    setEditingRecord({ index, recordIndex });
    setEditValue(currentPoints?.toString() || statistics[index].pointRecords[recordIndex].points.toString());
  };

  const handleSave = () => {
    if (editingRecord !== null) {
      const { index, recordIndex } = editingRecord;
      const updatedPointRecords = [...statistics[index].pointRecords];
      updatedPointRecords[recordIndex].points = parseInt(editValue, 10);
      
      const updatedStatistic = {
        ...statistics[index],
        pointRecords: updatedPointRecords,
        lastUpdated: new Date().toISOString()
      };

      updateStatistic(index, updatedStatistic);
      setEditingRecord(null);
      setEditValue('');
      
      toast({
        title: "Registro atualizado",
        description: "O registro de pontos foi atualizado com sucesso.",
      });
    }
  };

  const handleDelete = (index: number, recordIndex?: number) => {
    if (typeof recordIndex === 'undefined') {
      // Delete entire statistic
      removeStatistic(index);
      toast({
        title: "Estatística removida",
        description: "A estatística foi removida com sucesso.",
      });
    } else {
      // Delete specific record
      const updatedStatistic = { ...statistics[index] };
      updatedStatistic.pointRecords.splice(recordIndex, 1);
      updatedStatistic.lastUpdated = new Date().toISOString();
      
      updateStatistic(index, updatedStatistic);
      toast({
        title: "Registro Excluído",
        description: "O registro foi excluído com sucesso.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <DynamicTitle />
        </div>

        <div className="space-y-4">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{stat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Data: {stat.date}</p>
                <p>Presenças: {stat.attendanceCount}</p>
                <p>Última atualização: {stat.lastUpdated}</p>
                <div className="space-y-2">
                  {stat.pointRecords.map((record, recordIndex) => (
                    <div key={recordIndex} className="flex items-center gap-4">
                      {editingRecord?.index === index && editingRecord.recordIndex === recordIndex ? (
                        <>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleSave}>
                            <Save className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p>{record.points} pontos em {record.date}</p>
                          <Button onClick={() => handleEdit(index, recordIndex)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <Button onClick={() => handleDelete(index)} variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
