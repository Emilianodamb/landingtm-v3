import { useMemo } from 'react';
import type { ScheduleConfig, BusinessStatus, TimeShift } from '../types';
import { useCurrentTime } from './useCurrentTime';

/**
 * Hook que calcula el estado actual del negocio (abierto/cerrado)
 * basado en horarios configurables y tiempo real
 */
export function useBusinessStatus(scheduleConfig: ScheduleConfig): BusinessStatus {
  const currentTime = useCurrentTime();

  return useMemo(() => {
    return calculateBusinessStatus(currentTime, scheduleConfig);
  }, [currentTime, scheduleConfig]);
}

/**
 * Calcula el estado del negocio basado en el tiempo y configuración
 */
function calculateBusinessStatus(
  currentTime: Date,
  scheduleConfig: ScheduleConfig
): BusinessStatus {
  const day = currentTime.getDay();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Buscar configuración del día actual
  const todayConfig = scheduleConfig.workingDays.find(wd => wd.day === day);
  
  if (!todayConfig || !todayConfig.isOpen || todayConfig.shifts.length === 0) {
    return getClosedStatus(currentTime, scheduleConfig);
  }

  // Verificar si está en algún turno activo
  const activeShift = todayConfig.shifts.find(shift => 
    isTimeInShift(currentMinutes, shift)
  );

  if (activeShift) {
    return getOpenStatus(currentMinutes, activeShift, scheduleConfig, currentTime);
  }

  return getClosedStatus(currentTime, scheduleConfig);
}

/**
 * Verifica si el tiempo actual está dentro de un turno
 */
function isTimeInShift(currentMinutes: number, shift: TimeShift): boolean {
  const startMinutes = timeStringToMinutes(shift.start);
  const endMinutes = timeStringToMinutes(shift.end);
  
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Convierte string de tiempo "08:30" a minutos desde medianoche
 */
function timeStringToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Estado cuando el negocio está abierto
 */
function getOpenStatus(
  currentMinutes: number,
  activeShift: TimeShift,
  scheduleConfig: ScheduleConfig,
  currentTime: Date
): BusinessStatus {
  const endMinutes = timeStringToMinutes(activeShift.end);
  const minutesToClose = endMinutes - currentMinutes;
  
  let warningMessage = '';
  
  if (minutesToClose <= 60 && minutesToClose > 0) {
    if (minutesToClose > 30) {
      warningMessage = `Cierra en ${minutesToClose} minutos`;
    } else {
      const nextOpenTime = getNextOpenTime(currentTime, scheduleConfig);
      warningMessage = `Cierra en ${minutesToClose} minuto${minutesToClose !== 1 ? 's' : ''}${nextOpenTime ? `, vuelve a abrir ${nextOpenTime}` : ''}`;
    }
  }

  return {
    isOpen: true,
    statusMessage: 'ABIERTO',
    warningMessage,
    minutesToNextChange: minutesToClose,
  };
}

/**
 * Estado cuando el negocio está cerrado
 */
function getClosedStatus(currentTime: Date, scheduleConfig: ScheduleConfig): BusinessStatus {
  const nextOpenInfo = getNextOpenTime(currentTime, scheduleConfig);
  const minutesToOpen = getMinutesToNextOpen(currentTime, scheduleConfig);
  
  let statusMessage = 'CERRADO';
  let warningMessage = nextOpenInfo || 'Consultar horarios de atención';
  
  if (minutesToOpen && minutesToOpen <= 60) {
    warningMessage = `Abre en ${minutesToOpen} minuto${minutesToOpen !== 1 ? 's' : ''}`;
  }

  return {
    isOpen: false,
    statusMessage,
    warningMessage,
    minutesToNextChange: minutesToOpen,
    nextOpenTime: nextOpenInfo,
  };
}

/**
 * Obtiene el próximo horario de apertura
 */
function getNextOpenTime(currentTime: Date, scheduleConfig: ScheduleConfig): string | undefined {
  const currentDay = currentTime.getDay();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Buscar en el mismo día
  const todayConfig = scheduleConfig.workingDays.find(wd => wd.day === currentDay);
  if (todayConfig && todayConfig.isOpen) {
    const futureShift = todayConfig.shifts.find(shift => {
      const startMinutes = timeStringToMinutes(shift.start);
      return startMinutes > currentMinutes;
    });
    
    if (futureShift) {
      return `hoy a las ${futureShift.start}`;
    }
  }
  
  // Buscar en los próximos días
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i) % 7;
    const dayConfig = scheduleConfig.workingDays.find(wd => wd.day === checkDay);
    
    if (dayConfig && dayConfig.isOpen && dayConfig.shifts.length > 0) {
      const dayName = i === 1 ? 'mañana' : getDayName(checkDay);
      return `${dayName} a las ${dayConfig.shifts[0].start}`;
    }
  }
  
  return undefined;
}

/**
 * Calcula minutos hasta la próxima apertura
 */
function getMinutesToNextOpen(currentTime: Date, scheduleConfig: ScheduleConfig): number | undefined {
  const currentDay = currentTime.getDay();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Buscar en el mismo día
  const todayConfig = scheduleConfig.workingDays.find(wd => wd.day === currentDay);
  if (todayConfig && todayConfig.isOpen) {
    const futureShift = todayConfig.shifts.find(shift => {
      const startMinutes = timeStringToMinutes(shift.start);
      return startMinutes > currentMinutes;
    });
    
    if (futureShift) {
      return timeStringToMinutes(futureShift.start) - currentMinutes;
    }
  }
  
  return undefined; // Para días futuros sería más complejo calcular
}

/**
 * Obtiene el nombre del día
 */
function getDayName(dayNumber: number): string {
  const days = ['el domingo', 'el lunes', 'el martes', 'el miércoles', 'el jueves', 'el viernes', 'el sábado'];
  return days[dayNumber];
}