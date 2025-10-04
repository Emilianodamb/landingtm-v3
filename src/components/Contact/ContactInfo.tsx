import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { BusinessContactInfo, ContactMethod } from '../../types';

interface ContactInfoProps {
  businessContact: BusinessContactInfo;
  contactMethods: ContactMethod[];
}

/**
 * Componente que muestra la información de contacto del negocio
 * Incluye métodos de contacto, horarios y ubicación
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ businessContact, contactMethods }) => {
  const iconMap = {
    phone: PhoneIcon,
    email: EmailIcon,
    whatsapp: WhatsAppIcon,
    address: LocationOnIcon,
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Información de contacto
        </h3>
        <p className="text-gray-600">
          Estamos aquí para ayudarte con el cuidado de tu vehículo
        </p>
      </div>

      {/* Métodos de contacto */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          Métodos de contacto
        </h4>
        
        <div className="grid gap-4">
          {contactMethods.filter(method => method.available).map((method) => {
            const IconComponent = iconMap[method.type];
            
            return (
              <a
                key={method.id}
                href={method.href}
                target={method.type === 'email' ? '_blank' : '_self'}
                rel={method.type === 'email' ? 'noopener noreferrer' : undefined}
                className="flex items-center p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-all duration-300 group border border-gray-200 hover:border-yellow-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                  <IconComponent sx={{ fontSize: 24, color: '#000' }} />
                </div>
                
                <div className="ml-4 flex-grow">
                  <h5 className="font-semibold text-gray-900 group-hover:text-gray-800">
                    {method.label}
                  </h5>
                  <p className="text-gray-600 font-medium">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
            <span className="font-medium text-gray-700">Días de semana:</span>
            <span className="text-gray-600">{businessContact.businessSchedule.weekdays}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Fines de semana:</span>
            <span className="text-gray-600">{businessContact.businessSchedule.weekend}</span>
          </div>
          
          {businessContact.businessSchedule.holidays && (
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700">Feriados:</span>
              <span className="text-gray-600">{businessContact.businessSchedule.holidays}</span>
            </div>
          )}
        </div>

        {/* Indicador de estado actual */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="ml-2 text-sm text-gray-600">
              Estado actual: <span className="font-medium text-green-600">Abierto</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            * El estado se actualiza automáticamente según nuestros horarios
          </p>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          ¿Por qué elegirnos?
        </h4>
        
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2 mt-0.5">✓</span>
            Más de 40 años de experiencia en el sector
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2 mt-0.5">✓</span>
            Diagnósticos precisos y soluciones eficaces
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2 mt-0.5">✓</span>
            Repuestos de primeras marcas garantizados
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2 mt-0.5">✓</span>
            Facilidades de pago y financiación
          </li>
        </ul>
      </div>

      {/* Mapa o dirección */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center mb-3">
          <LocationOnIcon sx={{ fontSize: 20, color: '#6B7280' }} />
          <h4 className="ml-2 text-lg font-semibold text-gray-800">
            Nuestra ubicación
          </h4>
        </div>
        
        <div className="text-sm text-gray-700 space-y-1">
          <p className="font-medium">{businessContact.businessAddress.street}</p>
          <p>
            {businessContact.businessAddress.city}, {businessContact.businessAddress.state}
          </p>
          <p>
            {businessContact.businessAddress.country} ({businessContact.businessAddress.postalCode})
          </p>
        </div>
        
        <a
          href={contactMethods.find(m => m.type === 'address')?.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          <LocationOnIcon sx={{ fontSize: 16 }} className="mr-1" />
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;