import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ContactMethod } from '../../types';
import { useBusinessStatus } from '../../hooks/useBusinessStatus';
import { SCHEDULE_CONFIG } from '../../config/businessConfig';

interface ContactInfoProps {
  contactMethods: ContactMethod[];
}

/**
 * Componente que muestra la información de contacto del negocio
 * Incluye métodos de contacto, horarios y ubicación
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ contactMethods }) => {
  // Hook para estado del negocio en tiempo real
  const businessStatus = useBusinessStatus(SCHEDULE_CONFIG);
  
  const iconMap = {
    phone: PhoneIcon,
    email: EmailIcon,
    whatsapp: WhatsAppIcon,
    address: LocationOnIcon,
  };

  return (
    <div className="space-y-4">
      {/* Métodos de contacto */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
          Métodos de contacto
        </h4>
        
        <div className="space-y-3">
          {contactMethods.filter(method => method.available).map((method) => {
            const IconComponent = iconMap[method.type];
            
            return (
              <a
                key={method.id}
                href={method.href}
                target={method.type === 'email' ? '_blank' : '_self'}
                rel={method.type === 'email' ? 'noopener noreferrer' : undefined}
                className="flex items-center p-3 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-all duration-300 group border border-gray-200 hover:border-yellow-300"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                  <IconComponent sx={{ fontSize: 20, color: '#000' }} />
                </div>
                
                <div className="ml-3 flex-grow min-w-0">
                  <h5 className="font-semibold text-gray-900 group-hover:text-gray-800 text-sm truncate">
                    {method.label}
                  </h5>
                  <p className="text-gray-600 font-medium text-sm truncate">
                    {method.value}
                  </p>
                  {method.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {method.description}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Horarios de atención */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <AccessTimeIcon sx={{ fontSize: 20, color: '#3B82F6' }} />
          </div>
          <h4 className="ml-3 text-lg font-semibold text-gray-800">
            Horarios de atención
          </h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Lunes a Viernes:</span>
            <span className="text-gray-600">
              {SCHEDULE_CONFIG.workingDays
                .find(day => day.day === 1)
                ?.shifts.map((shift, index) => (
                  <span key={index}>
                    {shift.start} - {shift.end} hs
                    {index < (SCHEDULE_CONFIG.workingDays.find(day => day.day === 1)?.shifts.length || 0) - 1 ? ' / ' : ''}
                  </span>
                ))
              }
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Sábados, Domingos y feriados:</span>
            <span className="text-gray-600">Cerrado</span>
          </div>
        </div>

        {/* Indicador de estado actual dinámico */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${
              businessStatus.isOpen 
                ? 'bg-green-400 animate-pulse' 
                : 'bg-red-400'
            }`}></div>
            <span className="ml-2 text-sm text-gray-600">
              Estado actual: <span className={`font-medium ${
                businessStatus.isOpen 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>{businessStatus.statusMessage}</span>
            </span>
          </div>
          
          {/* Mensaje informativo adicional */}
          {businessStatus.warningMessage && (
            <p className="text-xs text-gray-500 mt-2">
              {businessStatus.warningMessage}
            </p>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            * El estado se actualiza automáticamente según nuestros horarios
          </p>
        </div>
      </div>


    </div>
  );
};

export default ContactInfo;