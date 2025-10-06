import React from 'react';
import ContactForm from './Contact/ContactForm';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BUSINESS_CONTACT_CONFIG, CONTACT_METHODS_CONFIG, SCHEDULE_CONFIG } from '../config/businessConfig';
import { useBusinessStatus } from '../hooks/useBusinessStatus';
import type { ContactProps } from '../types';

/**
 * Componente principal de contacto que integra el formulario de contacto
 * y la información de contacto del negocio en un diseño responsivo
 */
const Contact: React.FC<ContactProps> = ({ 
  title = "Contáctanos",
  subtitle = "Estamos aquí para ayudarte con el cuidado de tu vehículo. Escríbenos y nos pondremos en contacto contigo lo antes posible.",
  className = ""
}) => {
  // Hook para estado del negocio en tiempo real
  const businessStatus = useBusinessStatus(SCHEDULE_CONFIG);
  const contactMethods = CONTACT_METHODS_CONFIG;
  
  const iconMap = {
    phone: PhoneIcon,
    email: EmailIcon,
    whatsapp: WhatsAppIcon,
    address: LocationOnIcon,
  };
  return (
    <section 
      id="contact" 
      className={`py-16 bg-gray-50 ${className}`}
      aria-label="Sección de contacto"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Encabezado de sección - Consistente con otros componentes */}
        <div className="text-center mb-8">
          <h3 className="text-2xl mt-2 font-bold uppercase text-gray-900 mb-4">
            {title}
          </h3>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid principal optimizado para mejor aprovechamiento del espacio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Formulario de contacto - Columna izquierda completa (1) */}
          <div className="order-2 lg:order-1 lg:row-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 h-full">
              <ContactForm 
                onSubmit={(formData) => {
                  console.log('Formulario enviado:', formData);
                  // Aquí iría la lógica para enviar el formulario
                  // Ejemplo: enviar a API, mostrar mensaje de confirmación, etc.
                }}
              />
            </div>
          </div>

          {/* Métodos de contacto - Columna derecha superior (2) */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Métodos de contacto
              </h4>
              
              <div className="space-y-3">
                {contactMethods.filter(method => method.available).map((method) => {
                  const IconComponent = iconMap[method.type as keyof typeof iconMap];
                  
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
          </div>

          {/* Horarios de atención - Columna derecha inferior (3) */}
          <div className="order-3 lg:order-3">
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
        </div>

        {/* Fila inferior con "Por qué elegirnos" y "Nuestra ubicación" (4 y 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Por qué elegirnos (4) */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              ¿Por qué elegirnos?
            </h4>
            
            <ul className="space-y-1 text-xs text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5 text-sm">✓</span>
                Más de 25 años de experiencia
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5 text-sm">✓</span>
                Diagnósticos precisos
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5 text-sm">✓</span>
                Repuestos garantizados
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-0.5 text-sm">✓</span>
                Facilidades de pago
              </li>
            </ul>
          </div>

          {/* Nuestra ubicación (5) */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              <LocationOnIcon sx={{ fontSize: 18, color: '#6B7280' }} />
              <h4 className="ml-2 text-base font-semibold text-gray-800">
                Nuestra ubicación
              </h4>
            </div>
            
            <div className="text-xs text-gray-700 space-y-0.5">
              <p className="font-medium">{BUSINESS_CONTACT_CONFIG.businessAddress.street}</p>
              <p>
                {BUSINESS_CONTACT_CONFIG.businessAddress.city}, {BUSINESS_CONTACT_CONFIG.businessAddress.state}
              </p>
              <p>
                {BUSINESS_CONTACT_CONFIG.businessAddress.country} ({BUSINESS_CONTACT_CONFIG.businessAddress.postalCode})
              </p>
            </div>
            
            <a
              href={CONTACT_METHODS_CONFIG.find(m => m.type === 'address')?.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <LocationOnIcon sx={{ fontSize: 14 }} className="mr-1" />
              Ver en Maps
            </a>
          </div>
        </div>

        {/* Sección adicional - Call to action */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Necesitas atención inmediata?
            </h3>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Para emergencias o consultas urgentes, puedes contactarnos directamente por WhatsApp o teléfono
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Botón WhatsApp */}
              <a
                href={CONTACT_METHODS_CONFIG.find(m => m.type === 'whatsapp')?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
                WhatsApp
              </a>

              {/* Botón Teléfono */}
              <a
                href={CONTACT_METHODS_CONFIG.find(m => m.type === 'phone')?.href || '#'}
                className="inline-flex items-center justify-center px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;