import emailjs from '@emailjs/browser';
import type { ContactFormData } from '../types';

// Configuración de EmailJS con tus credenciales
const EMAIL_CONFIG = {
  serviceId: 'service_b3u76b9',
  templateId: 'template_z5rt3vw', 
  publicKey: 'QdU9Nb9SznhzeMN64',
};

/**
 * Servicio para enviar emails usando EmailJS
 */
export class EmailService {
  
  /**
   * Inicializar EmailJS con la clave pública
   */
  static init() {
    emailjs.init(EMAIL_CONFIG.publicKey);
  }

  /**
   * Enviar email de consulta del formulario de contacto
   */
  static async sendContactForm(formData: ContactFormData): Promise<void> {
    try {
      console.log('🔍 Iniciando envío de email...', { formData });

      // Validar que los datos no estén vacíos
      if (!formData.fullName || !formData.emailAddress || !formData.messageContent) {
        const missingFields = [];
        if (!formData.fullName) missingFields.push('fullName');
        if (!formData.emailAddress) missingFields.push('emailAddress');
        if (!formData.messageContent) missingFields.push('messageContent');
        
        throw new Error(`Datos del formulario incompletos. Faltan: ${missingFields.join(', ')}`);
      }

      // Validar configuración de EmailJS
      if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId || !EMAIL_CONFIG.publicKey) {
        throw new Error('Configuración de EmailJS incompleta');
      }

      // Preparar los datos del template con variables claras y organizadas
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.emailAddress,
        from_phone: formData.phoneNumber || 'No proporcionado',
        service_type: formData.serviceType || 'No especificado',
        preferred_contact: formData.preferredContact || 'WhatsApp',
        message: formData.messageContent,
        sent_date: new Date().toLocaleString('es-AR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };

      console.log('📧 Enviando email con EmailJS...', {
        service: EMAIL_CONFIG.serviceId,
        template: EMAIL_CONFIG.templateId,
        params: templateParams
      });

      const response = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams
      );

      console.log('📬 Respuesta de EmailJS:', response);

      if (response.status === 200) {
        console.log('✅ Email enviado exitosamente');
      } else {
        throw new Error(`Error HTTP ${response.status}: ${response.text || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('❌ Error detallado al enviar email:', {
        error: error,
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined,
        config: EMAIL_CONFIG
      });
      throw error;
    }
  }
}

// Inicializar EmailJS al cargar el módulo
EmailService.init();