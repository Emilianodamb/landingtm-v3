// Interfaces mínimas para los componentes del landing page
// Se expandirán conforme se desarrolle cada componente

// Header Interface
export interface HeaderProps {
  logo?: string;
  navigationItems?: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface HeroProps {
  // Por expandir según necesidades  
}

export interface ScheduleLocationProps {
  businessConfig?: BusinessConfig;
  scheduleConfig?: ScheduleConfig;
  locationConfig?: LocationConfig;
  mapConfig?: MapConfig;
}

// Configuración del negocio
export interface BusinessConfig {
  name: string;
  timezone?: string;
}

// Configuración de horarios
export interface ScheduleConfig {
  workingDays: WorkingDay[];
  holidays?: Date[];
  specialHours?: SpecialHours[];
}

export interface WorkingDay {
  day: number; // 0 = Domingo, 1 = Lunes, etc.
  isOpen: boolean;
  shifts: TimeShift[];
}

export interface TimeShift {
  start: string; // "08:00"
  end: string;   // "12:00"
  label?: string; // "Mañana"
}

export interface SpecialHours {
  date: Date;
  shifts: TimeShift[];
  reason?: string;
}

// Configuración de ubicación
export interface LocationConfig {
  name: string;
  address: Address;
  contact?: ContactInfo;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

// Configuración del mapa
export interface MapConfig {
  embedUrl: string;
  directionsUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Estados del negocio
export interface BusinessStatus {
  isOpen: boolean;
  statusMessage: string;
  warningMessage?: string;
  minutesToNextChange?: number;
  nextOpenTime?: string;
}

export interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  className?: string;
}

// Configuración de servicio individual
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  category?: string;
  featured?: boolean;
}

// Tipos de iconos disponibles para servicios
export type ServiceIcon = 
  | 'maintenance'
  | 'inspection' 
  | 'injection'
  | 'diagnostic'
  | 'airConditioning'
  | 'suspension'
  | 'brakes'
  | 'engine'
  | 'electrical'
  | 'transmission';

// Configuración de iconos
export interface IconConfig {
  component: React.ComponentType<any>;
  color: string;
  style?: Record<string, any>;
}

export interface AboutProps {
  // Por expandir según necesidades
}

export interface ContactProps {
  // Por expandir según necesidades
}

export interface FooterProps {
  // Por expandir según necesidades
}

// Interfaces para OurBrands component
export interface OurBrandsProps {
  title?: string;
  subtitle?: string;
  brands?: Brand[];
  carouselConfig?: CarouselConfig;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
}

// Configuración de marca individual
export interface Brand {
  id: number;
  name: string;
  logo: string;
  alt?: string;
  category?: BrandCategory;
  featured?: boolean;
}

// Categorías de marcas
export type BrandCategory = 
  | 'premium'
  | 'comercial'
  | 'popular'
  | 'importada'
  | 'nacional';

// Configuración del carrusel
export interface CarouselConfig {
  slidesPerView: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  spaceBetween: number;
  autoplay: boolean;
  speed: number;
  slideInterval: number;
  loop: boolean;
  navigation: boolean;
  pagination: boolean;
}

// Tipos básicos que pueden ser útiles desde el inicio
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';