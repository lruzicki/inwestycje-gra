# Phase 1: Project Initialization & Core Dashboard Layout (Ekspert Giełdowy)

## Objective
Set up the fundamental project structure using Vite, React, TypeScript, and Tailwind CSS, and build the initial visual layout and core game loop of the "Czas to Pieniądz" investment dashboard with a vast array of realistic global and Polish financial assets.

## Requirements
- **Tech Stack:** Vite, React, TypeScript, Tailwind CSS, Lucide React (icons), Recharts (data viz).
- **Layout:** **Desktop-only**. Responsive CSS Grid layout with fixed TopBar and Sidebar.
- **Visual Identity:** High-fidelity match of `image.png` (clean UI, rounded corners, subtle shadows).
- **Expanded Asset Universe:**
  - **Polish Liquidity:** Konto Oszczędnościowe, Obligacje (3-mies OTS, 2-letnie DOS, 10-letnie TOZ).
  - **WGPW Stocks:** CD Projekt, KGHM, Allegro, Kruk, Asseco, Orlen.
  - **Global Tech:** MSFT, GOOG, AMZN, TSMC (Taiwan Semiconductor).
  - **Global Indices:** ETF S&P 500, ETF Emerging Markets (inverse dollar correlation).
  - **Commodities:** Złoto, Srebro, Kakao, Ropa.
  - **Toxic Instruments:** CFD Bitcoin, CFD Lewarowany (specjalna logika: 80% szans na stratę).
- **Game Mechanics:**
  - **Turn Cycle:** 60-second timer per "Year". Auto-advance at 0s.
  - **Cash-based Allocation:** Initial capital in `KONTO_OSZ`. Moving sliders drains/refills the cash bucket.
  - **Monthly Fidelity:** 12 months simulated per year, charts drawn with continuous lines connecting monthly points.
- **Financial Simulation (GBM Model):**
  - Implement GBM (Geometric Brownian Motion) in `src/logic/simulation.ts`.
  - Realistic risk modeling (High volatility for CDR, ALE, Kakao).
  - Monthly income injection (e.g., 20,000 PLN per year) added to `KONTO_OSZ`.

## Key Files & Context
- `src/logic/simulation.ts`: Financial engine with full asset definitions from `.planning/research/financial-logic.md`.
- `src/logic/math.ts`: Normal distribution utilities.
- `src/hooks/useGameStore.ts`: Global state (cash, assets, history, timer).
- `src/components/layout/TopBar.tsx`: Timer, Year counter, Net Worth.
- `src/components/layout/Sidebar.tsx`: Multi-category asset sliders (Liquidity, Stocks, World, Commodities, Risk).
- `src/components/dashboard/Charts.tsx`: 3 main Recharts views (Portfolio, Assets, Structure).

## Implementation Steps

1.  **Project Setup**
    - `npm create vite@latest . -- --template react-ts`
    - `npm install -D tailwindcss postcss autoprefixer`
    - `npm install lucide-react recharts clsx tailwind-merge`

2.  **Financial Engine Implementation**
    - Code the simulation logic including the "80% loss" bias for CFD.
    - Set up the constants for all 20+ assets.

3.  **State & Loop Setup**
    - Implement the 60s timer and annual transition logic.

4.  **UI Implementation**
    - Build the desktop dashboard.
    - Categorize sliders in the Sidebar for better UX (as there are now many assets).

5.  **Data Viz**
    - Connect simulation output to Recharts.
