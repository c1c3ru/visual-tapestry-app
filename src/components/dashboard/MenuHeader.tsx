
import React from 'react';

interface MenuHeaderProps {
  menuTitle: string;
  isAdmin: boolean;
  setMenuTitle: (title: string) => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  menuTitle,
  isAdmin,
  setMenuTitle,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800">
        {isAdmin ? (
          <input
            type="text"
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
          />
        ) : (
          menuTitle
        )}
      </h1>
    </div>
  );
};
