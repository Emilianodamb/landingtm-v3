import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { OurBrandsProps, Brand } from '../../types';
import { BRANDS_CONFIG, CAROUSEL_CONFIG } from '../../config/businessConfig';
import BrandItem from './BrandItem';
import 'swiper/swiper-bundle.css';

/**
 * Componente OurBrands - Réplica exacta del BrandsCarousel original
 * Carrusel de marcas usando SwiperJS con columnas de 2 logos por slide
 */
const OurBrands: React.FC<OurBrandsProps> = ({
  brands = BRANDS_CONFIG,
  carouselConfig = CAROUSEL_CONFIG,
}) => {
  const swiperRef = useRef(null);

  // Crear pares de marcas para las columnas verticales - Igual al original
  const brandPairs: Brand[][] = [];
  for (let i = 0; i < brands.length; i += 2) {
    brandPairs.push(brands.slice(i, i + 2));
  }

  // Configuración del Swiper usando constantes centralizadas - Igual al original
  const swiperConfig = {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: carouselConfig.slidesPerView.mobile,
    spaceBetween: carouselConfig.spaceBetween,
    loop: carouselConfig.loop || true,
    speed: carouselConfig.speed,
    autoplay: carouselConfig.autoplay ? {
      delay: carouselConfig.slideInterval,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    } : false,
    breakpoints: {
      640: {
        slidesPerView: carouselConfig.slidesPerView.tablet,
      },
      1024: {
        slidesPerView: carouselConfig.slidesPerView.desktop,
      }
    },
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    },
    pagination: {
      el: '.swiper-pagination-custom',
      clickable: true,
      renderBullet: function (_index: number, className: string) {
        return `<span class="${className} w-3 h-3 rounded-full transition-all duration-250 bg-gray-300 hover:bg-gray-400 cursor-pointer"></span>`;
      }
    },
    loopedSlides: brandPairs.length,
    centeredSlides: false,
  };

  // Mensaje para WhatsApp (simulado - se puede configurar en businessConfig)
  const whatsappMessage = "Hola! Quería consultar por el mantenimiento de mi auto";

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado del bloque - Consistente con otros componentes */}
        <div className="text-center mb-8">
          <h3 className="text-2xl mt-2 font-bold uppercase text-gray-900 mb-4">
            Marcas con las que Trabajamos
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Especializados en el mantenimiento y reparación de las principales marcas automotrices del mercado
          </p>
        </div>

        {/* Carrusel con Swiper (slides como pares verticales) - Igual al original */}
        <div className="relative">
          <Swiper
            {...swiperConfig}
            ref={swiperRef}
            className="brands-swiper"
          >
            {brandPairs.map((pair, pairIndex) => (
              <SwiperSlide key={`pair-${pairIndex}`}>
                <div className="flex flex-col gap-1">
                  {pair.map((brand) => (
                    <BrandItem 
                      key={brand.id}
                      brand={brand} 
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación personalizados - Igual al original */}
          <button
            className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 group z-10"
            aria-label="Marca anterior"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-gray-900" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 group z-10"
            aria-label="Siguiente marca"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-gray-900" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores de páginas personalizados - Igual al original */}
        <div className="flex justify-center mt-6">
          <div className="swiper-pagination-custom flex justify-center space-x-2"></div>
        </div>

        {/* Información adicional - Igual al original */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">
            ¿No ves tu marca? Contáctanos, trabajamos con muchas más marcas.
          </p>
          <a
            href={`https://wa.me/5491155555555?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-yellow-300 text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors font-medium text-sm"
          >
            Consultar por tu marca
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurBrands;