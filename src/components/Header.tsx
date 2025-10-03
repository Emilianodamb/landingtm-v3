import React, { useState, useEffect } from 'react';
import type { HeaderProps, NavigationItem } from '../types';

const defaultNavItems: NavigationItem[] = [
  { label: 'Inicio', href: '#home' },
  { label: 'Servicios', href: '#services' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

const Header: React.FC<HeaderProps> = ({
  logo = '/logotmshadows.png',
  navigationItems = defaultNavItems,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-40">
      {/* Contenedor principal con ancho responsivo y centrado */}
      <div className="w-full md:max-w-[1280px] md:mx-auto">
        {/* Contenedor flex para distribuir logo, navegación y menú móvil */}
        <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        {/* Contenedor del logo con alineación centrada */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Total Mecánica logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.isExternal ? '_blank' : '_self'}
              rel={item.isExternal ? 'noopener noreferrer' : undefined}
              className="font-semibold"
            >
              {item.label}
            </a>
          ))}
          <button className="ml-4 px-4 py-2 text-sm font-bold uppercase">
            Agendar turno
          </button>
        </nav>

        {/* Mobile Menu Button */}
        {/* Contenedor del botón hamburguesa, visible solo en móvil */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="relative p-2 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* Animated hamburger icon */}
            {/* Contenedor para las líneas del ícono hamburguesa animado */}
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out mt-1 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          {/* Overlay oscuro de fondo para cerrar el menú al hacer clic fuera */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu */}
          {/* Panel lateral del menú móvil deslizable desde la derecha */}
          <div className="fixed top-0 right-0 h-full w-56 backdrop-blur-xs shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            {/* Contenedor flex vertical para organizar header, navegación y botón CTA */}
            <div className="flex flex-col h-full">
              {/* Menu Header - Solo botón X a la derecha */}
              {/* Header del menú móvil con botón de cierre alineado a la derecha */}
              <div className="flex justify-end p-4 mt-1">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 focus:outline-none hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
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

              {/* Navigation Links - Alineados a la derecha */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-6 text-right">
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        target={item.isExternal ? '_blank' : '_self'}
                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        className="block text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors py-2"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              {/* Contenedor del botón de llamada a la acción con borde superior */}
              <div className="p-4 border-t">
                <button className="w-full px-6 py-3 text-sm font-bold bg-yellow-300 text-black hover:bg-yellow-400 transition-colors uppercase">
                  Agendar turno
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </header>
  );
};

export default Header;