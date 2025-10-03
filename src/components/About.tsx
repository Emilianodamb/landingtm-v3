import React from 'react';
import type { AboutProps } from '../types';

const About: React.FC<AboutProps> = ({
  
}) => {
  return (
    <section className="bg-white p-8">
      {/* Sobre nosotros - Mobile First */}
      <div className="text-center text-gray-500">
        [Sobre nosotros]
      </div>
    </section>
  );
};

export default About;