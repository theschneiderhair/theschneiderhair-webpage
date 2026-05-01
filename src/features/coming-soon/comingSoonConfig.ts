/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Coming-soon fullscreen gate (release / live builds by default).
 *
 * Override with `.env` / `.env.release`:
 * - `VITE_COMING_SOON_GATE=true` — force gate on
 * - `VITE_COMING_SOON_GATE=false` — force gate off
 * - `VITE_COMING_SOON_BYPASS=false` — hide triple-click bypass (turn gate off if you need no bypass)
 */
const envGate = import.meta.env.VITE_COMING_SOON_GATE;
const defaultOn = import.meta.env.MODE === 'release';

export const COMING_SOON_GATE_ENABLED =
  envGate === 'true' ? true : envGate === 'false' ? false : defaultOn;

export const COMING_SOON_TRIPLE_CLICK_BYPASS_ENABLED =
  import.meta.env.VITE_COMING_SOON_BYPASS !== 'false';
