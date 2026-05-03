import { create } from 'zustand';
import { AssetId, GameState, AssetState } from '../types';
import { ASSET_DEFINITIONS, simulateMonth } from '../logic/simulation';
import { getEventForYear } from '../logic/events';

interface GameStore extends GameState {
  startGame: (initialCash: number, monthlySavings: number) => void;
  tick: () => void;
  simulateMonth: () => void;
  updateAllocation: (id: AssetId, newAmount: number) => void;
  resetGame: () => void;
}

const createInitialAssets = (initialCash: number): Record<AssetId, AssetState> => {
  const assets: Partial<Record<AssetId, AssetState>> = {};
  Object.keys(ASSET_DEFINITIONS).forEach((id) => {
    const assetId = id as AssetId;
    assets[assetId] = {
      id: assetId,
      amount: assetId === 'KONTO_OSZ' ? initialCash : 0,
      history: [assetId === 'KONTO_OSZ' ? initialCash : 0],
    };
  });
  return assets as Record<AssetId, AssetState>;
};

export const useGameStore = create<GameStore>((set, get) => ({
  currentYear: 1,
  currentMonth: 1,
  monthlySavings: 2000,
  isGameStarted: false,
  cash: 0,
  assets: createInitialAssets(0),
  totalNetWorth: 0,
  timer: 5,
  news: ['Witaj w grze Czas to Pieniądz! Skonfiguruj swoją grę i zacznij inwestować.'],
  currentEvent: getEventForYear(1),

  startGame: (initialCash: number, monthlySavings: number) => {
    set({
      isGameStarted: true,
      cash: initialCash,
      monthlySavings,
      assets: createInitialAssets(initialCash),
      totalNetWorth: initialCash,
      currentYear: 1,
      currentMonth: 1,
      timer: 5,
      news: ['Gra rozpoczęta! Powodzenia!'],
      currentEvent: getEventForYear(1),
    });
  },

  tick: () => {
    const { timer, isGameStarted } = get();
    if (!isGameStarted) return;

    if (timer <= 1) {
      get().simulateMonth();
    } else {
      set({ timer: timer - 1 });
    }
  },

  simulateMonth: () => {
    set((state) => {
      const currentAssetAmounts: Record<AssetId, number> = {} as any;
      Object.keys(state.assets).forEach(id => {
        currentAssetAmounts[id as AssetId] = state.assets[id as AssetId].amount;
      });
      currentAssetAmounts['KONTO_OSZ'] = state.cash;

      const monthlyResults = simulateMonth(currentAssetAmounts, state.currentEvent?.assetModifiers);
      
      const newAssets = { ...state.assets };
      let newTotalNetWorth = 0;
      let monthlyProfitLoss = 0;

      Object.keys(monthlyResults).forEach(id => {
        const assetId = id as AssetId;
        const newAmount = monthlyResults[assetId];
        const oldAmount = currentAssetAmounts[assetId];
        
        monthlyProfitLoss += (newAmount - oldAmount);

        newAssets[assetId] = {
          id: assetId,
          amount: newAmount,
          history: [...state.assets[assetId].history, newAmount]
        };
        
        if (assetId !== 'KONTO_OSZ') {
            newTotalNetWorth += newAmount;
        }
      });

      const newCash = newAssets['KONTO_OSZ'].amount + state.monthlySavings;
      newAssets['KONTO_OSZ'].amount = newCash;
      newAssets['KONTO_OSZ'].history[newAssets['KONTO_OSZ'].history.length - 1] = newCash;
      
      newTotalNetWorth += newCash;

      const profitLossMessage = monthlyProfitLoss >= 0 
        ? `Zysk w tym miesiącu: +${new Intl.NumberFormat('pl-PL').format(Math.abs(monthlyProfitLoss))} PLN`
        : `Strata w tym miesiącu: -${new Intl.NumberFormat('pl-PL').format(Math.abs(monthlyProfitLoss))} PLN`;

      let nextMonth = state.currentMonth + 1;
      let nextYear = state.currentYear;
      let nextEvent = state.currentEvent;
      let newsMessage = profitLossMessage;

      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
        nextEvent = getEventForYear(nextYear);
        if (nextEvent) {
          newsMessage = `${nextEvent.headline}: ${nextEvent.description}`;
        }
      }

      return {
        currentMonth: nextMonth,
        currentYear: nextYear,
        cash: newCash,
        assets: newAssets,
        totalNetWorth: newTotalNetWorth,
        timer: 5,
        news: [...state.news, newsMessage],
        currentEvent: nextEvent
      };
    });
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

  resetGame: () => set({
    currentYear: 1,
    currentMonth: 1,
    isGameStarted: false,
    cash: 0,
    assets: createInitialAssets(0),
    totalNetWorth: 0,
    timer: 5,
    news: ['Gra zresetowana. Skonfiguruj ją ponownie.']
  }),
}));
