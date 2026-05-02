import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';
import { X, Megaphone } from 'lucide-react';

const NewsBanner: React.FC = () => {
  const { news } = useGameStore();
  const latestNews = news[news.length - 1];

  if (!latestNews) return null;

  return (
    <div className="bg-white border border-red-100 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red"></div>
      <div className="flex items-center gap-4">
        <div className="p-2 bg-red-50 rounded-xl">
          <Megaphone className="text-brand-red animate-pulse" size={24} />
        </div>
        <div>
          <h4 className="text-[10px] font-black text-brand-red uppercase tracking-widest mb-0.5">Pilne: Breaking News</h4>
          <p className="text-sm font-bold text-slate-800">{latestNews}</p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-slate-500 transition-colors">
        <X size={20} />
      </button>
    </div>
  );
};

export default NewsBanner;
