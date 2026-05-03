import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';
import { X, Megaphone, Newspaper } from 'lucide-react';
import { clsx } from 'clsx';

const NewsBanner: React.FC = () => {
  const { news } = useGameStore();
  const latestNews = news[news.length - 1];

  if (!latestNews) return null;

  // Function to determine if a message is a report or a news event
  const isReport = (msg: string) => msg.includes('Zysk') || msg.includes('Strata');

  return (
    <div className="space-y-4 mb-8">
      {/* Latest Important News Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md relative overflow-hidden group">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-32 md:h-auto bg-slate-100 relative overflow-hidden flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400" 
              alt="Stock Market"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply"></div>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper className="text-brand-red" size={16} />
              <h4 className="text-[10px] font-black text-brand-red uppercase tracking-widest">Wiadomości z rynku</h4>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {latestNews.includes(':') ? latestNews.split(':')[0] : 'Aktualizacja portfela'}
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              {latestNews.includes(':') ? latestNews.split(':')[1] : latestNews}
            </p>
          </div>
        </div>
      </div>

      {/* Feed of recent updates */}
      <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {[...news].reverse().slice(0, 5).map((message, i) => (
          <div key={i} className={clsx(
            "p-3 rounded-xl border text-sm flex items-center gap-3 transition-all",
            message.includes('Zysk') ? "bg-green-50/50 border-green-100 text-green-700" : 
            message.includes('Strata') ? "bg-red-50/50 border-red-100 text-red-700" :
            "bg-blue-50/50 border-blue-100 text-blue-700 font-bold"
          )}>
            <div className={clsx(
              "w-2 h-2 rounded-full",
              message.includes('Zysk') ? "bg-green-400" : message.includes('Strata') ? "bg-red-400" : "bg-blue-400"
            )}></div>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBanner;
