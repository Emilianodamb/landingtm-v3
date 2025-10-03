import React from 'react';
import type { HeroProps } from '../types';

const Hero: React.FC<HeroProps> = ({
  
}) => {
  return (
    <section className="bg-gray-50 p-8 min-h-[50vh] flex items-center justify-center">
      {/* Hero - Mobile First */}
      <div className="text-center text-gray-500">
        [Hero]
      </div>
    </section>
  );
};

export default Hero;