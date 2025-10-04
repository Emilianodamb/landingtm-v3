import React, { useState } from 'react';
import Logo from './Header/Logo';
import Navigation from './Header/Navigation';
import MobileMenu from './Header/MobileMenu';
import MobileMenuButton from './Header/MobileMenuButton';
import { HEADER_CONFIG } from '../config/businessConfig';
import type { HeaderProps } from '../types';

/**
 * Componente Header principal con navegación responsive
 * Configuración centralizada en businessConfig.ts
 */
const Header: React.FC<HeaderProps> = ({
  logo = HEADER_CONFIG.logo,
  navigationItems = HEADER_CONFIG.navigationItems,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40">
      <div className="w-full md:max-w-[1280px] md:mx-auto">
        <div className="flex items-center justify-between h-20 px-4 md:px-8">
          {/* Logo */}
          <Logo 
            src={logo} 
            alt={HEADER_CONFIG.logoAlt}
          />

          {/* Desktop Navigation */}
          <Navigation 
            navigationItems={navigationItems}
            ctaButton={HEADER_CONFIG.ctaButton}
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          navigationItems={navigationItems}
          ctaButton={HEADER_CONFIG.ctaButton}
        />
      </div>
    </header>
  );
};

export default Header;