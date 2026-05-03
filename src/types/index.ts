export type AssetId = 
  | 'KONTO_OSZ' 
  | 'OBLIG_OTS' | 'OBLIG_DOS' | 'OBLIG_TOZ'
  | 'AKCJE_CDR' | 'AKCJE_KGH' | 'AKCJE_ALE' | 'AKCJE_KRU' | 'AKCJE_ACP' | 'AKCJE_PKN'
  | 'AKCJE_MSFT' | 'AKCJE_GOOG' | 'AKCJE_AMZN' | 'AKCJE_TSMC'
  | 'ETF_EM' | 'ETF_SP500'
  | 'ZLOTO' | 'SREBRO' | 'KAKAO' | 'ROPA'
  | 'CFD_BTC' | 'CFD_LEWAR';

export interface AssetDefinition {
  id: AssetId;
  label: string;
  category: 'Likwidność' | 'Akcje PL' | 'Świat' | 'Surowce' | 'Ryzyko';
  annualReturn: number;
  annualVolatility: number;
  description?: string;
  isToxic?: boolean;
}

export interface AssetState {
  id: AssetId;
  amount: number;
  history: number[]; // Monthly history
}

export interface AssetModifier {
  assetId: AssetId;
  mu: number; // Addition to annualReturn
  sigma: number; // Addition to annualVolatility
}

export interface GameEvent {
  year: number;
  headline: string;
  description: string;
  assetModifiers: AssetModifier[];
}

export interface GameState {
  currentYear: number;
  currentMonth: number;
  monthlySavings: number;
  isGameStarted: boolean;
  cash: number; // Balance in KONTO_OSZ
  assets: Record<AssetId, AssetState>;
  totalNetWorth: number;
  timer: number;
  news: string[];
  currentEvent?: GameEvent;
}
