import React from 'react';
import { useGameStore } from '../../hooks/useGameStore';
import { AssetDefinition } from '../../types';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface AssetSliderProps {
  asset: AssetDefinition;
}

const AssetSlider: React.FC<AssetSliderProps> = ({ asset }) => {
  const { assets, cash, updateAllocation } = useGameStore();
  const currentAmount = assets[asset.id].amount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateAllocation(asset.id, value);
  };

  const formattedAmount = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(currentAmount);

  return (
    <div className="mb-4 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">{asset.label}</span>
          {asset.isToxic && <TrendingDown size={14} className="text-red-500" />}
          {!asset.isToxic && asset.annualReturn > 0.1 && <TrendingUp size={14} className="text-green-500" />}
        </div>
        <span className="text-xs font-mono text-slate-500">{formattedAmount}</span>
      </div>
      <input
        type="range"
        min="0"
        max={currentAmount + cash}
        step="100"
        value={currentAmount}
        onChange={handleChange}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-400">Zmienność: {(asset.annualVolatility * 100).toFixed(0)}%</span>
        <div className="group relative">
           <Info size={12} className="text-slate-300 cursor-help" />
           <div className="hidden group-hover:block absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl z-50">
             Średni zwrot: {(asset.annualReturn * 100).toFixed(1)}% rocznie. {asset.isToxic ? 'Wysokie ryzyko straty!' : ''}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSlider;
