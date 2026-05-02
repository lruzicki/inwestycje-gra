# Phase 2: Scripted Scenarios & Market Events

## Objective
Implement a scripted event system that drives the 20-year narrative of the game. Events will dynamically alter the underlying mathematical models (returns and volatility) of specific assets, teaching players how real-world macroeconomics and company-specific news impact investments.

## Requirements
- **Event Engine:** A system to apply modifiers to the Geometric Brownian Motion (GBM) parameters ($\mu$ and $\sigma$) of assets based on the current year.
- **Scripted Timeline (20 Years):** Define a hardcoded sequence of events designed to test the player's portfolio allocation. Examples:
  - *Year 3 (Tech Crash):* Tech stocks (CDR, ALE, GOOG, MSFT, AMZN, TSMC) suffer massive negative returns (-30%) and high volatility.
  - *Year 7 (Inflation Spike):* Cash and standard bonds lose real value; Gold and Commodities boom.
  - *Year 12 (Commodity Supercycle):* KGHM, Ropa, Srebro experience massive growth.
  - *Year 15 (Black Swan/Pandemic):* Massive global drop (SP500, WIG20 crash), but Tech and Gold surge.
- **UI Feedback:** 
  - Enhance the `NewsBanner` to clearly display the active event and hint at which sectors are affected.
  - Show visual indicators (e.g., warning icons) on the `AssetSlider` for assets currently under extreme volatility or negative news.

## Key Files & Context
- `src/logic/events.ts` (NEW): Will contain the 20-year scripted timeline and event definitions.
- `src/logic/simulation.ts`: Needs to accept event modifiers when calculating the monthly returns for the current year.
- `src/hooks/useGameStore.ts`: Needs to load the event for the current year, apply it to the simulation, and update the `news` state.
- `src/components/dashboard/NewsBanner.tsx`: Update to display rich event descriptions.

## Implementation Steps

1.  **Define Event Types & Data**
    - Create `src/logic/events.ts`.
    - Define `GameEvent` interface: `year`, `headline`, `description`, `assetModifiers` (changes to $\mu$ and $\sigma$).
    - Write the 20-year script (1 event per year or every few years).

2.  **Update Simulation Logic**
    - Modify `simulateYear` to accept an array of active `assetModifiers`.
    - When calculating the monthly return, add the modifier's $\mu$ and $\sigma$ to the asset's base values.

3.  **Integrate Events into Game Loop**
    - In `useGameStore.ts`, during `advanceYear`, fetch the event for the *new* year.
    - Pass the event modifiers into `simulateYear`.
    - Set the `news` state to the event's headline and description.

4.  **UI Enhancements**
    - Improve `NewsBanner` to show the full event description.
    - (Optional) Add a visual "Market Status" indicator to the sliders to show players *why* something is dropping.

## Verification & Testing
- Fast-forward through the 20 years and verify that the charts reflect the scripted crises (e.g., a massive dip in Year 3 for tech).
- Ensure that the `NewsBanner` updates correctly at the start of each year.