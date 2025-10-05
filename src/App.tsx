import './App.css'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header, Hero, ScheduleLocation, Services, OurBrands, About, Contact, Footer} from './components';

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
    <>
      <Header />
      <Hero />
      <ScheduleLocation />
      <Services />
      <OurBrands />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

export default App
