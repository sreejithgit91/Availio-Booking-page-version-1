import React from 'react';

const TimeSlotGrid: React.FC = () => {
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Time grid header */}
        <div className="grid grid-cols-16 gap-1 mb-4">
          {/* Court label */}
          <div className="text-sm text-gray-600 font-medium">Court 1</div>
          
          {/* Time slot headers */}
          {timeSlots.map((time) => (
            <div key={time} className="text-xs text-gray-500 text-center">
              {time}
            </div>
          ))}
        </div>

        {/* Availability grid */}
        <div className="grid grid-cols-16 gap-1 h-8 mb-8">
          {/* Court 1 row */}
          <div></div> {/* Empty cell for court label alignment */}
          {timeSlots.map((time, index) => (
            <div
              key={`${time}-${index}`}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer transition-colors"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotGrid; 