import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { 
  BUSINESS_CONFIG,
  SCHEDULE_CONFIG,
  LOCATION_CONFIG,
  BUSINESS_CONTACT_CONFIG,
  CONTACT_METHODS_CONFIG,
  FOOTER_COMPANY_CONFIG,
  FOOTER_SECTIONS_CONFIG,
  FOOTER_SOCIAL_CONFIG
} from '../config/businessConfig';

import type { 
  BusinessConfig, 
  ScheduleConfig, 
  LocationConfig, 
  BusinessContactInfo,
  ContactMethod,
  FooterCompanyInfo,
  FooterSection,
  SocialMedia
} from '../types';

interface BusinessContextType {
  business: BusinessConfig;
  schedule: ScheduleConfig;
  location: LocationConfig;
  contact: BusinessContactInfo;
  contactMethods: ContactMethod[];
  footer: {
    company: FooterCompanyInfo;
    sections: FooterSection[];
    social: SocialMedia[];
  };
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

interface BusinessProviderProps {
  children: ReactNode;
}

/**
 * Provider de configuración de negocio - evita prop drilling
 * Proporciona toda la configuración centralizada del negocio
 */
export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const value: BusinessContextType = {
    business: BUSINESS_CONFIG,
    schedule: SCHEDULE_CONFIG,
    location: LOCATION_CONFIG,
    contact: BUSINESS_CONTACT_CONFIG,
    contactMethods: CONTACT_METHODS_CONFIG,
    footer: {
      company: FOOTER_COMPANY_CONFIG,
      sections: FOOTER_SECTIONS_CONFIG,
      social: FOOTER_SOCIAL_CONFIG
    }
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

/**
 * Hook para acceder a la configuración del negocio
 */
export const useBusinessConfig = (): BusinessContextType => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessConfig debe usarse dentro de BusinessProvider');
  }
  return context;
};

export default BusinessContext;