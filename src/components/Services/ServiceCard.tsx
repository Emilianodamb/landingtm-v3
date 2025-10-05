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
    </div>
  );
};

export default ServiceCard;