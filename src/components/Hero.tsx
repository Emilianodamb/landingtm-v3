import React from 'react';
import HeroContent from './Hero/HeroContent';
import HeroImage from './Hero/HeroImage';
import { HERO_CONFIG } from '../config/businessConfig';
import type { HeroProps } from '../types';

/**
 * Componente Hero principal que integra contenido e imagen
 * Configuración centralizada en businessConfig.ts
 */
const Hero: React.FC<HeroProps> = ({
  title = HERO_CONFIG.title,
  subtitle = HERO_CONFIG.subtitle,
  ctaText = HERO_CONFIG.ctaText,
  ctaHref = HERO_CONFIG.ctaHref,
  heroImage = HERO_CONFIG.heroImage,
  className = ""
}) => {
  return (
    <section 
      id="home" 
      className={`relative flex flex-col items-center justify-center text-center pt-36 pb-20 sm:pb-32 md:pb-40 px-4 md:px-8 ${className}`}
      aria-label="Sección principal de bienvenida"
    >
      {/* Contenido principal centrado */}
      <HeroContent
        title={title}
        subtitle={subtitle}
        ctaText={ctaText}
        ctaHref={ctaHref}
      />
      
      {/* Imagen del hero */}
      <HeroImage imageConfig={heroImage} />
    </section>
  );
};  

export default Hero;