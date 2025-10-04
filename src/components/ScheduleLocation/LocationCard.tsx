import React from 'react';
import type { LocationConfig } from '../../types';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface LocationCardProps {
  locationConfig: LocationConfig;
  directionsUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ locationConfig, directionsUrl }) => {
  // Íconos usando emojis
  const LocationIcon = () => <span className="text-5xl">📍</span>;
  const DirectionsIcon = () => <span className="text-lg">🚗</span>;

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

        {/* Información de contacto */}
        {locationConfig.contact && (
          <div className="mt-4 space-y-1">
            {locationConfig.contact.phone && (
              <p className="text-sm">
                <WhatsAppIcon className="text-green-600" />
                {locationConfig.contact.phone}
              </p>
            )}
            {locationConfig.contact.email && (
              <p className="text-sm">
                ✉️ {locationConfig.contact.email}
              </p>
            )}
          </div>
        )}

        {/* Botón Cómo Llegar */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center border border-transparent text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-md rounded px-4 py-2 transition-all duration-300 ease-in-out gap-2 mt-4"
        >
          <DirectionsIcon />
          Cómo Llegar
        </a>
      </div>
    </div>
  );
};

export default LocationCard;