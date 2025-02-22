
import React, { ReactNode } from 'react';

interface PresenceHeaderProps {
  children: ReactNode;
}

export const PresenceHeader: React.FC<PresenceHeaderProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between mb-6">
      {children}
    </header>
  );
};
