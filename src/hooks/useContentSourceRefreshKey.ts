/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** Static build: content is always loaded from `public/data/*.json` (no live source toggle). */
export function useContentSourceRefreshKey(): number {
  return 0;
}
