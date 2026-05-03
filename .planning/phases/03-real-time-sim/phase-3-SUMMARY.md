---
phase: 3
plan: phase-3
subsystem: Simulation & UI
tags: [simulation, state-management, charts, ui]
requirements: [SIM-01, UI-02, CONF-01]
tech-stack: [React, Zustand, Recharts, Tailwind]
key-files: [src/hooks/useGameStore.ts, src/components/layout/SetupModal.tsx, src/components/dashboard/Charts.tsx, src/components/dashboard/NewsBanner.tsx]
metrics:
  duration: 45m
  completed_date: 2024-05-22
---

# Phase 3 Plan: Real-Time Simulation, Config & UI Refinement Summary

## One-liner
Transformed the investment game into a real-time monthly simulation with user configuration and a polished, data-rich dashboard.

## Key Changes
- **Real-Time Simulation Loop:** Refactored the game engine to trigger a "tick" every second. Every 5 ticks (5 seconds), exactly 1 month of market movement is simulated for all assets using the Geometric Brownian Motion model.
- **Monthly Savings Injection:** Added logic to automatically inject the user-configured "Miesięczne Oszczędności" into the savings account (`KONTO_OSZ`) at each monthly tick.
- **Setup Modal:** Implemented a pre-game configuration overlay where players set their starting capital and monthly savings rate.
- **Stacked Bar Chart:** Upgraded the asset value visualization to a stacked bar chart showing portfolio composition by category (Likwidność, Akcje PL, Świat, Surowce, Ryzyko) over time.
- **Enhanced News Banner:** Redesigned the news component with a larger layout, newspaper-style imagery, and improved typography for better prominence.
- **Dynamic TopBar:** Updated the top navigation bar to display the current month and year, keeping the player oriented in the timeline.

## Deviations from Plan
None - the plan was executed as written. 

## Technical Decisions
- **Zustand Tick Handling:** Used a unified `tick` action in the store called every second by `App.tsx` to manage both the visual countdown and the monthly simulation trigger.
- **Recharts Grouping:** Implemented on-the-fly data transformation in `Charts.tsx` to group specific assets into their high-level categories for the stacked visualization.

## Verification Results
- **Setup Modal:** Verified that initial values are correctly passed to the game state.
- **Simulation Timing:** Confirmed 1-second visual updates and 5-second logic updates.
- **Monthly Injection:** Verified that `totalNetWorth` and `cash` increase by the savings amount every 5s.
- **Charts:** Confirmed that the stacked bar chart updates monthly and correctly represents category distribution.

## Self-Check: PASSED
- [x] SetupModal.tsx exists and is used in App.tsx
- [x] useGameStore.ts supports monthly simulation
- [x] Charts.tsx uses Stacked Bar Chart
- [x] NewsBanner.tsx is updated with images
