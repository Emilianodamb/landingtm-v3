import React from 'react';
import type { ServiceIcon, IconConfig } from '../types';
import {
  AcUnit,
  DirectionsCar,
  Search,
  Build,
  Computer,
  Stop,
  Settings,
  ElectricalServices,
  Tune,
  HomeRepairService,
} from '@mui/icons-material';

// Mapeo de iconos usando MUI Material Icons - Estética replicada de About cards
export const SERVICE_ICONS: Record<ServiceIcon, IconConfig> = {
  maintenance: {
    component: () => <Build sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  inspection: {
    component: () => <Search sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  generalMechanics: {
    component: () => <HomeRepairService sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  diagnostic: {
    component: () => <Computer sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  airConditioning: {
    component: () => <AcUnit sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  suspension: {
    component: () => <DirectionsCar sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  brakes: {
    component: () => <Stop sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  engine: {
    component: () => <Settings sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  electrical: {
    component: () => <ElectricalServices sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
    color: '#FFDA36',
    style: { filter: 'drop-shadow(0px 0px 1px red)' },
  },
  transmission: {
    component: () => <Tune sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />,
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