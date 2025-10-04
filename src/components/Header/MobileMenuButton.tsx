import React from 'react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Botón hamburguesa animado para menú móvil
 */
const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="relative p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-md"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default MobileMenuButton;