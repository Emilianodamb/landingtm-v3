import React, { useEffect } from 'react';
import type { NavigationItem } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  ctaButton: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
}

/**
 * Componente de menú móvil deslizable
 * Incluye navegación, backdrop y animaciones
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  ctaButton,
}) => {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mobile Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-56 backdrop-blur-xs shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-end p-4 mt-1">
            <button
              onClick={onClose}
              className="p-2 focus:outline-none hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6" role="navigation">
            <ul className="space-y-6 text-right">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="block text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2"
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t">
            <a
              href={ctaButton.href}
              className="block w-full px-6 py-3 text-sm font-bold bg-yellow-300 text-black hover:bg-yellow-400 transition-colors uppercase text-center"
              onClick={onClose}
            >
              {ctaButton.text}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;