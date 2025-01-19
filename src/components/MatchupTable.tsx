import React from 'react';

interface MatchupTableProps {
  matchups: string[];
}

const MatchupTable: React.FC<MatchupTableProps> = ({ matchups }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 border-b">Confronto</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup, index) => (
            <tr key={index}>
              <td className="p-2 border-b">{matchup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchupTable;
