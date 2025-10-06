import React from 'react';

/**
 * Componente de loading simple y elegante para Suspense fallbacks
 */
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      
      {/* Mensaje de carga */}
      <p className="text-gray-600 mt-4 text-sm font-medium">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;