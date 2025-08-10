import React, { useState } from 'react';
import Home from './pages/Home';
import Charts from './pages/Charts';
import Budget from './pages/Budget';
import BottomTabs from './components/BottomTabs';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'charts': return <Charts />;
      case 'budget': return <Budget />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="bg-primary text-white py-4 text-center font-semibold text-xl shadow-md">
        Belohnungstracker
      </header>

      <main className="flex-grow p-4 overflow-auto">
        {renderContent()}
      </main>

      <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
