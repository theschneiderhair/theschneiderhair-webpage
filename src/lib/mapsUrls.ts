/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SiteLocationSettings } from '../types/domain';

export function resolveMapsIframeSrc(loc: SiteLocationSettings): string {
  const embed = loc.googleMapsEmbedUrl?.trim();
  if (embed) return embed;
  const q = encodeURIComponent(loc.mapsQuery?.trim() || loc.address?.trim() || 'Berlin');
  return `https://maps.google.com/maps?q=${q}&output=embed`;
}

export function resolveGoogleMapsOpenUrl(loc: SiteLocationSettings): string {
  const q = encodeURIComponent(loc.mapsQuery?.trim() || loc.address?.trim() || 'Berlin');
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
