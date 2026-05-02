/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { assetUrl } from '../shared/utils/assetUrl';
import type {
  ArtistProfile,
  FaqCategory,
  GalleryHomeData,
  GalleryTileItem,
  ImpressumJsonSettings,
  ProductStorefrontCategory,
  Review,
  ServicesData,
  SettingsData,
  SiteLocationSettings,
  WidgetsData,
} from '../types/domain';

type VideoLinkItem = { id?: string; url: string; label?: string };

async function fetchDataJson<T>(filename: string): Promise<T> {
  const res = await fetch(assetUrl(`data/${filename}`));
  if (!res.ok) throw new Error(`Failed to load data/${filename} (${res.status})`);
  return res.json() as Promise<T>;
}

let settingsCache: SettingsData | null = null;

export async function getSettingsWithFallback(): Promise<SettingsData> {
  if (!settingsCache) {
    settingsCache = await fetchDataJson<SettingsData>('settings.json');
  }
  return settingsCache;
}

export async function getReviewsWithFallback(): Promise<Review[]> {
  const raw = await fetchDataJson<string[] | Review[]>('reviews.json');
  if (!Array.isArray(raw)) return [];
  if (raw.length === 0) return [];
  if (typeof raw[0] === 'string') {
    return (raw as string[]).map((text, i) => ({
      id: `local-review-${i}`,
      text,
      isLocal: true,
    }));
  }
  return (raw as Review[]).map((r, i) => ({
    ...r,
    id: r.id || `local-review-${i}`,
  }));
}

export async function getWidgetsWithFallback(): Promise<WidgetsData> {
  return fetchDataJson<WidgetsData>('widgets.json');
}

export function normalizeMediaStorageRoot(root: string | null | undefined): string {
  return String(root ?? '')
    .trim()
    .replace(/^\/+|\/+$/g, '');
}

function normalizeGalleryHomeData(raw: unknown): GalleryHomeData {
  if (!raw || typeof raw !== 'object') return { images: [] };
  const imagesUnknown = (raw as { images?: unknown }).images;
  if (!Array.isArray(imagesUnknown)) return { images: [] };
  const images: GalleryTileItem[] = imagesUnknown.map((img, i) => {
    const o = img as Record<string, unknown>;
    return {
      src: String(o.src ?? ''),
      label: String(o.label ?? ''),
      order: typeof o.order === 'number' ? o.order : i,
      enabled: o.enabled !== false,
    };
  });
  return { images };
}

export async function getGalleryHomeWithFallback(): Promise<GalleryHomeData> {
  const raw = await fetchDataJson<unknown>('gallery.json');
  return normalizeGalleryHomeData(raw);
}

export async function getFaqWithFallback(): Promise<FaqCategory[]> {
  const raw = await fetchDataJson<FaqCategory[]>('faq.json');
  return Array.isArray(raw) ? raw : [];
}

export async function getServicesWithSourceWithFallback(): Promise<{
  services: ServicesData;
  sourceUsed: 'local';
}> {
  const raw = await fetchDataJson<{ en: unknown }>('services.json');
  const enRaw = raw.en;
  let categories: ServicesData['en']['categories'];
  if (Array.isArray(enRaw)) {
    categories = enRaw as ServicesData['en']['categories'];
  } else if (enRaw && typeof enRaw === 'object' && 'categories' in enRaw) {
    categories = (enRaw as { categories: ServicesData['en']['categories'] }).categories;
  } else {
    categories = [];
  }
  return {
    services: { en: { categories, lang: 'en' } },
    sourceUsed: 'local',
  };
}

export async function getArtistProfilesWithFallback(): Promise<ArtistProfile[]> {
  const raw = await fetchDataJson<Array<Partial<ArtistProfile> & Record<string, unknown>>>('artistprofiles.json');
  if (!Array.isArray(raw)) return [];
  return raw.map((row, i) => {
    const derived = `${String(row.firstName ?? '')}-${String(row.lastName ?? '')}-${i}`.replace(/\s+/g, '-');
    return {
      id: String((row.id ?? (row as { slug?: string }).slug ?? derived) || `artist-${i}`),
      firstName: String(row.firstName ?? ''),
      lastName: String(row.lastName ?? ''),
      instagramHandle: String(row.instagramHandle ?? ''),
      email: String(row.email ?? ''),
      bookingWebsiteLink: String(row.bookingWebsiteLink ?? ''),
      personalWebsiteLink: String(row.personalWebsiteLink ?? ''),
      phoneNumber: String(row.phoneNumber ?? ''),
      profilePhotoLink: String(row.profilePhotoLink ?? ''),
      specialty: String(row.specialty ?? ''),
      bio: String(row.bio ?? ''),
      enabled: row.enabled !== false,
      order: typeof row.order === 'number' ? row.order : undefined,
      isLocal: true,
    };
  });
}

export async function getProductStorefrontCategoriesWithFallback(): Promise<ProductStorefrontCategory[]> {
  const raw = await fetchDataJson<Array<Partial<ProductStorefrontCategory> & Record<string, unknown>>>(
    'recommendedproducts.json',
  );
  if (!Array.isArray(raw)) return [];
  return raw.map((row, i) => ({
    id: String(row.id ?? row.slug ?? `cat-${i}`),
    slug: String(row.slug ?? `item-${i}`),
    title: String(row.title ?? ''),
    count: typeof row.count === 'number' ? row.count : Number(row.count) || 0,
    image: String(row.image ?? ''),
    link: String(row.link ?? ''),
    enabled: row.enabled !== false,
    order: typeof row.order === 'number' ? row.order : undefined,
    isLocal: true,
  }));
}

export async function getVideoLinksWithFallback(): Promise<VideoLinkItem[]> {
  const raw = await fetchDataJson<{ items?: VideoLinkItem[] }>('videolinks.json');
  const items = raw?.items;
  return Array.isArray(items) ? items : [];
}

export function videoLinksToYoutubeIds(items: VideoLinkItem[]): string[] {
  return items.map((it) => extractYoutubeId(it.url)).filter((id): id is string => Boolean(id));
}

function extractYoutubeId(url: string): string | null {
  const raw = String(url ?? '').trim();
  if (!raw) return null;
  try {
    const u = new URL(raw, 'https://www.youtube.com');
    if (u.hostname.replace(/^www\./, '') === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    const v = u.searchParams.get('v');
    if (v) return v;
    const embed = u.pathname.match(/\/embed\/([^/?]+)/);
    return embed ? embed[1] : null;
  } catch {
    return null;
  }
}

export type PageTextSiteEditorSettings = {
  impressumOwnerName: string;
  impressumAddressLines: string;
  impressumTradingName: string;
  impressumContactEmail: string;
  impressumContactPhone: string;
};

export const DEFAULT_SITE_LOCATION: SiteLocationSettings = {
  headingLine1: 'THE',
  headingLine2: 'Studio',
  address:
    'Creative Co Working Space · Salon 31 Friseur\nGärtnerstraße 31\n10245 Berlin\nGermany',
  operatingHours: 'Tuesday – Saturday\n10:00 – 19:00',
  mapsQuery: 'Salon 31 Friseur, Gärtnerstraße 31, 10245 Berlin, Germany',
};

const DEFAULT_PAGE_TEXT: PageTextSiteEditorSettings = {
  impressumOwnerName: 'Dennis Schneider',
  impressumAddressLines:
    'Creative Co Working Space · Salon 31 Friseur\nGärtnerstraße 31\n10245 Berlin\nGermany',
  impressumTradingName: 'theschneider.hair',
  impressumContactEmail: 'theschneiderhair@gmail.com',
  impressumContactPhone: '',
};

export function mapImpressumToPageText(impressum: ImpressumJsonSettings | undefined): PageTextSiteEditorSettings {
  if (!impressum) return { ...DEFAULT_PAGE_TEXT };
  return {
    impressumOwnerName: impressum.ownerName ?? DEFAULT_PAGE_TEXT.impressumOwnerName,
    impressumAddressLines: impressum.addressLines ?? DEFAULT_PAGE_TEXT.impressumAddressLines,
    impressumTradingName: impressum.tradingName ?? DEFAULT_PAGE_TEXT.impressumTradingName,
    impressumContactEmail: impressum.contactEmail ?? DEFAULT_PAGE_TEXT.impressumContactEmail,
    impressumContactPhone: impressum.contactPhone ?? DEFAULT_PAGE_TEXT.impressumContactPhone,
  };
}
