import React, { useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './components/dashboard/Dashboard';
import SetupModal from './components/layout/SetupModal';
import { useGameStore } from './hooks/useGameStore';

function App() {
  const { tick } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-slate-900 selection:bg-blue-100">
      <SetupModal />
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
