import React from 'react';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Componente del logo del header
 * Optimizado para accesibilidad y SEO
 */
const Logo: React.FC<LogoProps> = ({ src, alt, className = "h-16 w-auto object-contain" }) => {
  return (
    <div className="flex items-center">
      <img
        src={src}
        alt={alt}
        className={className}
        loading="eager"
        decoding="sync"
      />
    </div>
  );
};

export default Logo;