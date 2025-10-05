import { useMemo } from 'react';
import type { ScheduleConfig, BusinessStatus, TimeShift } from '../types';
import { useCurrentTime } from './useCurrentTime';

/**
 * Hook que calcula el estado actual del negocio (abierto/cerrado)
 * basado en horarios configurables y tiempo real con mensajes precisos
 */
export function useBusinessStatus(scheduleConfig: ScheduleConfig): BusinessStatus {
  const currentTime = useCurrentTime();

  return useMemo(() => {
    return calculateBusinessStatus(currentTime, scheduleConfig);
  }, [currentTime, scheduleConfig]);
}

/**
 * Calcula el estado del negocio basado en el tiempo y configuración
 * con lógica mejorada y mensajes precisos
 */
function calculateBusinessStatus(
  currentTime: Date,
  scheduleConfig: ScheduleConfig
): BusinessStatus {
  const day = currentTime.getDay();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Verificar si es feriado
  if (isHoliday(currentTime, scheduleConfig)) {
    return getHolidayStatus(currentTime, scheduleConfig);
  }
  
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
    return getOpenStatus(currentMinutes, activeShift, todayConfig, scheduleConfig, currentTime);
  }

  return getClosedStatus(currentTime, scheduleConfig);
}

/**
 * Verifica si es feriado
 */
function isHoliday(currentTime: Date, scheduleConfig: ScheduleConfig): boolean {
  if (!scheduleConfig.holidays) return false;
  
  const dateString = formatDateToString(currentTime);
  return scheduleConfig.holidays.includes(dateString);
}

/**
 * Formato fecha a string YYYY-MM-DD
 */
function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Estado para días feriados
 */
function getHolidayStatus(currentTime: Date, scheduleConfig: ScheduleConfig): BusinessStatus {
  const nextOpenInfo = getNextOpenTime(currentTime, scheduleConfig);
  
  return {
    isOpen: false,
    statusMessage: 'CERRADO',
    warningMessage: `Día no laborable. ${nextOpenInfo || 'Consultar horarios'}`,
    minutesToNextChange: undefined,
  };
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
 * Estado cuando el negocio está abierto con mensajes precisos
 */
function getOpenStatus(
  currentMinutes: number,
  activeShift: TimeShift,
  todayConfig: any,
  scheduleConfig: ScheduleConfig,
  currentTime: Date
): BusinessStatus {
  const endMinutes = timeStringToMinutes(activeShift.end);
  const minutesToClose = endMinutes - currentMinutes;
  
  let warningMessage = '';
  
  // Solo mostrar aviso en la última hora
  if (minutesToClose <= 60 && minutesToClose > 0) {
    const nextOpenInfo = getNextOpenTimeAfterClose(currentTime, todayConfig, scheduleConfig);
    warningMessage = `Cierra en ${minutesToClose} minutos${nextOpenInfo ? `, vuelve a abrir ${nextOpenInfo}` : ''}`;
  }

  return {
    isOpen: true,
    statusMessage: 'ABIERTO',
    warningMessage,
    minutesToNextChange: minutesToClose,
  };
}

/**
 * Obtiene información de próxima apertura después del cierre actual
 */
function getNextOpenTimeAfterClose(currentTime: Date, todayConfig: any, scheduleConfig: ScheduleConfig): string | undefined {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Buscar si hay otro turno hoy después del actual
  const futureShift = todayConfig.shifts.find((shift: TimeShift) => {
    const startMinutes = timeStringToMinutes(shift.start);
    return startMinutes > currentMinutes;
  });
  
  if (futureShift) {
    return `a las ${futureShift.start} hs`;
  }
  
  // Si no hay más turnos hoy, buscar mañana
  const tomorrowDay = (currentTime.getDay() + 1) % 7;
  const tomorrowConfig = scheduleConfig.workingDays.find(wd => wd.day === tomorrowDay);
  
  if (tomorrowConfig && tomorrowConfig.isOpen && tomorrowConfig.shifts.length > 0) {
    return `mañana a las ${tomorrowConfig.shifts[0].start} hs`;
  }
  
  return 'consultar horarios';
}

/**
 * Estado cuando el negocio está cerrado con mensajes precisos
 */
function getClosedStatus(currentTime: Date, scheduleConfig: ScheduleConfig): BusinessStatus {
  // Verificar si es feriado
  if (isHoliday(currentTime, scheduleConfig)) {
    return getHolidayStatus(currentTime, scheduleConfig);
  }
  
  const minutesToOpen = getMinutesToNextOpen(currentTime, scheduleConfig);
  let warningMessage = '';
  
  // Si abre en menos de 60 minutos
  if (minutesToOpen && minutesToOpen <= 60) {
    warningMessage = `Vuelve a abrir en ${minutesToOpen} minuto${minutesToOpen !== 1 ? 's' : ''}`;
  } else {
    // Mensajes según el contexto del día
    const nextOpenInfo = getNextOpenTime(currentTime, scheduleConfig);
    warningMessage = nextOpenInfo || 'Consultar horarios de atención';
  }

  return {
    isOpen: false,
    statusMessage: 'CERRADO',
    warningMessage,
    minutesToNextChange: minutesToOpen,
  };
}

/**
 * Obtiene el próximo horario de apertura con mensajes contextuales
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
      return `Vuelve a abrir a las ${futureShift.start} hs`;
    }
  }
  
  // Buscar mañana (no feriado)
  const tomorrowDate = new Date(currentTime);
  tomorrowDate.setDate(currentTime.getDate() + 1);
  
  if (!isHoliday(tomorrowDate, scheduleConfig)) {
    const tomorrowDay = tomorrowDate.getDay();
    const tomorrowConfig = scheduleConfig.workingDays.find(wd => wd.day === tomorrowDay);
    
    if (tomorrowConfig && tomorrowConfig.isOpen && tomorrowConfig.shifts.length > 0) {
      return `Vuelve a abrir mañana a las ${tomorrowConfig.shifts[0].start} hs`;
    }
  }
  
  // Buscar en los próximos días (saltando feriados)
  for (let i = 1; i <= 7; i++) {
    const checkDate = new Date(currentTime);
    checkDate.setDate(currentTime.getDate() + i);
    
    if (!isHoliday(checkDate, scheduleConfig)) {
      const checkDay = checkDate.getDay();
      const dayConfig = scheduleConfig.workingDays.find(wd => wd.day === checkDay);
      
      if (dayConfig && dayConfig.isOpen && dayConfig.shifts.length > 0) {
        const dayName = i === 1 ? 'mañana' : getDayName(checkDay);
        return `Vuelve a abrir ${dayName} a las ${dayConfig.shifts[0].start} hs`;
      }
    }
  }
  
  return undefined;
}

/**
 * Calcula minutos hasta la próxima apertura (solo mismo día)
 */
function getMinutesToNextOpen(currentTime: Date, scheduleConfig: ScheduleConfig): number | undefined {
  const currentDay = currentTime.getDay();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Solo calcular si abre el mismo día
  const todayConfig = scheduleConfig.workingDays.find(wd => wd.day === currentDay);
  if (todayConfig && todayConfig.isOpen && !isHoliday(currentTime, scheduleConfig)) {
    const futureShift = todayConfig.shifts.find(shift => {
      const startMinutes = timeStringToMinutes(shift.start);
      return startMinutes > currentMinutes;
    });
    
    if (futureShift) {
      return timeStringToMinutes(futureShift.start) - currentMinutes;
    }
  }
  
  return undefined;
}

/**
 * Obtiene el nombre del día
 */
function getDayName(dayNumber: number): string {
  const days = ['el domingo', 'el lunes', 'el martes', 'el miércoles', 'el jueves', 'el viernes', 'el sábado'];
  return days[dayNumber];
}