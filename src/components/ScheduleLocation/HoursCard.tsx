import React from 'react';
import type { ScheduleConfig, BusinessStatus } from '../../types';

interface HoursCardProps {
  scheduleConfig: ScheduleConfig;
  businessStatus: BusinessStatus;
}

const HoursCard: React.FC<HoursCardProps> = ({ scheduleConfig, businessStatus }) => {
  // Íconos usando emojis por simplicidad (se puede cambiar por MUI icons)
  const ClockIcon = () => <span className="text-5xl">🕐</span>;
  const WarningIcon = () => <span className="text-lg">⚠️</span>;

  return (
    <div className="bg-[#e5e5e5] rounded shadow-lg text-center p-6 min-h-[400px] flex flex-col">
      {/* Ícono */}
      <div className="mb-4">
        <ClockIcon />
      </div>
      
      {/* Título */}
      <h4 className="font-bold text-lg uppercase text-gray-900 mb-4">
        Horarios de Atención
      </h4>
      
      {/* Horarios */}
      <div className="space-y-3 text-gray-600 flex-grow flex flex-col justify-center">
        {/* Días laborables */}
        <div className="bg-white rounded p-3 border-l-4 border-gray-400">
          <p className="font-semibold text-gray-900">Lunes a Viernes</p>
          {scheduleConfig.workingDays
            .find(day => day.day === 1)
            ?.shifts.map((shift, index) => (
              <p key={index}>{shift.start} - {shift.end} hs</p>
            ))
          }
        </div>

        {/* Estado actual */}
        <div className={`rounded p-3 border-l-4 ${
          businessStatus.isOpen 
            ? 'bg-green-50 border-green-400' 
            : 'bg-red-50 border-red-400'
        }`}>
          <p className="font-semibold text-gray-900">
            En este momento el taller se encuentra:
          </p>
          <p className={`font-bold text-lg ${
            businessStatus.isOpen 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {businessStatus.statusMessage}
          </p>
          
          {/* Mensaje de advertencia */}
          {businessStatus.warningMessage && (
            <div className="mt-2 flex items-center justify-center gap-2 bg-yellow-100 border border-yellow-400 rounded p-2">
              <WarningIcon />
              <p className="text-yellow-800 text-sm font-medium">
                {businessStatus.warningMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoursCard;