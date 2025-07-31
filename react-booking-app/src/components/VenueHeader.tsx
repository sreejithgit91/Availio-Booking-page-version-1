import React, { useState } from 'react';

const VenueHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Booking');

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Venue Title */}
        <div className="py-6">
          <h2 className="text-2xl font-bold text-gray-900">Pits Soccer Club</h2>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-8">
          {['Booking', 'Info'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueHeader; 