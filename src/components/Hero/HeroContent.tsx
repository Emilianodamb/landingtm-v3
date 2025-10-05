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
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-transparent text-lg font-bold shadow-md rounded-none gap-2 transition-all duration-300 ease-in-out px-8 py-4 uppercase text-black bg-yellow-300 shadow-red-600 hover:bg-red-600 hover:text-white hover:shadow-yellow-600"
          aria-label={`${ctaText} - Contactar por WhatsApp`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default HeroContent;