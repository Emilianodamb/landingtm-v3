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
  // Por expandir según necesidades
}

export interface ServicesProps {
  // Por expandir según necesidades
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

// Tipos básicos que pueden ser útiles desde el inicio
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';