import React, { useState } from 'react';

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('24.07');
  const [showDailyOverview, setShowDailyOverview] = useState(true);

  const dates = [
    { day: 'Th', date: '24.07', isSelected: true },
    { day: 'Fr', date: '25.07', isSelected: false },
    { day: 'Sa', date: '26.07', isSelected: false },
    { day: 'Su', date: '27.07', isSelected: false },
    { day: 'Mo', date: '28.07', isSelected: false },
    { day: 'Tu', date: '29.07', isSelected: false },
    { day: 'We', date: '30.07', isSelected: false },
    { day: 'Th', date: '31.07', isSelected: false },
    { day: 'Fr', date: '01.08', isSelected: false },
    { day: 'Sa', date: '02.08', isSelected: false },
    { day: 'Su', date: '03.08', isSelected: false },
    { day: 'Mo', date: '04.08', isSelected: false },
    { day: 'Tu', date: '05.0', isSelected: false },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">2025</h3>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium">
              today
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mb-6 overflow-x-auto">
          {dates.map((dateItem, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(dateItem.date)}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded ${
                dateItem.isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xs font-medium">{dateItem.day}</span>
              <span className="text-sm font-semibold">{dateItem.date}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setShowDailyOverview(!showDailyOverview)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showDailyOverview ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showDailyOverview ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">Show daily overview</span>
        </div>
      </div>
    </div>
  );
};

export default DateSelector; 