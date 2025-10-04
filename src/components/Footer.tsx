import React from 'react';
import FooterSection from './Footer/FooterSection';
import SocialLinks from './Footer/SocialLinks';
import { 
  FOOTER_COMPANY_CONFIG, 
  FOOTER_SECTIONS_CONFIG, 
  FOOTER_SOCIAL_CONFIG, 
  FOOTER_LEGAL_CONFIG 
} from '../config/businessConfig';
import type { FooterProps } from '../types';

/**
 * Componente Footer profesional con fondo azul oscuro, diseño responsivo
 * y organización modular de contenido
 */
const Footer: React.FC<FooterProps> = ({
  sections = FOOTER_SECTIONS_CONFIG,
  socialLinks = FOOTER_SOCIAL_CONFIG,
  companyInfo = FOOTER_COMPANY_CONFIG,
  legalLinks = FOOTER_LEGAL_CONFIG,
  className = ""
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`bg-gradient-to-b from-gray-900 to-gray-950 text-white ${className}`}
      aria-label="Pie de página"
    >
      {/* Contenido principal del footer */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Columna 1: Información de la empresa */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              {/* Logo o título de la empresa */}
              <h3 className="text-2xl font-bold text-white mb-4 relative">
                {companyInfo.name}
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500"></div>
              </h3>
              
              {/* Descripción */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {companyInfo.description}
              </p>

              {/* Año de fundación */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                <span className="text-yellow-300 font-semibold mr-2">
                  Desde {companyInfo.foundedYear}
                </span>
                <span className="text-gray-400 text-sm">
                  | {currentYear - companyInfo.foundedYear}+ años de experiencia
                </span>
              </div>
            </div>
          </div>

          {/* Columnas 2-4: Secciones del footer */}
          {sections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <div key={section.id} className="lg:col-span-1">
                <FooterSection section={section} />
              </div>
            ))
          }
        </div>

        {/* Redes sociales */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <SocialLinks 
            socialLinks={socialLinks}
            title="Conecta con nosotros"
            size="md"
            layout="horizontal"
            showLabels={false}
          />
        </div>
      </div>

      {/* Sección inferior: Copyright y enlaces legales */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} <span className="text-white font-medium">{companyInfo.name}</span>.
                Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Desarrollado con ❤️ para brindar el mejor servicio automotriz
              </p>
            </div>

            {/* Enlaces legales */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                    title={link.description}
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                Taller autorizado y habilitado
              </div>
              <span className="hidden sm:block">•</span>
              <div>Repuestos originales garantizados</div>
              <span className="hidden sm:block">•</span>
              <div>Financiación disponible</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;