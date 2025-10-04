import { useRef, useMemo } from 'react';
import type { SwiperOptions } from 'swiper/types';
import type { CarouselConfig, Brand } from '../types';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

/**
 * Hook personalizado para configurar el carrusel de marcas
 * Maneja la configuración de Swiper y la agrupación de marcas en pares
 */
export function useBrandsCarousel(brands: Brand[], config: CarouselConfig) {
  const swiperRef = useRef(null);

  // Crear pares de marcas para columnas verticales
  const brandPairs = useMemo(() => {
    const pairs: Brand[][] = [];
    for (let i = 0; i < brands.length; i += 2) {
      pairs.push(brands.slice(i, i + 2));
    }
    return pairs;
  }, [brands]);

  // Configuración optimizada de Swiper
  const swiperConfig: SwiperOptions = useMemo(() => ({
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: config.slidesPerView.mobile,
    spaceBetween: config.spaceBetween,
    loop: config.loop,
    speed: config.speed,
    autoplay: config.autoplay ? {
      delay: config.slideInterval,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false,
    breakpoints: {
      640: {
        slidesPerView: config.slidesPerView.tablet,
      },
      1024: {
        slidesPerView: config.slidesPerView.desktop,
      },
    },
    navigation: config.navigation ? {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    } : false,
    pagination: config.pagination ? {
      el: '.swiper-pagination-custom',
      clickable: true,
      renderBullet: function (_index: number, className: string) {
        return `<span class="${className} w-3 h-3 rounded-full transition-all duration-250 bg-gray-300 hover:bg-gray-400 cursor-pointer"></span>`;
      },
    } : false,
    loopedSlides: brandPairs.length,
    centeredSlides: false,
  }), [config, brandPairs.length]);

  return {
    swiperRef,
    brandPairs,
    swiperConfig,
  };
}

/**
 * Hook para manejar utilidades de marcas
 */
export function useBrandUtils(brands: Brand[]) {
  // Agrupar marcas por categoría
  const brandsByCategory = useMemo(() => {
    return brands.reduce((acc, brand) => {
      const category = brand.category || 'otros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(brand);
      return acc;
    }, {} as Record<string, Brand[]>);
  }, [brands]);

  // Obtener marcas destacadas
  const featuredBrands = useMemo(() => {
    return brands.filter(brand => brand.featured);
  }, [brands]);

  // Función para agregar nueva marca
  const addBrand = (newBrand: Omit<Brand, 'id'>) => {
    const brandWithId: Brand = {
      id: Math.max(...brands.map(b => b.id)) + 1,
      alt: `Logo ${newBrand.name}`,
      ...newBrand,
    };
    
    return brandWithId;
  };

  // Función para validar marca
  const validateBrand = (brand: Partial<Brand>) => {
    if (!brand.name || !brand.logo) {
      console.error('Brand must have name and logo properties');
      return false;
    }
    return true;
  };

  return {
    brandsByCategory,
    featuredBrands,
    addBrand,
    validateBrand,
    totalBrands: brands.length,
  };
}