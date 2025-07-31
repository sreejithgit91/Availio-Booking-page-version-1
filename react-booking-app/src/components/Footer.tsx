import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center mb-6">
          <button className="bg-gray-500 text-white px-6 py-2 rounded font-medium hover:bg-gray-600 transition-colors">
            Sign out
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-blue-600">fairgate</span>
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Network for Sports & Wellness
          </p>

          <div className="text-xs text-gray-500 text-center">
            <p className="mb-2">Copyright © Fairgate AG, 2025 All rights reserved</p>
            <div className="flex space-x-4 justify-center">
              <a href="#" className="hover:text-gray-700 underline">
                Fairgate Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-700 underline">
                Fairgate Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 