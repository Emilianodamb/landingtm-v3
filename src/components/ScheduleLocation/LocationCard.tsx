import React from 'react';
import type { LocationConfig } from '../../types';
import { LocationOn, Directions } from '@mui/icons-material';

interface LocationCardProps {
  locationConfig: LocationConfig;
  directionsUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ locationConfig, directionsUrl }) => {
  // Íconos MUI con estética consistente con Services y About
  const LocationIcon = () => <LocationOn sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />;

  return (
    <div className="bg-[#e5e5e5] rounded shadow-lg text-center p-6 min-h-[400px] flex flex-col">
      {/* Ícono */}
      <div className="mb-4">
        <LocationIcon />
      </div>
      
      {/* Título */}
      <h4 className="font-bold text-lg uppercase text-gray-900 mb-4">
        Nuestra Ubicación
      </h4>
      
      {/* Información de ubicación */}
      <div className="space-y-2 text-gray-600 mb-4 flex-grow flex flex-col justify-center">
        <div>
          <p className="font-semibold text-gray-900">{locationConfig.address.street}</p>
          <p>{locationConfig.address.city}, {locationConfig.address.state}</p>
          <p>{locationConfig.address.country}</p>
          
          {/* Badge de zona */}
          <div className="inline-flex items-center bg-yellow-100 px-3 py-1 rounded-full mt-2">
            <span className="text-sm mr-1">📍</span>
            <span className="text-gray-800 text-sm font-medium">
              Zona Sur - Fácil acceso
            </span>
          </div>
        </div>

        {/* Botón Cómo Llegar con estética CTA */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center border border-transparent text-lg font-bold shadow-md rounded-none gap-2 transition-all duration-300 ease-in-out px-8 py-4 uppercase text-black bg-yellow-300 shadow-red-600 hover:bg-red-600 hover:text-white hover:shadow-yellow-600 mt-4 [&_svg]:transition-colors [&_svg]:duration-300"
        >
          <Directions sx={{ fontSize: 18 }} />
          Cómo Llegar
        </a>
      </div>
    </div>
  );
};

export default LocationCard;