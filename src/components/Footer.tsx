import React from 'react';
import type { FooterProps } from '../types';

const Footer: React.FC<FooterProps> = ({
  
}) => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      {/* Footer - Mobile First */}
      <div className="text-center text-gray-400">
        [Footer]
      </div>
    </footer>
  );
};

export default Footer;