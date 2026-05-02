import { GameEvent, AssetId } from '../types';

export const TECH_ASSETS: AssetId[] = ['AKCJE_CDR', 'AKCJE_ALE', 'AKCJE_ACP', 'AKCJE_MSFT', 'AKCJE_GOOG', 'AKCJE_AMZN', 'AKCJE_TSMC'];
export const POLISH_STOCKS: AssetId[] = ['AKCJE_CDR', 'AKCJE_KGH', 'AKCJE_ALE', 'AKCJE_KRU', 'AKCJE_ACP', 'AKCJE_PKN'];
export const COMMODITIES: AssetId[] = ['ZLOTO', 'SREBRO', 'KAKAO', 'ROPA'];
export const SAFE_HAVENS: AssetId[] = ['KONTO_OSZ', 'OBLIG_OTS', 'OBLIG_DOS', 'OBLIG_TOZ', 'ZLOTO'];

export const GAME_EVENTS: GameEvent[] = [
  {
    year: 1,
    headline: "Stabilizacja i Wzrost",
    description: "Gospodarka powoli rośnie. To dobry czas na budowę portfela.",
    assetModifiers: []
  },
  {
    year: 3,
    headline: "Pęknięcie Bańki Technologicznej",
    description: "Inwestorzy panikują w sektorze IT. Akcje spółek technologicznych tracą na wartości przy ogromnej zmienności.",
    assetModifiers: TECH_ASSETS.map(id => ({ assetId: id, mu: -0.4, sigma: 0.3 }))
  },
  {
    year: 5,
    headline: "Hossa na Rynkach Wschodzących",
    description: "Kapitał płynie do krajów rozwijających się. GPW oraz ETF Emerging Markets w górę.",
    assetModifiers: [
      ...POLISH_STOCKS.map(id => ({ assetId: id, mu: 0.15, sigma: 0.05 })),
      { assetId: 'ETF_EM', mu: 0.2, sigma: 0.1 }
    ]
  },
  {
    year: 7,
    headline: "Gwałtowny Skok Inflacji",
    description: "Ceny towarów i usług rosną szybciej niż przewidywano. Gotówka traci na wartości, surowce drożeją.",
    assetModifiers: [
      { assetId: 'KONTO_OSZ', mu: -0.05, sigma: 0 },
      { assetId: 'OBLIG_OTS', mu: -0.04, sigma: 0 },
      ...COMMODITIES.map(id => ({ assetId: id, mu: 0.2, sigma: 0.1 }))
    ]
  },
  {
    year: 10,
    headline: "Złote Lata Polskiego Gamingu",
    description: "CD Projekt ogłasza nowy hit. Cały sektor gamedev w Polsce święci triumfy.",
    assetModifiers: [
      { assetId: 'AKCJE_CDR', mu: 0.5, sigma: 0.2 },
      { assetId: 'AKCJE_ACP', mu: 0.1, sigma: 0.05 }
    ]
  },
  {
    year: 12,
    headline: "Supercykl Surowcowy",
    description: "Globalny popyt na surowce przewyższa podaż. KGHM, Ropa i Srebro notują rekordowe wzrosty.",
    assetModifiers: [
      { assetId: 'AKCJE_KGH', mu: 0.3, sigma: 0.15 },
      { assetId: 'ROPA', mu: 0.25, sigma: 0.1 },
      { assetId: 'SREBRO', mu: 0.2, sigma: 0.15 }
    ]
  },
  {
    year: 15,
    headline: "Czarny Łabędź: Globalny Lockdown",
    description: "Niespodziewany kryzys paraliżuje świat. Indeksy giełdowe nurkują, ale sektor Tech i Złoto stają się bezpieczną przystanią.",
    assetModifiers: [
      { assetId: 'ETF_SP500', mu: -0.4, sigma: 0.4 },
      ...POLISH_STOCKS.map(id => ({ assetId: id, mu: -0.35, sigma: 0.3 })),
      ...TECH_ASSETS.map(id => ({ assetId: id, mu: 0.15, sigma: 0.1 })),
      { assetId: 'ZLOTO', mu: 0.2, sigma: 0.05 }
    ]
  },
  {
    year: 18,
    headline: "Krypto-Gorączka",
    description: "Bitcoin trafia do rezerw banków centralnych. Ekstremalne wzrosty i zmienność na rynku krypto.",
    assetModifiers: [
      { assetId: 'CFD_BTC', mu: 1.0, sigma: 0.5 }
    ]
  },
  {
    year: 20,
    headline: "Finałowa Prosta: Nowa Era",
    description: "Gospodarka stabilizuje się na wysokim poziomie. Ostatni rok gry – czas zmonetyzować zyski.",
    assetModifiers: [
      { assetId: 'ETF_SP500', mu: 0.1, sigma: 0.05 },
      { assetId: 'AKCJE_MSFT', mu: 0.1, sigma: 0.05 }
    ]
  }
];

export function getEventForYear(year: number): GameEvent | undefined {
  return GAME_EVENTS.find(e => e.year === year);
}
