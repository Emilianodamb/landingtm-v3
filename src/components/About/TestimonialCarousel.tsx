import React, { useState, useEffect, useMemo, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHoverTouch } from '../../hooks/useHoverTouch';
import type { Testimonial, TestimonialCarouselConfig } from '../../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  config: TestimonialCarouselConfig;
}

/**
 * Componente de carrusel de testimoniales - Réplica exacta del original
 * Con auto-play, navegación manual y funcionalidad completa
 */
const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  config
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(config.autoPlay);
  const { isActive: isPrevActive, hoverProps: prevHoverProps } = useHoverTouch();
  const { isActive: isNextActive, hoverProps: nextHoverProps } = useHoverTouch();
  const { isActive: isGoogleActive, hoverProps: googleHoverProps } = useHoverTouch();

  // Auto-play del carrusel: cambia de testimonio según configuración
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, config.slideInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, config.slideInterval, testimonials.length]);

  // Handlers de navegación memoizados para evitar renders innecesarios
  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), config.pauseOnManualNavigation);
  }, [currentIndex, testimonials.length, config.pauseOnManualNavigation]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), config.pauseOnManualNavigation);
  }, [currentIndex, testimonials.length, config.pauseOnManualNavigation]);

  const goToSlide = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), config.pauseOnManualNavigation);
  }, [config.pauseOnManualNavigation]);

  // Función memoizada para renderizar estrellas
  const renderStars = useMemo(() => {
    return (rating: number) => Array.from({ length: rating }, (_, i) => (
      <StarIcon key={i} sx={{ fontSize: 20, color: '#FFDA36' }} />
    ));
  }, []);

  // Testimonio actual memoizado
  const currentTestimonial = useMemo(() => testimonials[currentIndex], [testimonials, currentIndex]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado - Exactamente igual al original */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold uppercase text-gray-900 mb-4">
          Lo que dicen nuestros clientes
        </h3>
        <p className="text-gray-600">
          40 años construyendo confianza, una reparación a la vez
        </p>
      </div>

      {/* Contenedor del carrusel */}
      <div className="relative">
        {/* Tarjeta principal del testimonio - Exactamente igual al original */}
        <div className="bg-white rounded-lg shadow-md p-8 min-h-[400px] flex flex-col items-center text-center">
          {/* Ícono de comillas */}
          <div className="absolute top-4 left-4">
            <FormatQuoteIcon sx={{ fontSize: 40, color: '#FFDA36', opacity: 0.7 }} />
          </div>

          {/* Foto de perfil */}
          <div className="mt-4 mb-6">
            <img 
              src={currentTestimonial.avatar}
              alt={`Foto de perfil de ${currentTestimonial.name}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300 shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=FFDA36&color=000&size=150&bold=true`;
              }}
            />
          </div>

          {/* Calificación en estrellas */}
          <div className="mb-4">
            {renderStars(currentTestimonial.rating)}
          </div>

          {/* Nombre */}
          <h4 className="font-bold text-xl text-gray-900 mb-4">
            {currentTestimonial.name}
          </h4>
          
          {/* Texto del comentario */}
          <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic flex-grow">
            "{currentTestimonial.comment}"
          </blockquote>

          {/* Pie con fecha */}
          <div className="border-t pt-4 w-full">
            <div className="text-center text-sm">
              <span className="text-gray-500">
                {currentTestimonial.date}
              </span>
            </div>
          </div>
        </div>

        {/* Flechas de navegación - Exactamente iguales al original */}
        <button
          onClick={goToPrevious}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md transition-all duration-300 z-10 ${
            isPrevActive
              ? 'bg-red-600 text-white'
              : 'bg-yellow-300 hover:bg-red-600 text-black hover:text-white'
          }`}
          aria-label="Testimonio anterior"
          {...prevHoverProps}
        >
          <ArrowBackIosIcon sx={{ fontSize: 20 }} />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md transition-all duration-300 z-10 ${
            isNextActive
              ? 'bg-red-600 text-white'
              : 'bg-yellow-300 hover:bg-red-600 text-black hover:text-white'
          }`}
          aria-label="Siguiente testimonio"
          {...nextHoverProps}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
        </button>

        {/* Indicadores (puntos) */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-300 shadow-md'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Llamado a la acción (reseñas) - Exactamente igual al original */}
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">
          ¿Quedaste conforme con nuestro servicio?
        </p>
        <a
          href="https://g.page/r/CfQeHb4qX0UQEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center border border-transparent text-sm font-bold shadow-md rounded-none gap-2 transition-all duration-300 ease-in-out px-6 py-3 uppercase mb-4 ${
            isGoogleActive
              ? 'text-white bg-red-600 shadow-yellow-600'
              : 'text-black bg-yellow-300 shadow-red-600 hover:bg-red-600 hover:text-white hover:shadow-yellow-600'
          }`}
          {...googleHoverProps}
        >
          <StarIcon className="text-inherit" />
          Calificanos en Google
        </a>
        <p className="text-sm text-gray-500 mt-4">
          Tu opinión nos ayuda a seguir mejorando
        </p>
      </div>
    </div>
  );
};

export default TestimonialCarousel;