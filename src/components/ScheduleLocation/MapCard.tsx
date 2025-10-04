import React from 'react';
import type { MapConfig } from '../../types';

interface MapCardProps {
  mapConfig: MapConfig;
  businessName: string;
}

const MapCard: React.FC<MapCardProps> = ({ mapConfig, businessName }) => {
  // Íconos usando emojis
  const LocationIcon = () => <span className="text-sm">📍</span>;

  return (
    <div className="bg-[#e5e5e5] rounded shadow-lg overflow-hidden col-span-1 md:col-span-2 lg:col-span-1 min-h-[400px]">
      <div className="relative h-full min-h-[400px] bg-gray-200">
        {/* Mapa embebido */}
        <iframe
          src={mapConfig.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
          title={`Ubicación ${businessName}`}
        />
        
        {/* Botón para abrir en Google Maps */}
        <div className="absolute bottom-4 right-4">
          <a
            href={mapConfig.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-red-600 text-black hover:text-white px-3 py-2 rounded shadow-lg transition-all duration-300 text-xs font-medium flex items-center gap-1"
          >
            <LocationIcon />
            Ver en Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default MapCard;