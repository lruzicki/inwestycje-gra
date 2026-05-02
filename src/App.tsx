import React, { useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './components/dashboard/Dashboard';
import { useGameStore } from './hooks/useGameStore';

function App() {
  const { decrementTimer } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [decrementTimer]);

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-slate-900 selection:bg-blue-100">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
