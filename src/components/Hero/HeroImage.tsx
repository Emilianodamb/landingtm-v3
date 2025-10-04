import React from 'react';
import type { HeroImageConfig } from '../../types';

interface HeroImageProps {
  imageConfig: HeroImageConfig;
}

/**
 * Componente que renderiza la imagen del Hero con posicionamiento absoluto
 * Optimizado para diferentes breakpoints y accesibilidad
 */
const HeroImage: React.FC<HeroImageProps> = ({ imageConfig }) => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2/5">
      <img
        src={imageConfig.src}
        alt={imageConfig.alt}
        className={imageConfig.className}
        loading="eager"
        decoding="sync"
        // Preload hint para better performance
        fetchPriority="high"
      />
    </div>
  );
};

export default HeroImage;