import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';
import { ASSET_DEFINITIONS } from '../../logic/simulation';
import AssetSlider from '../ui/AssetSlider';
import { Wallet, Landmark, BarChart3, Globe, Zap, AlertTriangle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { cash } = useGameStore();
  const formattedCash = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(cash);

  const categories = [
    { id: 'Likwidność', icon: Landmark, color: 'text-blue-500' },
    { id: 'Akcje PL', icon: BarChart3, color: 'text-red-500' },
    { id: 'Świat', icon: Globe, color: 'text-indigo-500' },
    { id: 'Surowce', icon: Zap, color: 'text-yellow-500' },
    { id: 'Ryzyko', icon: AlertTriangle, color: 'text-orange-600' },
  ];

  const assetsByCategory = (category: string) => 
    Object.values(ASSET_DEFINITIONS).filter(a => a.category === category && a.id !== 'KONTO_OSZ');

  return (
    <aside className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Wallet className="text-green-600" size={20} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gotówka (Konto Oszcz.)</h2>
            <p className="text-xl font-bold text-slate-800">{formattedCash}</p>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 italic">Oprocentowanie: 1% rocznie</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center gap-2 mb-4">
              <cat.icon size={16} className={cat.color} />
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide">{cat.id}</h3>
            </div>
            {assetsByCategory(cat.id).map(asset => (
              <AssetSlider key={asset.id} asset={asset} />
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 absolute bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200">
          Zatwierdź Alokację
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-2">Alokacja zostanie zatwierdzona automatycznie po upływie czasu.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
