import React, { useState } from 'react';

const BookingSelection: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState('16:45');
  const [selectedDuration, setSelectedDuration] = useState('60min');

  const timeSlots = ['16:45', '17:00', '18:00', '19:00', '20:00', '21:00'];
  const durations = [
    { duration: '60min', price: 'CHF 0.50' },
    { duration: '90min', price: 'CHF 0.50' },
    { duration: '120min', price: 'CHF 0.50' }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Select start time */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select start time</h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Select Court and booking duration */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select Court and booking duration
          </h3>
          
          <div className="mb-4">
            <h4 className="text-base font-medium text-gray-900 mb-3">Court 1</h4>
            <div className="flex flex-wrap gap-3">
              {durations.map((option) => (
                <button
                  key={option.duration}
                  onClick={() => setSelectedDuration(option.duration)}
                  className={`flex flex-col items-center p-4 rounded border-2 ${
                    selectedDuration === option.duration
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {option.price}
                  </span>
                  <span className="text-xs text-gray-600">
                    {option.duration}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSelection; 