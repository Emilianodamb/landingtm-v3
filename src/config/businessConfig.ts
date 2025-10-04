import type { BusinessConfig, ScheduleConfig, LocationConfig, MapConfig } from '../types';

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