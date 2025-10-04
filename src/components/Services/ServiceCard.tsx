import React from 'react';
import type { Service } from '../../types';
import { ServiceIconRenderer } from '../../config/serviceIcons';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  return (
    <div className={`bg-[#e5e5e5] rounded shadow-sm text-center p-4 hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Ícono del servicio */}
      <div className="mb-4">
        <ServiceIconRenderer type={service.icon} />
      </div>
      
      {/* Título del servicio */}
      <h4 className="font-bold text-lg uppercase text-gray-900 mb-2">
        {service.title}
      </h4>
      
      {/* Descripción del servicio */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {service.description}
      </p>
      
      {/* Badge de categoría (opcional) */}
      {service.category && (
        <div className="mt-3">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {service.category}
          </span>
        </div>
      )}
      
      {/* Badge de destacado (opcional) */}
      {service.featured && (
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
            Destacado
          </span>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;