import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar la sección activa basada en el scroll
 * y si el usuario está en la parte superior de la página
 */
export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [clickInProgress, setClickInProgress] = useState<boolean>(false);

  useEffect(() => {
    // Manejar clics en enlaces de navegación
    const handleNavigationClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target && target.href && target.href.includes('#')) {
        const hash = target.href.split('#')[1];
        const sections = ['home', 'services', 'about', 'contact'];
        
        if (sections.includes(hash)) {
          setActiveSection(hash);
          setIsAtTop(false); // Asegurar que se muestre el subrayado
          setClickInProgress(true);
          
          // Permitir que el scroll complete antes de reanudar detección automática
          setTimeout(() => {
            setClickInProgress(false);
          }, 1000);
        }
      }
    };
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ['home', 'services', 'about', 'contact'];
      
      // Detectar si estamos en la parte superior (primeros 50px)
      const atTop = scrollY <= 50;
      setIsAtTop(atTop);

      // Si estamos en el top, no mostrar ningún subrayado
      if (atTop) {
        setActiveSection('');
        return;
      }

      // Detectar sección activa basada en scroll position + offset del header
      const scrollPosition = scrollY + 100; // 80px header + 20px buffer
      let currentSection = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // Solo actualizar si no hay un clic en progreso y la sección cambió
      if (currentSection && currentSection !== activeSection && !clickInProgress) {
        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events para mejor performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Ejecutar al montar y en cada scroll
    handleScroll();
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    document.addEventListener('click', handleNavigationClick);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('click', handleNavigationClick);
    };
  }, [activeSection, clickInProgress]);

  return { activeSection, isAtTop };
};

export default useActiveSection;