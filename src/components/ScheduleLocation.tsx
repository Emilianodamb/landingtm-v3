import React from 'react';
import type { ScheduleLocationProps } from '../types';

const ScheduleLocation: React.FC<ScheduleLocationProps> = ({
  
}) => {
  return (
    <section className="bg-white p-8">
      {/* Horarios, ubicación y mapa - Mobile First */}
      <div className="text-center text-gray-500">
        [Horarios, ubicación y mapa]
      </div>
    </section>
  );
};

export default ScheduleLocation;