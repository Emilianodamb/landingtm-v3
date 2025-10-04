import React from 'react';
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
 * Incluye enlaces de navegación y botón CTA
 */
const Navigation: React.FC<NavigationProps> = ({ navigationItems, ctaButton }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8" role="navigation">
      {navigationItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.isExternal ? '_blank' : '_self'}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className="font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300"
        >
          {item.label}
        </a>
      ))}
      
      <a
        href={ctaButton.href}
        className="ml-4 px-4 py-2 text-sm font-bold uppercase bg-yellow-300 text-black hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
      >
        {ctaButton.text}
      </a>
    </nav>
  );
};

export default Navigation;