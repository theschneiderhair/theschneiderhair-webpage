/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Coming-soon fullscreen gate (under construction → full site after triple-click on hero).
 *
 * Default: **ON** in dev and in every production build, so the splash always shows first until you
 * ship the full site.
 *
 * When you launch publicly, set in `.env.production` (and rebuild):
 *   `VITE_COMING_SOON_GATE=false`
 *
 * Optional:
 * - `VITE_COMING_SOON_BYPASS=false` — disable triple-click bypass (only if gate is off, or you add another entry)
 */
export const COMING_SOON_GATE_ENABLED = import.meta.env.VITE_COMING_SOON_GATE !== 'false';

export const COMING_SOON_TRIPLE_CLICK_BYPASS_ENABLED =
  import.meta.env.VITE_COMING_SOON_BYPASS !== 'false';
