import React from 'react';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedIcon from '@mui/icons-material/Verified';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { AboutItem, AboutIcon } from '../../types';

// Objeto con todos los iconos disponibles - Igual al original
const icons: Record<AboutIcon, React.ComponentType<any>> = {
  EngineeringIcon,
  HandshakeIcon,
  VerifiedIcon,
  CreditCardIcon,
};

interface AboutItemCardProps {
  item: AboutItem;
}

/**
 * Componente individual para mostrar un item de About
 * Réplica exacta del diseño original con iconos MUI
 */
const AboutItemCard: React.FC<AboutItemCardProps> = ({ item }) => {
  const IconComponent = icons[item.icon];

  return (
    <div className="bg-white rounded shadow-sm text-center p-4 flex flex-col gap-2">
      {/* Ícono - Exactamente igual al original */}
      <div>
        <IconComponent sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />
      </div>
      
      {/* Título - Exactamente igual al original */}
      <h5 className="font-semibold uppercase">{item.title}</h5>
      
      {/* Descripción - Exactamente igual al original */}
      <p>{item.desc}</p>
    </div>
  );
};

export default AboutItemCard;