import type { BusinessConfig, ScheduleConfig, LocationConfig, MapConfig, Service, Brand, CarouselConfig, AboutItem, Testimonial, TestimonialCarouselConfig, BusinessContactInfo, ContactMethod } from '../types';

// Configuración del negocio
export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'Total Mecánica Banfield',
  timezone: 'America/Argentina/Buenos_Aires',
};

// Configuración de horarios
export const SCHEDULE_CONFIG: ScheduleConfig = {
  workingDays: [
    // Domingo
    { day: 0, isOpen: false, shifts: [] },
    // Lunes
    { 
      day: 1, 
      isOpen: true, 
      shifts: [
        { start: '08:00', end: '12:00', label: 'Mañana' },
        { start: '14:30', end: '18:00', label: 'Tarde' }
      ]
    },
    // Martes
    { 
      day: 2, 
      isOpen: true, 
      shifts: [
        { start: '08:00', end: '12:00', label: 'Mañana' },
        { start: '14:30', end: '18:00', label: 'Tarde' }
      ]
    },
    // Miércoles
    { 
      day: 3, 
      isOpen: true, 
      shifts: [
        { start: '08:00', end: '12:00', label: 'Mañana' },
        { start: '14:30', end: '18:00', label: 'Tarde' }
      ]
    },
    // Jueves
    { 
      day: 4, 
      isOpen: true, 
      shifts: [
        { start: '08:00', end: '12:00', label: 'Mañana' },
        { start: '14:30', end: '18:00', label: 'Tarde' }
      ]
    },
    // Viernes
    { 
      day: 5, 
      isOpen: true, 
      shifts: [
        { start: '08:00', end: '12:00', label: 'Mañana' },
        { start: '14:30', end: '18:00', label: 'Tarde' }
      ]
    },
    // Sábado
    { day: 6, isOpen: false, shifts: [] },
  ],
  holidays: [], // Se pueden agregar fechas específicas
};

// Configuración de ubicación
export const LOCATION_CONFIG: LocationConfig = {
  name: 'Total Mecánica Banfield',
  address: {
    street: 'Capdevila 125',
    city: 'Banfield',
    state: 'Buenos Aires',
    country: 'Argentina',
    postalCode: '1828',
  },
  contact: {
    phone: '+54 11 2387-4371',
    email: 'info@totalmecánicabanfield.com.ar',
  },
};

// Configuración del mapa
export const MAP_CONFIG: MapConfig = {
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.7718282922793!2d-58.39687842347356!3d-34.74432397282099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2aa6b0db3c7%3A0x5a4f8a2b3c1d0e9f!2sCapdevila%20125%2C%20Banfield%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1697000000000!5m2!1ses!2sar',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Capdevila+125,+Banfield,+Lomas+de+Zamora,+Buenos+Aires,+Argentina',
  coordinates: {
    lat: -34.744324,
    lng: -58.396878,
  },
};

// Configuración de servicios
export const SERVICES_CONFIG: Service[] = [
  {
    id: 'maintenance',
    title: 'Mantenimiento preventivo',
    description: 'Chequeo completo para evitar fallas inesperadas.',
    icon: 'maintenance',
    category: 'preventivo',
    featured: true,
  },
  {
    id: 'inspection',
    title: 'Revisión pre-VTV',
    description: 'Control de frenos, luces y emisiones.',
    icon: 'inspection',
    category: 'control',
  },
  {
    id: 'injection',
    title: 'Inyección electrónica',
    description: 'Revisión y ajuste de inyectores.',
    icon: 'injection',
    category: 'electrónico',
  },
  {
    id: 'diagnostic',
    title: 'Diagnóstico computarizado',
    description: 'Detección de fallas electrónicas.',
    icon: 'diagnostic',
    category: 'electrónico',
  },
  {
    id: 'airConditioning',
    title: 'Aire acondicionado',
    description: 'Carga de gas y reparación de compresores.',
    icon: 'airConditioning',
    category: 'confort',
  },
  {
    id: 'suspension',
    title: 'Suspensión y tren delantero',
    description: 'Reparación de amortiguadores y bujes.',
    icon: 'suspension',
    category: 'mecánico',
  },
];

// Configuración de marcas
export const BRANDS_CONFIG: Brand[] = [
  { id: 1, name: 'Ford', logo: '/brands/ford.png', alt: 'Logo Ford', category: 'comercial' },
  { id: 2, name: 'Chevrolet', logo: '/brands/chevrolet.png', alt: 'Logo Chevrolet', category: 'comercial' },
  { id: 3, name: 'Toyota', logo: '/brands/toyota.png', alt: 'Logo Toyota', category: 'importada', featured: true },
  { id: 4, name: 'Volkswagen', logo: '/brands/vw.png', alt: 'Logo Volkswagen', category: 'importada' },
  { id: 5, name: 'Peugeot', logo: '/brands/peugeot.png', alt: 'Logo Peugeot', category: 'importada' },
  { id: 6, name: 'Renault', logo: '/brands/renault.png', alt: 'Logo Renault', category: 'importada' },
  { id: 7, name: 'Fiat', logo: '/brands/fiat.png', alt: 'Logo Fiat', category: 'popular' },
  { id: 8, name: 'Honda', logo: '/brands/honda.png', alt: 'Logo Honda', category: 'importada' },
  { id: 9, name: 'BMW', logo: '/brands/bmw.png', alt: 'Logo BMW', category: 'premium', featured: true },
  { id: 10, name: 'Mercedes-Benz', logo: '/brands/mercedes.png', alt: 'Logo Mercedes-Benz', category: 'premium' },
  { id: 11, name: 'Audi', logo: '/brands/audi.png', alt: 'Logo Audi', category: 'premium' },
  { id: 12, name: 'Citroën', logo: '/brands/citroen.png', alt: 'Logo Citroën', category: 'importada' },
  { id: 13, name: 'Hyundai', logo: '/brands/hyundai.png', alt: 'Logo Hyundai', category: 'importada' },
  { id: 14, name: 'Nissan', logo: '/brands/nissan.png', alt: 'Logo Nissan', category: 'importada' },
  { id: 15, name: 'Jeep', logo: '/brands/jeep.png', alt: 'Logo Jeep', category: 'premium' },
  { id: 16, name: 'Suzuki', logo: '/brands/suzuki.png', alt: 'Logo Suzuki', category: 'popular' },
  { id: 17, name: 'Chery', logo: '/brands/chery.png', alt: 'Logo Chery', category: 'nacional' },
];

// Configuración del carrusel para OurBrands
export const CAROUSEL_CONFIG: CarouselConfig = {
  slidesPerView: {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  },
  spaceBetween: 20,
  autoplay: true,
  speed: 500,
  slideInterval: 3000,
  loop: true,
  navigation: true,
  pagination: true,
};

// Configuración de About - Items que describen ventajas diferenciales del taller
export const ABOUT_ITEMS_CONFIG: AboutItem[] = [
  { 
    icon: 'EngineeringIcon', 
    title: 'Experiencia y Profesionalismo', 
    desc: 'Llevamos más de 40 años en el sector. Este tiempo nos ha enseñado a diagnosticar con agilidad y a resolver problemas de forma eficaz, evitando gastos innecesarios y asegurando una solución duradera.' 
  },
  { 
    icon: 'HandshakeIcon', 
    title: 'Un Trato Claro y Directo', 
    desc: 'Valoramos su tiempo y su confianza. Por eso, le explicamos siempre qué necesita su vehículo, por qué y cuál será el coste, de forma transparente y sin sorpresas. Usted tiene la última palabra.' 
  },
  { 
    icon: 'VerifiedIcon', 
    title: 'Compromiso con la Calidad', 
    desc: 'Utilizamos repuestos de primeras marcas porque sabemos que de ellos dependen el funcionamiento y la seguridad de su coche. Para nosotros, la calidad no es un lujo, es un requisito.' 
  },
  { 
    icon: 'CreditCardIcon', 
    title: 'Facilidades de Pago', 
    desc: 'Aceptamos todos los medios de pago y, todos los miércoles, ofrecemos 3 cuotas SIN INTERÉS con tarjetas Visa y Mastercard bancarizadas. Queremos que la calidad no sea un lujo, sino una opción accesible.' 
  },
];

// Configuración de Testimoniales
export const TESTIMONIALS_CONFIG: Testimonial[] = [
  {
    id: 1,
    name: "Facundo Bianchi",
    service: "Reparación de frenos",
    rating: 5,
    comment: "Excelente atención y trabajo profesional. Juan me explicó todo el proceso y los precios fueron muy justos. Más de 40 años de experiencia se notan en cada detalle.",
    date: "Hace 2 semanas",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Valentina Quiroga",
    service: "Service completo",
    rating: 5,
    comment: "Llevé mi auto para el service y quedé muy conforme. Me detectaron un problema que otro taller no había visto. Muy honestos y profesionales. Lo recomiendo 100%.",
    date: "Hace 1 mes",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Ezequiel Villanueva",
    service: "Diagnóstico computarizado",
    rating: 5,
    comment: "Tenía un problema raro en el motor que nadie podía solucionar. En Total Mecánica lo resolvieron rápido y al mejor precio. Atención de primera y muy buena ubicación.",
    date: "Hace 3 semanas",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Micaela Battaglia",
    service: "Aire acondicionado",
    rating: 5,
    comment: "Llegué con el aire acondicionado sin funcionar en pleno verano. Me lo arreglaron en el día y funciona perfecto. Trato excelente y precios accesibles.",
    date: "Hace 2 meses",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "Nicolás Petrecca",
    service: "Revisión pre-VTV",
    rating: 5,
    comment: "Me prepararon el auto para la VTV y pasé sin problemas. Son muy detallistas y te explican todo lo que hacen. La experiencia de Juan se nota muchísimo.",
    date: "Hace 1 semana",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

// Configuración del carrusel de testimoniales
export const TESTIMONIALS_CAROUSEL_CONFIG: TestimonialCarouselConfig = {
  autoPlay: true,
  slideInterval: 5000, // 5 segundos
  pauseOnManualNavigation: 10000, // 10 segundos después de navegación manual
};

// Configuración de contacto del negocio
export const BUSINESS_CONTACT_CONFIG: BusinessContactInfo = {
  businessName: 'Total Mecánica Banfield',
  phoneNumber: '+54 11 2387-4371',
  emailAddress: 'info@totalmecánicabanfield.com.ar',
  whatsappInfo: {
    number: '+5491123874371',
    defaultMessage: 'Hola! Me interesa obtener información sobre sus servicios de mecánica.',
  },
  businessAddress: {
    street: 'Capdevila 125',
    city: 'Banfield',
    state: 'Buenos Aires',
    country: 'Argentina',
    postalCode: '1828',
  },
  businessSchedule: {
    weekdays: 'Lunes a Viernes: 8:00 AM - 12:00 PM | 2:30 PM - 6:00 PM',
    weekend: 'Sábados y Domingos: Cerrado',
    holidays: 'Feriados: Cerrado',
  },
};

// Métodos de contacto disponibles
export const CONTACT_METHODS_CONFIG: ContactMethod[] = [
  {
    id: 'whatsapp',
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+54 11 2387-4371',
    icon: '📱',
    href: 'https://wa.me/5491123874371?text=Hola!%20Me%20interesa%20obtener%20información%20sobre%20sus%20servicios%20de%20mecánica.',
    description: 'Respuesta rápida las 24hs',
    available: true,
  },
  {
    id: 'phone',
    type: 'phone',
    label: 'Teléfono',
    value: '+54 11 2387-4371',
    icon: '📞',
    href: 'tel:+5491123874371',
    description: 'Llamanos durante horarios de atención',
    available: true,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    value: 'info@totalmecánicabanfield.com.ar',
    icon: '✉️',
    href: 'mailto:info@totalmecánicabanfield.com.ar',
    description: 'Te respondemos en 24-48hs',
    available: true,
  },
  {
    id: 'address',
    type: 'address',
    label: 'Visitanos',
    value: 'Capdevila 125, Banfield',
    icon: '📍',
    href: 'https://www.google.com/maps/dir/?api=1&destination=Capdevila+125,+Banfield,+Buenos+Aires,+Argentina',
    description: 'Lun-Vie: 8:00-12:00 | 14:30-18:00',
    available: true,
  },
];