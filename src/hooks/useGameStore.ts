import { create } from 'zustand';
import { AssetId, GameState, AssetState } from '../types';
import { ASSET_DEFINITIONS, simulateYear } from '../logic/simulation';
import { getEventForYear } from '../logic/events';

interface GameStore extends GameState {
  decrementTimer: () => void;
  advanceYear: () => void;
  updateAllocation: (id: AssetId, newAmount: number) => void;
  resetGame: () => void;
}

const INITIAL_CASH = 100000;
const YEARLY_INCOME = 24000;

const createInitialAssets = (): Record<AssetId, AssetState> => {
  const assets: Partial<Record<AssetId, AssetState>> = {};
  Object.keys(ASSET_DEFINITIONS).forEach((id) => {
    const assetId = id as AssetId;
    assets[assetId] = {
      id: assetId,
      amount: 0,
      history: [0],
    };
  });
  return assets as Record<AssetId, AssetState>;
};

export const useGameStore = create<GameStore>((set, get) => ({
  currentYear: 1,
  cash: INITIAL_CASH,
  assets: createInitialAssets(),
  totalNetWorth: INITIAL_CASH,
  timer: 60,
  news: ['Witaj w grze Czas to Pieniądz! Masz 60 sekund na alokację środków przed końcem roku.'],

  decrementTimer: () => {
    const { timer, advanceYear } = get();
    if (timer <= 1) {
      advanceYear();
    } else {
      set({ timer: timer - 1 });
    }
  },

  updateAllocation: (id: AssetId, newAmount: number) => {
    if (id === 'KONTO_OSZ') return; 
    
    set((state) => {
      const currentAssetAmount = state.assets[id].amount;
      const difference = newAmount - currentAssetAmount;
      
      if (difference > state.cash) {
        const maxPossibleAmount = currentAssetAmount + state.cash;
        const finalAsset = { ...state.assets[id], amount: maxPossibleAmount };
        return {
          cash: 0,
          assets: { ...state.assets, [id]: finalAsset }
        };
      }

      const finalAsset = { ...state.assets[id], amount: newAmount };
      return {
        cash: state.cash - difference,
        assets: { ...state.assets, [id]: finalAsset }
      };
    });
  },

  advanceYear: () => {
    set((state) => {
      const event = getEventForYear(state.currentYear);
      
      const currentAssetAmounts: Record<AssetId, number> = {} as any;
      Object.keys(state.assets).forEach(id => {
        currentAssetAmounts[id as AssetId] = state.assets[id as AssetId].amount;
      });
      currentAssetAmounts['KONTO_OSZ'] = state.cash;

      const simulationResults = simulateYear(currentAssetAmounts, event?.assetModifiers);
      
      const newAssets = { ...state.assets };
      let newTotalNetWorth = 0;

      Object.keys(simulationResults).forEach(id => {
        const assetId = id as AssetId;
        const monthlyHistory = simulationResults[assetId];
        const endYearAmount = monthlyHistory[11];
        
        newAssets[assetId] = {
          id: assetId,
          amount: endYearAmount,
          history: [...state.assets[assetId].history, ...monthlyHistory]
        };
        
        if (assetId !== 'KONTO_OSZ') {
            newTotalNetWorth += endYearAmount;
        }
      });

      const newCash = newAssets['KONTO_OSZ'].amount + YEARLY_INCOME;
      newAssets['KONTO_OSZ'].amount = newCash;
      newAssets['KONTO_OSZ'].history[newAssets['KONTO_OSZ'].history.length - 1] = newCash;
      
      newTotalNetWorth += newCash;

      const nextYearEvent = getEventForYear(state.currentYear + 1);
      const newsMessage = nextYearEvent 
        ? `${nextYearEvent.headline}: ${nextYearEvent.description}`
        : `Rok ${state.currentYear} zakończony. Otrzymano ${YEARLY_INCOME} PLN dochodu.`;

      return {
        currentYear: state.currentYear + 1,
        cash: newCash,
        assets: newAssets,
        totalNetWorth: newTotalNetWorth,
        timer: 60,
        news: [...state.news, newsMessage]
      };
    });
  },

  resetGame: () => set({
    currentYear: 1,
    cash: INITIAL_CASH,
    assets: createInitialAssets(),
    totalNetWorth: INITIAL_CASH,
    timer: 60,
    news: ['Gra zresetowana. Startujemy!']
  }),
}));
