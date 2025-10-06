import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import type { FooterSection as FooterSectionType } from '../../types';

interface FooterSectionProps {
  section: FooterSectionType;
}

/**
 * Componente modular para cada sección del footer
 * Renderiza títulos, enlaces y descripciones con iconos apropiados
 */
const FooterSection: React.FC<FooterSectionProps> = ({ section }) => {
  const getIcon = (iconName?: string) => {
    const iconMap = {
      location: LocationOnIcon,
      phone: PhoneIcon,
      email: EmailIcon,
      whatsapp: WhatsAppIcon,
    };

    const IconComponent = iconName ? iconMap[iconName as keyof typeof iconMap] : null;
    
    if (!IconComponent) return null;

    return (
      <IconComponent 
        sx={{ 
          fontSize: 16, 
          color: '#9CA3AF',
          marginRight: 1 
        }} 
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Título de la sección */}
      <h4 className="text-xl font-bold text-white mb-6 relative uppercase">
        {section.title}
        <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-yellow-400"></div>
      </h4>

      {/* Enlaces de la sección */}
      <ul className="space-y-3">
        {section.links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.isExternal ? '_blank' : '_self'}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="group flex items-start text-gray-300 hover:text-white transition-all duration-300 ease-in-out"
            >
              {/* Icono opcional */}
              {getIcon(link.icon)}
              
              <div className="flex-grow">
                {/* Etiqueta del enlace */}
                <div className="font-medium group-hover:text-yellow-400 transition-colors duration-300">
                  {link.label}
              </div>
                
                {/* Descripción opcional */}
                {link.description && (
                  <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                    {link.description}
                  </div>
                )}
              </div>

              {/* Indicador de enlace externo */}
              {link.isExternal && (
                <svg 
                  className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 ml-2 flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;