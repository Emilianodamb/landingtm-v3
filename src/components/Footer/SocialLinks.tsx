import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { SocialMedia } from '../../types';

interface SocialLinksProps {
  socialLinks: SocialMedia[];
  title?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
}

/**
 * Componente para redes sociales con iconos MUI y efectos hover profesionales
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ 
  socialLinks, 
  title = "Síguenos",
  showLabels = false,
  size = 'md',
  layout = 'horizontal'
}) => {
  const getIcon = (iconType: string) => {
    const iconMap = {
      facebook: FacebookIcon,
      instagram: InstagramIcon,
      whatsapp: WhatsAppIcon,
      youtube: YouTubeIcon,
      twitter: TwitterIcon,
      linkedin: LinkedInIcon,
      tiktok: InstagramIcon, // Placeholder para TikTok
    };

    return iconMap[iconType as keyof typeof iconMap] || FacebookIcon;
  };

  const getSizeClasses = () => {
    const sizeMap = {
      sm: {
        container: 'w-8 h-8',
        icon: { fontSize: 18 },
        text: 'text-xs',
      },
      md: {
        container: 'w-10 h-10',
        icon: { fontSize: 20 },
        text: 'text-sm',
      },
      lg: {
        container: 'w-12 h-12',
        icon: { fontSize: 24 },
        text: 'text-base',
      },
    };

    return sizeMap[size];
  };

  const sizeClasses = getSizeClasses();
  const containerClass = layout === 'horizontal' 
    ? 'flex items-center gap-4' 
    : 'space-y-4';

  return (
    <div className="space-y-4">
      {/* Título */}
      {title && (
        <h4 className="text-lg font-bold text-white mb-6 relative">
          {title}
          <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500"></div>
        </h4>
      )}

      {/* Lista de redes sociales */}
      <div className={containerClass}>
        {socialLinks.map((social) => {
          const IconComponent = getIcon(social.icon);
          
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center transition-all duration-300"
              aria-label={`Síguenos en ${social.name}`}
            >
              {/* Contenedor del icono */}
              <div 
                className={`
                  ${sizeClasses.container}
                  bg-gray-700 rounded-full flex items-center justify-center
                  group-hover:scale-110 transition-all duration-300
                  group-hover:shadow-lg group-hover:shadow-opacity-25
                `}
                style={{
                  boxShadow: `0 4px 15px ${social.hoverColor || social.color}40`,
                }}
              >
                <IconComponent 
                  sx={{ 
                    fontSize: sizeClasses.icon.fontSize,
                    color: '#9CA3AF',
                    transition: 'color 0.3s ease',
                  }}
                  className="group-hover:text-white"
                  style={{
                    color: social.color,
                  }}
                />
              </div>

              {/* Etiqueta opcional */}
              {showLabels && (
                <span className={`
                  ml-3 font-medium text-gray-300 group-hover:text-white 
                  transition-colors duration-300 ${sizeClasses.text}
                `}>
                  {social.name}
                </span>
              )}
            </a>
          );
        })}
      </div>

      {/* Mensaje adicional */}
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        Mantente conectado con nosotros para recibir consejos, promociones y novedades sobre el cuidado de tu vehículo.
      </p>
    </div>
  );
};

export default SocialLinks;