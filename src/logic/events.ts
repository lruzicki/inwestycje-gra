import { GameEvent, AssetId } from '../types';

export const TECH_ASSETS: AssetId[] = ['AKCJE_CDR', 'AKCJE_ALE', 'AKCJE_ACP', 'AKCJE_MSFT', 'AKCJE_GOOG', 'AKCJE_AMZN', 'AKCJE_TSMC'];
export const POLISH_STOCKS: AssetId[] = ['AKCJE_CDR', 'AKCJE_KGH', 'AKCJE_ALE', 'AKCJE_KRU', 'AKCJE_ACP', 'AKCJE_PKN'];
export const COMMODITIES: AssetId[] = ['ZLOTO', 'SREBRO', 'KAKAO', 'ROPA'];

export const GAME_EVENTS: GameEvent[] = [
  {
    year: 1,
    headline: "Stabilizacja po pandemii",
    description: "Gospodarka wraca na tory wzrostu. Niskie stopy procentowe sprzyjają giełdzie.",
    assetModifiers: [
      { assetId: 'ETF_SP500', mu: 0.05, sigma: -0.02 },
      { assetId: 'AKCJE_MSFT', mu: 0.05, sigma: 0 }
    ]
  },
  {
    year: 2,
    headline: "Hossa AI - Początek",
    description: "Inwestorzy dostrzegają potencjał sztucznej inteligencji. Giganci technologiczni zyskują.",
    assetModifiers: [
      { assetId: 'AKCJE_MSFT', mu: 0.15, sigma: 0.05 },
      { assetId: 'AKCJE_GOOG', mu: 0.12, sigma: 0.05 },
      { assetId: 'AKCJE_TSMC', mu: 0.2, sigma: 0.1 }
    ]
  },
  {
    year: 3,
    headline: "Pęknięcie Bańki Tech",
    description: "Wyceny spółek technologicznych były zbyt wysokie. Gwałtowna korekta na Nasdaq i S&P 500.",
    assetModifiers: TECH_ASSETS.map(id => ({ assetId: id, mu: -0.35, sigma: 0.25 }))
  },
  {
    year: 4,
    headline: "Ożywienie na GPW",
    description: "Polskie spółki są niedowartościowane. Zagraniczny kapitał płynie do Warszawy.",
    assetModifiers: POLISH_STOCKS.map(id => ({ assetId: id, mu: 0.15, sigma: 0.05 }))
  },
  {
    year: 5,
    headline: "Kryzys Energetyczny",
    description: "Napięcia geopolityczne windują ceny ropy. Orlen zyskuje na marżach rafineryjnych.",
    assetModifiers: [
      { assetId: 'ROPA', mu: 0.3, sigma: 0.15 },
      { assetId: 'AKCJE_PKN', mu: 0.15, sigma: 0.1 }
    ]
  },
  {
    year: 6,
    headline: "Złoto jako bezpieczna przystań",
    description: "Niepewność na rynkach akcji skłania inwestorów do zakupu kruszców.",
    assetModifiers: [
      { assetId: 'ZLOTO', mu: 0.15, sigma: 0.02 },
      { assetId: 'SREBRO', mu: 0.12, sigma: 0.05 }
    ]
  },
  {
    year: 7,
    headline: "Gwałtowny Skok Inflacji",
    description: "Banki Centralne spóźniły się z podwyżkami stóp. Gotówka traci siłę nabywczą.",
    assetModifiers: [
      { assetId: 'KONTO_OSZ', mu: -0.04, sigma: 0 },
      ...COMMODITIES.map(id => ({ assetId: id, mu: 0.2, sigma: 0.1 }))
    ]
  },
  {
    year: 8,
    headline: "Wojna Handlowa USA-Chiny",
    description: "Nowe cła uderzają w łańcuchy dostaw. Spadek marż w sektorze chipów i elektroniki.",
    assetModifiers: [
      { assetId: 'AKCJE_TSMC', mu: -0.2, sigma: 0.15 },
      { assetId: 'AKCJE_AMZN', mu: -0.15, sigma: 0.1 }
    ]
  },
  {
    year: 9,
    headline: "Recesja w Europie",
    description: "Niemiecka gospodarka hamuje. Słabe wyniki spółek z indeksu DAX i WIG20.",
    assetModifiers: [
      { assetId: 'AKCJE_ACP', mu: -0.1, sigma: 0.1 },
      { assetId: 'AKCJE_ALE', mu: -0.15, sigma: 0.15 }
    ]
  },
  {
    year: 10,
    headline: "Premiera Dekady: CD Projekt",
    description: "Nowa gra studia okazuje się światowym fenomenem. Akcje CDR szybują.",
    assetModifiers: [
      { assetId: 'AKCJE_CDR', mu: 0.6, sigma: 0.3 }
    ]
  },
  {
    year: 11,
    headline: "Taniejący Dolar",
    description: "Fed luzuje politykę pieniężną. Rynki wschodzące (Emerging Markets) zyskują najwięcej.",
    assetModifiers: [
      { assetId: 'ETF_EM', mu: 0.25, sigma: 0.1 },
      { assetId: 'ETF_SP500', mu: 0.1, sigma: 0.05 }
    ]
  },
  {
    year: 12,
    headline: "Supercykl Surowcowy",
    description: "Popyt z Azji winduje ceny miedzi. KGHM ogłasza rekordową dywidendę.",
    assetModifiers: [
      { assetId: 'AKCJE_KGH', mu: 0.35, sigma: 0.15 },
      { assetId: 'SREBRO', mu: 0.2, sigma: 0.1 }
    ]
  },
  {
    year: 13,
    headline: "Regulacje Big Tech",
    description: "Nowe prawo antymonopolowe w USA uderza w Google i Amazon.",
    assetModifiers: [
      { assetId: 'AKCJE_GOOG', mu: -0.2, sigma: 0.1 },
      { assetId: 'AKCJE_AMZN', mu: -0.15, sigma: 0.1 }
    ]
  },
  {
    year: 14,
    headline: "Hossa na Kakao",
    description: "Nieurodzaj w Afryce Zachodniej powoduje deficyt surowca. Ceny kakao biją rekordy.",
    assetModifiers: [
      { assetId: 'KAKAO', mu: 0.5, sigma: 0.25 }
    ]
  },
  {
    year: 15,
    headline: "Czarny Łabędź: Globalny Lockdown",
    description: "Kolejna pandemia paraliżuje świat. Szeroki rynek akcji nurkuje.",
    assetModifiers: [
      { assetId: 'ETF_SP500', mu: -0.3, sigma: 0.3 },
      ...POLISH_STOCKS.map(id => ({ assetId: id, mu: -0.25, sigma: 0.25 }))
    ]
  },
  {
    year: 16,
    headline: "Cyfrowe Złoto",
    description: "Fundusze emerytalne zaczynają kupować Bitcoin. Instytucjonalna adopcja kryptowalut.",
    assetModifiers: [
      { assetId: 'CFD_BTC', mu: 1.2, sigma: 0.6 }
    ]
  },
  {
    year: 17,
    headline: "Wielka windykacja",
    description: "Po kryzysie rośnie rynek długów. Kruk notuje najlepsze wyniki w historii.",
    assetModifiers: [
      { assetId: 'AKCJE_KRU', mu: 0.25, sigma: 0.1 }
    ]
  },
  {
    year: 18,
    headline: "Bańka na Rynku Nieruchomości",
    description: "Wzrost stóp procentowych uderza w sektor budowlany i e-commerce.",
    assetModifiers: [
      { assetId: 'AKCJE_ALE', mu: -0.2, sigma: 0.2 }
    ]
  },
  {
    year: 19,
    headline: "Przełom w Fuzji Jądrowej",
    description: "Tania energia zmienia zasady gry. Tradycyjne spółki paliwowe tracą na znaczeniu.",
    assetModifiers: [
      { assetId: 'AKCJE_PKN', mu: -0.15, sigma: 0.15 },
      { assetId: 'AKCJE_TSMC', mu: 0.15, sigma: 0.1 }
    ]
  },
  {
    year: 20,
    headline: "Finałowa Prosta",
    description: "Ostatni rok inwestowania. Zoptymalizuj swój portfel przed wypłatą.",
    assetModifiers: [
      { assetId: 'ETF_SP500', mu: 0.1, sigma: 0.05 }
    ]
  }
];

export function getEventForYear(year: number): GameEvent | undefined {
  return GAME_EVENTS.find(e => e.year === year);
}
