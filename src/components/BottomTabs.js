import React from 'react';
import { FaHome, FaChartBar, FaWallet } from 'react-icons/fa';

const tabs = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'charts', label: 'Statistik', icon: <FaChartBar /> },
  { id: 'budget', label: 'Budget', icon: <FaWallet /> },
];

export default function BottomTabs({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-white shadow-t flex justify-around border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center p-2 text-sm transition-colors duration-200 ${
            activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-primary'
          }`}
        >
          <div className="text-xl">{tab.icon}</div>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
