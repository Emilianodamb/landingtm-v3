import React from 'react';
import FooterSection from './Footer/FooterSection';
import SocialLinks from './Footer/SocialLinks';
import { 
  FOOTER_COMPANY_CONFIG, 
  FOOTER_SECTIONS_CONFIG, 
  FOOTER_SOCIAL_CONFIG
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
              {/* Logo o título de la empresa - Consistente con otros componentes */}
              <h3 className="text-2xl font-bold text-white mb-4 relative uppercase">
                {companyInfo.name}
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-yellow-400"></div>
              </h3>
              
              {/* Descripción */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {companyInfo.description}
              </p>

              {/* Año de fundación */}
              <div className="inline-flex items-center px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors duration-300">
                <span className="text-yellow-400 font-bold mr-2 uppercase text-sm">
                  Desde {companyInfo.foundedYear}
                </span>
                <span className="text-gray-300 text-sm font-medium">
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

      </div>

      {/* Sección inferior centrada: Redes sociales y Copyright */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center gap-8">
            
            {/* Redes sociales - Arriba */}
            <div>
              <SocialLinks 
                socialLinks={socialLinks}
                title="Conecta con nosotros"
                size="md"
                layout="horizontal"
                showLabels={false}
              />
            </div>

            {/* Copyright - Abajo */}
            <div>
              <p className="text-gray-400 text-sm">
                © {currentYear} <span className="text-white font-medium">{companyInfo.name}</span>.
                Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Desarrollado con ❤️ para brindar el mejor servicio automotriz
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;