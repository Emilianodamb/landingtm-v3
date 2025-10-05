import React from 'react';
import type { ScheduleLocationProps } from '../types';
import { useBusinessStatus } from '../hooks/useBusinessStatus';
import { HoursCard, LocationCard, MapCard } from './ScheduleLocation/index';
import {
  BUSINESS_CONFIG,
  SCHEDULE_CONFIG,
  LOCATION_CONFIG,
  MAP_CONFIG,
} from '../config/businessConfig';

const ScheduleLocation: React.FC<ScheduleLocationProps> = ({
  businessConfig = BUSINESS_CONFIG,
  scheduleConfig = SCHEDULE_CONFIG,
  locationConfig = LOCATION_CONFIG,
  mapConfig = MAP_CONFIG,
}) => {
  // Hook personalizado que calcula el estado del negocio en tiempo real
  const businessStatus = useBusinessStatus(scheduleConfig);

  return (
    <section className="bg-gray-300 p-8 pt-28 md:pt-36">
      <h2 className="uppercase text-2xl font-bold text-center">Cuándo y dónde encontrarnos</h2>
      <div className="max-w-7xl mx-auto">
        {/* Grid responsive - Mobile First */}
        <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 mt-6 pb-2">
          {/* Componente de Horarios */}
          <HoursCard 
            scheduleConfig={scheduleConfig}
            businessStatus={businessStatus}
          />
          
          {/* Componente de Ubicación */}
          <LocationCard 
            locationConfig={locationConfig}
            directionsUrl={mapConfig.directionsUrl}
          />
          
          {/* Componente de Mapa */}
          <MapCard 
            mapConfig={mapConfig}
            businessName={businessConfig.name}
          />
        </div>
      </div>
    </section>
  );
};

export default ScheduleLocation;
