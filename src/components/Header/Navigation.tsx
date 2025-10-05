import React from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { NavigationItem } from '../../types';

interface NavigationProps {
  navigationItems: NavigationItem[];
  ctaButton: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
}

/**
 * Componente de navegación para desktop
 * Incluye detección de sección activa y subrayado rojo
 */
const Navigation: React.FC<NavigationProps> = ({ navigationItems, ctaButton }) => {
  const activeSection = useActiveSection();
  
  const getSectionFromHref = (href: string) => {
    return href.replace('#', '');
  };

  const isActive = (href: string) => {
    const section = getSectionFromHref(href);
    return activeSection === section;
  };

  return (
    <nav className="hidden md:flex items-baseline justify-end space-x-4 lg:space-x-6 ml-8 lg:ml-12 flex-1" role="navigation">
      {navigationItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.isExternal ? '_blank' : '_self'}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className={`
            relative font-semibold text-gray-900 transition-all duration-300 pb-1
            hover:text-gray-700
            after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-red-500
            after:transition-all after:duration-300 after:ease-in-out
            ${isActive(item.href) 
              ? 'after:w-full text-gray-900' 
              : 'after:w-0 hover:after:w-full'
            }
          `}
        >
          {item.label}
        </a>
      ))}
      
      <a
        href={ctaButton.href}
        className="inline-flex items-center border border-transparent text-sm font-bold shadow-md rounded-none gap-2 transition-all duration-300 ease-in-out px-6 py-3 uppercase text-black bg-yellow-300 shadow-red-600 hover:bg-red-600 hover:text-white hover:shadow-yellow-600 whitespace-nowrap"
      >
        {ctaButton.text}
      </a>
    </nav>
  );
};

export default Navigation;