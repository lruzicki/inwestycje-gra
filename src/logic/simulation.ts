import { AssetDefinition, AssetId, AssetModifier } from '../types';
import { randomNormal } from './math';

export const ASSET_DEFINITIONS: Record<AssetId, AssetDefinition> = {
  KONTO_OSZ: { id: 'KONTO_OSZ', label: 'Konto Oszczędnościowe', category: 'Likwidność', annualReturn: 0.01, annualVolatility: 0.001 },
  OBLIG_OTS: { id: 'OBLIG_OTS', label: 'Obligacje OTS (3-mies)', category: 'Likwidność', annualReturn: 0.03, annualVolatility: 0.002 },
  OBLIG_DOS: { id: 'OBLIG_DOS', label: 'Obligacje DOS (2-letnie)', category: 'Likwidność', annualReturn: 0.045, annualVolatility: 0.005 },
  OBLIG_TOZ: { id: 'OBLIG_TOZ', label: 'Obligacje TOZ (10-letnie)', category: 'Likwidność', annualReturn: 0.065, annualVolatility: 0.01 },
  
  AKCJE_CDR: { id: 'AKCJE_CDR', label: 'CD Projekt', category: 'Akcje PL', annualReturn: 0.05, annualVolatility: 0.45 },
  AKCJE_KGH: { id: 'AKCJE_KGH', label: 'KGHM', category: 'Akcje PL', annualReturn: 0.08, annualVolatility: 0.35 },
  AKCJE_ALE: { id: 'AKCJE_ALE', label: 'Allegro', category: 'Akcje PL', annualReturn: 0.04, annualVolatility: 0.40 },
  AKCJE_KRU: { id: 'AKCJE_KRU', label: 'Kruk', category: 'Akcje PL', annualReturn: 0.15, annualVolatility: 0.25 },
  AKCJE_ACP: { id: 'AKCJE_ACP', label: 'Asseco', category: 'Akcje PL', annualReturn: 0.08, annualVolatility: 0.18 },
  AKCJE_PKN: { id: 'AKCJE_PKN', label: 'Orlen', category: 'Akcje PL', annualReturn: 0.06, annualVolatility: 0.30 },
  
  AKCJE_MSFT: { id: 'AKCJE_MSFT', label: 'Microsoft', category: 'Świat', annualReturn: 0.16, annualVolatility: 0.20 },
  AKCJE_GOOG: { id: 'AKCJE_GOOG', label: 'Google', category: 'Świat', annualReturn: 0.14, annualVolatility: 0.22 },
  AKCJE_AMZN: { id: 'AKCJE_AMZN', label: 'Amazon', category: 'Świat', annualReturn: 0.15, annualVolatility: 0.25 },
  AKCJE_TSMC: { id: 'AKCJE_TSMC', label: 'TSMC (Chipy)', category: 'Świat', annualReturn: 0.18, annualVolatility: 0.30 },
  ETF_EM: { id: 'ETF_EM', label: 'ETF Emerging Markets', category: 'Świat', annualReturn: 0.08, annualVolatility: 0.22 },
  ETF_SP500: { id: 'ETF_SP500', label: 'ETF S&P 500', category: 'Świat', annualReturn: 0.13, annualVolatility: 0.11 },
  
  ZLOTO: { id: 'ZLOTO', label: 'Złoto', category: 'Surowce', annualReturn: 0.075, annualVolatility: 0.15 },
  SREBRO: { id: 'SREBRO', label: 'Srebro', category: 'Surowce', annualReturn: 0.085, annualVolatility: 0.25 },
  KAKAO: { id: 'KAKAO', label: 'Kakao', category: 'Surowce', annualReturn: 0.10, annualVolatility: 0.40 },
  ROPA: { id: 'ROPA', label: 'Ropa Naftowa', category: 'Surowce', annualReturn: 0.06, annualVolatility: 0.35 },
  
  CFD_BTC: { id: 'CFD_BTC', label: 'CFD Bitcoin', category: 'Ryzyko', annualReturn: 0.40, annualVolatility: 0.85 },
  CFD_LEWAR: { id: 'CFD_LEWAR', label: 'CFD Lewarowany', category: 'Ryzyko', annualReturn: -0.15, annualVolatility: 1.20, isToxic: true },
};

/**
 * Calculates monthly return using Geometric Brownian Motion (GBM)
 */
export function calculateMonthlyReturn(annualReturn: number, annualVolatility: number): number {
  const dt = 1 / 12;
  const mu = annualReturn;
  const sigma = annualVolatility;
  
  // Drift and diffusion
  const drift = (mu - 0.5 * Math.pow(sigma, 2)) * dt;
  const diffusion = sigma * Math.sqrt(dt) * randomNormal();
  
  return Math.exp(drift + diffusion) - 1;
}

export function simulateYear(
  assets: Record<AssetId, number>, 
  modifiers: AssetModifier[] = []
): Record<AssetId, number[]> {
  const results: Partial<Record<AssetId, number[]>> = {};
  
  Object.keys(ASSET_DEFINITIONS).forEach((id) => {
    const assetId = id as AssetId;
    const def = ASSET_DEFINITIONS[assetId];
    const modifier = modifiers.find(m => m.assetId === assetId);
    
    const mu = def.annualReturn + (modifier?.mu || 0);
    const sigma = Math.max(0.001, def.annualVolatility + (modifier?.sigma || 0));

    let currentAmount = assets[assetId] || 0;
    const monthlyHistory: number[] = [];
    
    for (let m = 0; m < 12; m++) {
      const monthlyReturn = calculateMonthlyReturn(mu, sigma);
      currentAmount = currentAmount * (1 + monthlyReturn);
      monthlyHistory.push(currentAmount);
    }
    
    results[assetId] = monthlyHistory;
  });
  
  return results as Record<AssetId, number[]>;
}

export function simulateMonth(
  assets: Record<AssetId, number>, 
  modifiers: AssetModifier[] = []
): Record<AssetId, number> {
  const results: Partial<Record<AssetId, number>> = {};
  
  Object.keys(ASSET_DEFINITIONS).forEach((id) => {
    const assetId = id as AssetId;
    const def = ASSET_DEFINITIONS[assetId];
    const modifier = modifiers.find(m => m.assetId === assetId);
    
    const mu = def.annualReturn + (modifier?.mu || 0);
    const sigma = Math.max(0.001, def.annualVolatility + (modifier?.sigma || 0));

    const currentAmount = assets[assetId] || 0;
    const monthlyReturn = calculateMonthlyReturn(mu, sigma);
    results[assetId] = currentAmount * (1 + monthlyReturn);
  });
  
  return results as Record<AssetId, number>;
}
