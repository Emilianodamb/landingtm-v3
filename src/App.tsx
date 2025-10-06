import './App.css'
import { useEffect, Suspense, lazy } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header, Hero, ScheduleLocation, WhatsAppFloat } from './components';
import LoadingSpinner from './components/LoadingSpinner';
import SkipLinks from './components/SkipLinks';
import { BusinessProvider } from './context/BusinessContext';

// Lazy loading para componentes fuera del viewport inicial
const Services = lazy(() => import('./components/Services'));
const OurBrands = lazy(() => import('./components/OurBrands'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // duración de la animación
      once: true, // la animación ocurre solo una vez
      easing: "ease-out-cubic", // tipo de animación
      offset: 0, // dispara apenas entra al viewport
      anchorPlacement: 'top-bottom', // cuando el top del elemento toca el bottom del viewport
    });
  }, []);

  return (
    <BusinessProvider>
      {/* Skip Links para accesibilidad */}
      <SkipLinks />
      
      {/* Componentes críticos - carga inmediata */}
      <Header />
      
      {/* Contenido principal */}
      <main id="main-content">
        <Hero />
        <ScheduleLocation />
        
        {/* Componentes lazy - carga bajo demanda */}
        <Suspense fallback={<LoadingSpinner message="Cargando servicios..." />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner message="Cargando marcas..." />}>
          <OurBrands />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner message="Cargando información..." />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner message="Cargando contacto..." />}>
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={<LoadingSpinner message="Finalizando carga..." />}>
        <Footer />
      </Suspense>
      
      {/* Widget flotante de WhatsApp */}
      <WhatsAppFloat />
    </BusinessProvider>
  )
}

export default App
