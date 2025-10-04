import React from 'react';
import type { Brand } from '../../types';

interface BrandItemProps {
  brand: Brand;
}

/**
 * Componente individual de marca - Réplica exacta del diseño original
 */
const BrandItem: React.FC<BrandItemProps> = ({ brand }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Fallback si la imagen no carga - Exactamente igual al original
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" fill="#f3f4f6"/>
        <text x="30" y="35" font-family="Arial" font-size="8" text-anchor="middle" fill="#6b7280">
          ${brand.name}
        </text>
      </svg>
    `)}`;
  };

  return (
    <div className="p-1">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square flex items-center justify-center group">
        <img
          src={brand.logo}
          alt={brand.alt}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain transition-all duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default BrandItem;