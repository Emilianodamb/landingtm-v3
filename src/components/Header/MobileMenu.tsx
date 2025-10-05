import React, { useEffect, useRef } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
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
 * Incluye detección de sección activa y subrayado rojo
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  ctaButton,
}) => {
  const { activeSection, isAtTop } = useActiveSection();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const getSectionFromHref = (href: string) => {
    return href.replace('#', '');
  };

  const isActive = (href: string) => {
    if (isAtTop) return false; // No mostrar activos cuando estamos en el top
    const section = getSectionFromHref(href);
    return activeSection === section;
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile menu is open (sin cambiar viewport width)
  useEffect(() => {
    if (isOpen) {
      // Calcular el ancho del scrollbar solo cuando sea necesario
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      // Prevenir scroll sin cambiar el ancho del viewport
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Panel */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-56 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out"
      >
          <div className="flex flex-col h-full bg-white shadow-2xl" style={{filter: 'drop-shadow(-8px 0 16px rgba(0, 0, 0, 0.4)) drop-shadow(-4px 0 8px rgba(0, 0, 0, 0.2))'}}>
            {/* Menu Header */}
          <div className="flex justify-end p-4 mt-1 bg-white">
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
          <nav className="flex-1 px-4 py-6 bg-white" role="navigation">
            <ul className="space-y-6 text-right">
              {navigationItems.map((item, index) => (
                <li key={index} className="text-right">
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className={`
                      relative inline-block text-lg font-semibold text-gray-900 py-2
                      transition-all duration-300
                      hover:text-gray-700
                      after:absolute after:bottom-1 after:left-0 after:h-0.5 after:bg-red-500
                      after:transition-all after:duration-300 after:ease-in-out
                      ${isActive(item.href) 
                        ? 'after:w-full text-gray-900' 
                        : 'after:w-0 hover:after:w-full'
                      }
                    `}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <a
              href={ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 text-sm font-bold border border-transparent shadow-md rounded-none transition-all duration-300 ease-in-out uppercase text-center text-black bg-yellow-300 shadow-red-600 hover:bg-red-600 hover:text-white hover:shadow-yellow-600"
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