import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import type { ContactFormData, ContactFormErrors, ContactMethodType } from '../../types';
import { SERVICES_CONFIG } from '../../config/businessConfig';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
}

/**
 * Componente de formulario de contacto profesional
 * Con validación, campos requeridos y UX optimizada
 */
const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    serviceType: '',
    messageContent: '',
    preferredContact: 'whatsapp',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validación del formulario
  const validateForm = (): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Email inválido';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Teléfono inválido';
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Selecciona un servicio';
    }

    if (!formData.messageContent.trim()) {
      newErrors.messageContent = 'El mensaje es requerido';
    } else if (formData.messageContent.trim().length < 10) {
      newErrors.messageContent = 'El mensaje debe tener al menos 10 caracteres';
    }

    return newErrors;
  };

  // Manejar cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Manejar blur (cuando el usuario sale del campo)
  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validar solo este campo
    const fieldErrors = validateForm();
    setErrors(prev => ({ 
      ...prev, 
      [fieldName]: fieldErrors[fieldName as keyof ContactFormErrors] 
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Si no hay errores, enviar el formulario
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Envíanos tu consulta
        </h3>
        <p className="text-gray-600">
          Completá el formulario y nos pondremos en contacto a la brevedad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre completo */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
              errors.fullName && touched.fullName
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Ingresá tu nombre y apellido"
            disabled={isSubmitting}
          />
          {errors.fullName && touched.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Email y teléfono en una fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              onBlur={() => handleBlur('emailAddress')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                errors.emailAddress && touched.emailAddress
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="ejemplo@email.com"
              disabled={isSubmitting}
            />
            {errors.emailAddress && touched.emailAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.emailAddress}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={() => handleBlur('phoneNumber')}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
                errors.phoneNumber && touched.phoneNumber
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="+54 11 1234-5678"
              disabled={isSubmitting}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Tipo de servicio */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
            Servicio de interés *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            onBlur={() => handleBlur('serviceType')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors ${
              errors.serviceType && touched.serviceType
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Seleccioná un servicio</option>
            {SERVICES_CONFIG.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            <option value="other">Otro servicio</option>
            <option value="quote">Solicitar presupuesto</option>
          </select>
          {errors.serviceType && touched.serviceType && (
            <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
          )}
        </div>

        {/* Método de contacto preferido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cómo preferís que te contactemos?
          </label>
          <div className="flex flex-wrap gap-3">
            {(['whatsapp', 'phone', 'email'] as ContactMethodType[]).map((method) => (
              <label key={method} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={formData.preferredContact === method}
                  onChange={handleChange}
                  className="mr-2 text-yellow-400 focus:ring-yellow-400"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700 capitalize">
                  {method === 'whatsapp' ? 'WhatsApp' : 
                   method === 'phone' ? 'Teléfono' : 'Email'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje *
          </label>
          <textarea
            id="messageContent"
            name="messageContent"
            value={formData.messageContent}
            onChange={handleChange}
            onBlur={() => handleBlur('messageContent')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors resize-none ${
              errors.messageContent && touched.messageContent
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Contanos sobre tu consulta, el problema de tu vehículo o qué servicio necesitás..."
            disabled={isSubmitting}
          />
          {errors.messageContent && touched.messageContent && (
            <p className="mt-1 text-sm text-red-600">{errors.messageContent}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.messageContent.length}/500 caracteres
          </p>
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center px-6 py-3 text-base font-bold uppercase rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 ${
              isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-yellow-300 text-black hover:bg-red-600 hover:text-white hover:shadow-lg transform hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-700 border-t-transparent mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <SendIcon className="mr-2" sx={{ fontSize: 20 }} />
                Enviar consulta
              </>
            )}
          </button>
        </div>

        {/* Nota de privacidad */}
        <div className="pt-2">
          <p className="text-xs text-gray-500 text-center">
            Al enviar este formulario aceptás que nos pongamos en contacto contigo para responder tu consulta.
            No compartimos tu información con terceros.
          </p>
        </div>
      </form>
    </>
  );
};

export default ContactForm;