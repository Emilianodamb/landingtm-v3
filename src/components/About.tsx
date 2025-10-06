import React from 'react';
import type { AboutProps } from '../types';
import { AboutItemCard, TestimonialCarousel } from './About/index';
import { 
  ABOUT_ITEMS_CONFIG, 
  TESTIMONIALS_CONFIG, 
  TESTIMONIALS_CAROUSEL_CONFIG 
} from '../config/businessConfig';

const About: React.FC<AboutProps> = ({
  title = "POR QUÉ ELEGIRNOS",
  subtitle = "La mecánica es nuestro oficio, pero el cuidado de su vehículo es nuestra pasión. Desde que abrimos nuestras puertas, nos hemos guiado por un principio simple: tratar cada coche como si fuera nuestro.",
  aboutItems = ABOUT_ITEMS_CONFIG,
  testimonials = TESTIMONIALS_CONFIG,
  testimonialsConfig = TESTIMONIALS_CAROUSEL_CONFIG,
  className = ""
}) => {
  return (
    <>
      {/* Sección About - Primera parte */}
      <section id="about" className={className}>
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 flex flex-col gap-4">
          {/* Encabezado - Centrado y consistente */}
          <div className="text-center mb-4">
            <h3 className="text-2xl mt-2 font-bold uppercase text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>

          {/* Grid de items About - Exactamente igual al original */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutItems.map((item) => (
              <AboutItemCard key={item.title} item={item} />
            ))}  
          </div>
        </div>
      </section>

      {/* Sección Testimoniales - Segunda parte */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <TestimonialCarousel 
            testimonials={testimonials}
            config={testimonialsConfig}
          />
        </div>
      </section>
    </>
  );
};

export default About;