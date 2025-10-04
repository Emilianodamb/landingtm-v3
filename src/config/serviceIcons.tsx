import React from 'react';
import type { ServiceIcon, IconConfig } from '../types';

// Mapeo de iconos usando emojis (más tarde se puede cambiar por MUI icons)
// Mantiene la consistencia visual del diseño original
export const SERVICE_ICONS: Record<ServiceIcon, IconConfig> = {
  maintenance: {
    component: () => <span className="text-6xl">🔧</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  inspection: {
    component: () => <span className="text-6xl">🔍</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  injection: {
    component: () => <span className="text-6xl">⚡</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  diagnostic: {
    component: () => <span className="text-6xl">💻</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  airConditioning: {
    component: () => <span className="text-6xl">❄️</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  suspension: {
    component: () => <span className="text-6xl">🚗</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  brakes: {
    component: () => <span className="text-6xl">🛑</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  engine: {
    component: () => <span className="text-6xl">🔩</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  electrical: {
    component: () => <span className="text-6xl">🔌</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  transmission: {
    component: () => <span className="text-6xl">⚙️</span>,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
};

/**
 * Hook para obtener la configuración de un icono específico
 */
export function useServiceIcon(iconType: ServiceIcon): IconConfig {
  return SERVICE_ICONS[iconType];
}

/**
 * Componente reutilizable para renderizar iconos de servicios
 */
export const ServiceIconRenderer: React.FC<{ type: ServiceIcon; className?: string }> = ({ 
  type, 
  className = '' 
}) => {
  const iconConfig = useServiceIcon(type);
  const IconComponent = iconConfig.component;
  
  return (
    <div 
      className={className}
      style={{
        color: iconConfig.color,
        ...iconConfig.style,
      }}
    >
      <IconComponent />
    </div>
  );
};