import { useState, useEffect } from 'react';

/**
 * Hook que mantiene el tiempo actual actualizado cada minuto
 * Optimizado para sincronizar con el cambio de minuto
 */
export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Actualizar inmediatamente
    updateTime();

    // Calcular milisegundos hasta el próximo minuto
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // Sincronizar con el cambio de minuto
    const timeoutId = setTimeout(() => {
      updateTime();
      // Luego actualizar cada minuto
      const intervalId = setInterval(updateTime, 60000);
      
      return () => clearInterval(intervalId);
    }, msUntilNextMinute);

    return () => clearTimeout(timeoutId);
  }, []);

  return currentTime;
}