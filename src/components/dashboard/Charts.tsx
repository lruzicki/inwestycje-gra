import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { useGameStore } from '../../hooks/useGameStore';
import { AssetId } from '../../types';
import { ASSET_DEFINITIONS } from '../../logic/simulation';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#2563eb', '#ef4444', '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#8b5cf6', '#06b6d4', '#14b8a6'];
const CATEGORY_COLORS: Record<string, string> = {
  'Likwidność': '#94a3b8',
  'Akcje PL': '#2563eb',
  'Świat': '#6366f1',
  'Surowce': '#f59e0b',
  'Ryzyko': '#ef4444'
};

const Charts: React.FC = () => {
  const { assets, monthlySavings } = useGameStore();

  // Find initial cash from KONTO_OSZ history
  const initialCash = assets['KONTO_OSZ'].history[0] || 0;

  const portfolioHistory = assets['KONTO_OSZ'].history.map((_, index) => {
    let totalValue = 0;
    Object.keys(assets).forEach(id => {
      totalValue += assets[id as AssetId].history[index] || 0;
    });
    return {
      month: index,
      value: totalValue,
      investment: initialCash + (index * monthlySavings)
    };
  });

  const categoryHistory = assets['KONTO_OSZ'].history.map((_, index) => {
    const data: any = { month: index };
    Object.keys(assets).forEach(id => {
      const assetId = id as AssetId;
      const category = ASSET_DEFINITIONS[assetId].category;
      data[category] = (data[category] || 0) + (assets[assetId].history[index] || 0);
    });
    return data;
  }).slice(-12); // Last 12 months for the bar chart

  const allocationData = Object.values(assets)
    .filter(a => a.amount > 1)
    .map(a => ({
      name: ASSET_DEFINITIONS[a.id].label,
      value: a.amount
    }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp size={16} className="text-brand-blue" /> Wkład vs Zwrot (Cała Historia)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" hide />
              <YAxis 
                tick={{fontSize: 10, fill: '#94a3b8'}} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(val) => `${(val/1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                formatter={(val: any) => [new Intl.NumberFormat('pl-PL').format(val) + ' PLN', '']}
              />
              <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Wartość portfela" />
              <Area type="monotone" dataKey="investment" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Suma wpłat" />
              <Legend verticalAlign="top" height={36} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 size={16} className="text-brand-blue" /> Kompozycja (Ostatnie 12m)
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={categoryHistory}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="month" hide />
                 <YAxis 
                    tick={{fontSize: 10, fill: '#94a3b8'}} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(val) => `${(val/1000).toFixed(0)}k`}
                 />
                 <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(val: any) => [new Intl.NumberFormat('pl-PL').format(val) + ' PLN', '']}
                 />
                 <Bar dataKey="Likwidność" stackId="a" fill={CATEGORY_COLORS['Likwidność']} radius={[0, 0, 0, 0]} />
                 <Bar dataKey="Akcje PL" stackId="a" fill={CATEGORY_COLORS['Akcje PL']} radius={[0, 0, 0, 0]} />
                 <Bar dataKey="Świat" stackId="a" fill={CATEGORY_COLORS['Świat']} radius={[0, 0, 0, 0]} />
                 <Bar dataKey="Surowce" stackId="a" fill={CATEGORY_COLORS['Surowce']} radius={[0, 0, 0, 0]} />
                 <Bar dataKey="Ryzyko" stackId="a" fill={CATEGORY_COLORS['Ryzyko']} radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider flex items-center gap-2">
            <PieChartIcon size={16} className="text-brand-blue" /> Struktura Portfela
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
