import React from 'react';
import type { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({
  
}) => {
  return (
    <header className="bg-white p-4 border-b">
      {/* Header - Mobile First */}
      <div className="text-center text-gray-500">
        [Header]
      </div>
    </header>
  );
};

export default Header;