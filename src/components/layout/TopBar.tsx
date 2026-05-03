import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';
import { Clock, TrendingUp, LayoutDashboard, LineChart, ShoppingCart, PieChart, Trophy, Settings, Wallet, Bell } from 'lucide-react';

const TopBar: React.FC = () => {
  const { currentYear, currentMonth, timer, totalNetWorth } = useGameStore();

  const formattedNetWorth = new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: 'PLN',
    maximumFractionDigits: 0
  }).format(totalNetWorth);

  const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 left-80 right-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 min-w-[140px]">
            <LayoutDashboard size={18} className="text-brand-blue" />
            <span className="text-sm font-bold text-slate-700">{monthNames[currentMonth - 1]} {currentYear}</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm font-bold text-orange-600 font-mono">{timer}s</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-brand-blue font-bold text-sm border-b-2 border-brand-blue h-16 px-1">
            <LineChart size={18} /> Portfolio
          </a>
          <a href="#" className="flex items-center gap-2 text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors">
            <ShoppingCart size={18} /> Handel
          </a>
          <a href="#" className="flex items-center gap-2 text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors">
            <PieChart size={18} /> Analizy
          </a>
          <a href="#" className="flex items-center gap-2 text-slate-400 font-medium text-sm hover:text-slate-600 transition-colors">
            <Trophy size={18} /> Ranking
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wartość Netto</h2>
          <div className="flex items-center gap-2">
            <p className="text-lg font-black text-slate-800 tracking-tight">{formattedNetWorth}</p>
            <div className="flex items-center bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
              <TrendingUp size={10} className="mr-0.5" /> +15%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-slate-100 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Lucas&background=2563eb&color=fff" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
