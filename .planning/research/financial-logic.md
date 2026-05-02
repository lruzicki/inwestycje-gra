# Rozszerzona Logika Finansowa: Czas to Pieniądz (Edycja Ekspert)

Ten dokument definiuje parametry dla szerokiego spektrum aktywów, uwzględniając polski rynek, globalną technologię, surowce oraz specyficzną mechanikę strat na CFD.

## 1. Płynność i Dłużne Papiery Wartościowe (Polska)
Niskie ryzyko, niska stopa zwrotu. Idealne do parkowania kapitału.

| Asset ID | Nazwa | Średni Roczny % | Zmienność % | Opis |
| :--- | :--- | :--- | :--- | :--- |
| `KONTO_OSZ` | Konto Oszczędnościowe | 1.0% | 0.1% | Podstawowa płynność. |
| `OBLIG_OTS` | Obligacje OTS (3-mies) | 3.0% | 0.2% | Krótkoterminowe, stałe oprocentowanie. |
| `OBLIG_DOS` | Obligacje DOS (2-letnie) | 4.5% | 0.5% | Średnioterminowe, stałe. |
| `OBLIG_TOZ` | Obligacje TOZ (10-letnie) | 6.5% | 1.0% | Indeksowane inflacją (EDO/TOZ). |

## 2. Akcje Polska (WGPW)
Wyższa zmienność, ryzyko lokalne i polityczne.

| Asset ID | Nazwa | Średni Roczny % | Zmienność % | Charakterystyka |
| :--- | :--- | :--- | :--- | :--- |
| `AKCJE_CDR` | CD Projekt | 12.0% | 45.0% | "High roller" polskiej giełdy. |
| `AKCJE_KGH` | KGHM | 9.0% | 35.0% | Skorelowane z miedzią/srebrem. |
| `AKCJE_ALE` | Allegro | 7.0% | 40.0% | E-commerce, wrażliwe na konkurencję. |
| `AKCJE_KRU` | Kruk | 15.0% | 25.0% | Windykacja, historycznie bardzo silna spółka. |
| `AKCJE_ACP` | Asseco | 8.0% | 18.0% | Stabilny dywidendowy software. |
| `AKCJE_PKN` | Orlen | 6.0% | 30.0% | Energetyka, duży wpływ polityki. |

## 3. Akcje Świat i Technologia (USA/Tajwan)
Silna korelacja z dolarem (USD/PLN jako hedge).

| Asset ID | Nazwa | Średni Roczny % | Zmienność % | Charakterystyka |
| :--- | :--- | :--- | :--- | :--- |
| `AKCJE_MSFT` | Microsoft | 18.0% | 20.0% | Lider AI i Cloud. |
| `AKCJE_GOOG` | Google | 16.0% | 22.0% | Monopol reklamowy, AI. |
| `AKCJE_AMZN` | Amazon | 17.0% | 25.0% | Cloud i handel globalny. |
| `AKCJE_TSMC` | TSMC (Chipy) | 20.0% | 30.0% | Klucz do globalnej elektroniki. |
| `ETF_EM` | ETF Emerging Markets | 9.0% | 22.0% | Rynki wschodzące, zyskuje gdy dolar słabnie. |
| `ETF_SP500` | ETF S&P 500 | 11.5% | 15.0% | Standard globalnego wzrostu. |

## 4. Surowce (Commodities)
Aktywa fizyczne i cykliczne.

| Asset ID | Nazwa | Średni Roczny % | Zmienność % | Opis |
| :--- | :--- | :--- | :--- | :--- |
| `ZLOTO` | Złoto | 7.5% | 15.0% | Safe haven. |
| `SREBRO` | Srebro | 8.5% | 25.0% | "Złoto dla ubogich", bardziej zmienne. |
| `KAKAO` | Kakao | 10.0% | 40.0% | Ekstremalnie cykliczne, ryzyka pogodowe. |
| `ROPA` | Ropa Naftowa | 6.0% | 35.0% | Geopolityka i przemysł. |

## 5. Instrumenty Wysokiego Ryzyka (CFD/Crypto)
Mechanika "Pułapki na Detalistę".

| Asset ID | Nazwa | Średni Roczny % | Zmienność % | Specjalna Logika |
| :--- | :--- | :--- | :--- | :--- |
| `CFD_BTC` | CFD Bitcoin | 40.0% | 85.0% | Krypto-zmienność. |
| `CFD_LEWAR` | CFD Lewarowany (Indeks) | -15.0%* | 120.0% | **80% szans na stratę pozycji** w skali roku przez koszty finansowania i zmienność. |

*Uwaga: Średni zwrot dla CFD lewarowanego jest ujemny, aby odzwierciedlić statystyki, gdzie większość graczy traci kapitał.*

## Mechanika Symulacji "Miesiąc po Miesiącu"
1. Co miesiąc liczona jest cena każdego aktywa (GBM).
2. Wykresy łączą te 12 punktów z każdego roku w jedną ciągłą linię.
3. **Korelacje:**
   - Gdy `ETF_EM` rośnie, dolar zazwyczaj słabnie (mniejszy zysk z `ETF_SP500` w PLN).
   - Gdy `ROPA` drożeje, `AKCJE_PKN` może tracić na marżach (lub zyskiwać na wydobyciu - do uproszczenia w newsach).

## Mechanika Cash-Based Allocation
- Gracz widzi listę suwaków.
- Każdy suwak pokazuje aktualną wartość pozycji w PLN.
- Przesunięcie suwaka w prawo "kupuje" aktywo za gotówkę z `KONTO_OSZ`.
- Przesunięcie w lewo "sprzedaje" i oddaje PLN na `KONTO_OSZ`.
- **Wypłata:** Na początku każdego roku (po symulacji poprzedniego) gracz dostaje np. 20 000 PLN świeżej gotówki z pracy.
