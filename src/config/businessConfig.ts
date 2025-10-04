import type { BusinessConfig, ScheduleConfig, LocationConfig, MapConfig, Service, Brand, CarouselConfig } from '../types';

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
  { id: 1, name: 'Ford', logo: '/brands/ford.png', category: 'comercial' },
  { id: 2, name: 'Chevrolet', logo: '/brands/chevrolet.png', category: 'comercial' },
  { id: 3, name: 'Toyota', logo: '/brands/toyota.png', category: 'importada', featured: true },
  { id: 4, name: 'Volkswagen', logo: '/brands/vw.png', category: 'importada' },
  { id: 5, name: 'Peugeot', logo: '/brands/peugeot.png', category: 'importada' },
  { id: 6, name: 'Renault', logo: '/brands/renault.png', category: 'importada' },
  { id: 7, name: 'Fiat', logo: '/brands/fiat.png', category: 'popular' },
  { id: 8, name: 'Honda', logo: '/brands/honda.png', category: 'importada' },
  { id: 9, name: 'BMW', logo: '/brands/bmw.png', category: 'premium', featured: true },
  { id: 10, name: 'Mercedes-Benz', logo: '/brands/mercedes.png', category: 'premium' },
  { id: 11, name: 'Audi', logo: '/brands/audi.png', category: 'premium' },
  { id: 12, name: 'Citroën', logo: '/brands/citroen.png', category: 'importada' },
  { id: 13, name: 'Hyundai', logo: '/brands/hyundai.png', category: 'importada' },
  { id: 14, name: 'Nissan', logo: '/brands/nissan.png', category: 'importada' },
  { id: 15, name: 'Jeep', logo: '/brands/jeep.png', category: 'premium' },
  { id: 16, name: 'Suzuki', logo: '/brands/suzuki.png', category: 'popular' },
  { id: 17, name: 'Chery', logo: '/brands/chery.png', category: 'nacional' },
];

// Configuración del carrusel
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