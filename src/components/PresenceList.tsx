import React, { useState } from 'react';

const PresenceList = () => {
  const [presence, setPresence] = useState<{ name: string; present: boolean }[]>(
    [
      { name: 'João', present: true },
      { name: 'Maria', present: false },
    ]
  );

  const togglePresence = (index: number) => {
    setPresence((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, present: !item.present } : item
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Lista de Presença</h2>
      <ul className="space-y-2">
        {presence.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-gray-100 rounded shadow"
          >
            <p className="font-semibold">{item.name}</p>
            <button
              onClick={() => togglePresence(index)}
              className={`px-4 py-2 rounded ${
                item.present
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {item.present ? 'Presente' : 'Ausente'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresenceList;
