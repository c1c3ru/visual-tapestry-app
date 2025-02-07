
import React from 'react';

interface DashboardHeaderProps {
  dashboardTitle: string;
  isAdmin: boolean;
  setDashboardTitle: (title: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dashboardTitle,
  isAdmin,
  setDashboardTitle,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800">
        {isAdmin ? (
          <input
            type="text"
            value={dashboardTitle}
            onChange={(e) => setDashboardTitle(e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
          />
        ) : (
          dashboardTitle
        )}
      </h1>
    </div>
  );
};
