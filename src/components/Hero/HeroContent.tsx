import React from 'react';

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Componente que renderiza el contenido principal del Hero
 * Incluye título, subtítulo y botón de call-to-action
 */
const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  ctaText,
  ctaHref,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Título principal */}
      <h1 className="text-4xl px-1 md:text-5xl lg:text-6xl font-extrabold text-gray-900 uppercase mb-6">
        {title}
      </h1>
      
      {/* Párrafo descriptivo */}
      <p className="text-xl md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      
      {/* Botón CTA */}
      <div className="mb-16">
        <a
          href={ctaHref}
          className="inline-block bg-yellow-300 text-black font-bold text-lg uppercase px-8 py-4 rounded-none hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          aria-label={`${ctaText} - Ir a la sección de contacto`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default HeroContent;