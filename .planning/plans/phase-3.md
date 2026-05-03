# Phase 3: Real-Time Simulation, Config & UI Refinement

## Objective
Transform the game loop to a dynamic, real-time simulation (month-by-month ticks). Add configuration options for the player's starting conditions, implement monthly savings injections, and upgrade the dashboard visuals with enhanced news banners and stacked charts.

## Requirements

1. **Game Setup & Configuration:**
   - Implement a simple "Start Game" overlay/modal where the user can input:
     - **Kapitał Początkowy** (Starting Cash): Default `10 000 PLN`.
     - **Miesięczne Oszczędności** (Monthly Savings): Default `2 000 PLN`.

2. **Real-Time Simulation Tick (The 5s Rule) & Monthly Savings:**
   - Rework the game loop in `useGameStore.ts`.
   - A "tick" occurs every 5 seconds. Each tick simulates exactly **1 month** of market movement for all assets using the existing GBM logic.
   - **Monthly Injection:** At every 5s tick, the configured "Miesięczne Oszczędności" are added directly to the `KONTO_OSZ` (Gotówka) bucket.
   - The year still takes 60 seconds (12 months * 5s).
   - At the end of month 12, load the next scenario/event for the upcoming year.

3. **News Banner Enhancements:**
   - Increase the height and prominence of the `NewsBanner`.
   - Add a visual element (placeholder image) to the banner to make it look like a real news portal.

4. **Chart Refinements:**
   - The "Wkład vs Zwrot" chart will automatically update point-by-point (monthly) thanks to the 5s tick.
   - **Wartość Aktywów Chart:** Change from a Line chart to a **Stacked Bar Chart** (Wykres Słupkowy Skumulowany). This will show total value broken down by category (e.g., Tech, Surowce, Płynność), making portfolio composition instantly readable over time.

## Key Files & Context
- `src/components/layout/SetupModal.tsx` (NEW): UI for initial configuration.
- `src/hooks/useGameStore.ts`: Add `monthlySavings`, `currentMonth`, `isGameStarted` state. Refactor the `advanceYear` logic into `simulateMonth` logic running every 5s.
- `src/logic/simulation.ts`: Ensure `calculateMonthlyReturn` calculates for a single month step.
- `src/components/dashboard/NewsBanner.tsx`: Update UI layout to include an image and larger text.
- `src/components/dashboard/Charts.tsx`: Implement the Stacked Bar Chart for asset values.

## Implementation Steps

1. **State & Store Updates**
   - Add configuration fields to `useGameStore`.
   - Implement the `simulateMonth` function that steps the simulation, adds the monthly savings to `KONTO_OSZ`, and updates history.

2. **Game Loop Refactoring**
   - Update `App.tsx` (or an internal hook) to trigger `simulateMonth` every 5 seconds, while updating the visual 60s countdown timer every 1 second.

3. **Setup UI**
   - Build the `SetupModal` that blocks the main UI until the user clicks "Rozpocznij Grę" (Start Game).

4. **UI Updates (Banner & Charts)**
   - Redesign `NewsBanner.tsx`.
   - Update Recharts implementation in `Charts.tsx` to use `<BarChart>` with `stackId`.

## Verification
- Verify the Setup Modal correctly sets initial cash and monthly savings.
- Verify that every 5 seconds, the charts update, and the monthly savings amount is added to Gotówka.
- Confirm the Stacked Bar chart renders correctly with monthly data.