import React from 'react';
import type { HeroProps } from '../types';

const Hero: React.FC<HeroProps> = ({
  
}) => {
  return (
    // Contenedor principal del Hero con padding-top para compensar el header fixed
    <section id="home" className="relative flex flex-col items-center justify-center text-center pt-36 pb-20 sm:pb-32 md:pb-40 px-4 md:px-8">
      {/* Contenedor del contenido principal centrado */}
      <div className="max-w-4xl mx-auto">
        {/* Título principal */}
        <h1 className="text-4xl px-1 md:text-5xl lg:text-6xl font-extrabold text-gray-900 uppercase mb-6">
          Tu taller mecánico de confianza en Zona Sur
        </h1>
        
        {/* Párrafo descriptivo */}
        <p className="text-xl md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Atención profesional, diagnósticos precisos y soluciones confiables para tu vehículo. 
          Más de 40 años de experiencia en Zona Sur. Reservá tu turno por WhatsApp.
        </p>
        
        {/* Botón CTA */}
        <div className="mb-16">
          <a
            href="#contact"
            className="inline-block bg-yellow-300 text-black font-bold text-lg uppercase px-8 py-4 rounded-none hover:bg-yellow-400 transition-colors duration-300"
          >
            Contactanos ahora
          </a>
        </div>
      </div>
      
      {/* Imagen que sobresale hacia abajo */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2/5">
        <img
          src="/2008azultm.png"
          alt="Auto de muestra"
          className="max-w-xs sm:max-w-md md:max-w-lg object-contain"
        />
      </div>
    </section>
  );
};  

export default Hero;