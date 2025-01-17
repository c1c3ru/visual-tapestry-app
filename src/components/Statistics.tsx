import React, { useState } from 'react';

interface Statistic {
  name: string;
  points: number;
  date: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    { name: 'João', points: 10, date: '2025-01-15' },
    { name: 'Maria', points: 15, date: '2025-01-15' },
    // Adicione outros participantes conforme necessário
  ]);

  const [isAdmin] = useState(true); // Supondo que você tenha um sistema de autenticação

  const handlePointsChange = (index: number, value: number) => {
    setStatistics((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, points: value } : item
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-teal-600">Estatísticas</h2>
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
              <tr key={index} className="border-b hover:bg-gray-100">
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
                      className="border border-teal-300 p-2 rounded-lg w-20"
                    />
                  ) : (
                    stat.points
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
