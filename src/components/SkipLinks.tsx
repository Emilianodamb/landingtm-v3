import React from 'react';

/**
 * Skip Links para mejorar accesibilidad
 * Permite a usuarios de teclado/lectores de pantalla saltar al contenido principal
 */
const SkipLinks: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 z-50 p-4 bg-yellow-400 text-black font-bold transition-transform transform -translate-y-full focus:translate-y-0"
      >
        Saltar al contenido principal
      </a>
      <a
        href="#navigation"
        className="absolute top-0 left-32 z-50 p-4 bg-yellow-400 text-black font-bold transition-transform transform -translate-y-full focus:translate-y-0"
      >
        Ir a navegación
      </a>
      <a
        href="#contact"
        className="absolute top-0 left-64 z-50 p-4 bg-yellow-400 text-black font-bold transition-transform transform -translate-y-full focus:translate-y-0"
      >
        Ir a contacto
      </a>
    </div>
  );
};

export default SkipLinks;