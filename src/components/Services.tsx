import React from 'react';
import type { ServicesProps } from '../types';
import { ServiceCard } from './Services/index';
import { SERVICES_CONFIG } from '../config/businessConfig';

const Services: React.FC<ServicesProps> = ({
  title = 'Qué servicios ofrecemos',
  subtitle = 'Ofrecemos un amplio abanico de servicios para mantener tu auto en condiciones óptimas.',
  services = SERVICES_CONFIG,
  className = '',
}) => {
  return (
    <section id="services" className={`bg-gray-300 pt-4 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h3 className="text-2xl mt-2 font-bold uppercase text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid responsivo de tarjetas de servicio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="relative" // Para badges posicionados
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;