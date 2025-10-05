import React from 'react';
import type { ScheduleConfig, BusinessStatus } from '../../types';
import { Schedule } from '@mui/icons-material';

interface HoursCardProps {
  scheduleConfig: ScheduleConfig;
  businessStatus: BusinessStatus;
}

const HoursCard: React.FC<HoursCardProps> = ({ scheduleConfig, businessStatus }) => {
  // Ícono MUI con estética consistente con Services y About
  const ClockIcon = () => <Schedule sx={{ fontSize: 50, color: '#FFDA36', filter: 'drop-shadow(0px 0px 1px red)' }} />;

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
          
          {/* Mensaje informativo */}
          {businessStatus.warningMessage && (
            <div className="mt-2 bg-yellow-100 border border-yellow-400 rounded p-2">
              <p className="text-yellow-800 text-sm font-medium text-center">
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