/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSiteCopy } from '../context/SiteCopyContext';
import { useContentSourceRefreshKey } from '../hooks/useContentSourceRefreshKey';
import { formatCopy } from '../content/siteCopy';
import { assetUrl } from '../shared/utils/assetUrl';
import {
  DEFAULT_SITE_LOCATION,
  getSettingsWithFallback,
  mapImpressumToPageText,
  type PageTextSiteEditorSettings,
} from '../lib/publicData';
import type { SiteLocationSettings } from '../types/domain';

export function Footer() {
  const { siteCopy } = useSiteCopy();
  const [showProductsPage, setShowProductsPage] = useState(true);
  const [showBookSection, setShowBookSection] = useState(true);
  const [showClassesSection, setShowClassesSection] = useState(true);
  const loc = useMemo<SiteLocationSettings>(
    () => ({ ...DEFAULT_SITE_LOCATION, ...siteCopy.siteLocation }),
    [siteCopy],
  );
  const pageText = useMemo<PageTextSiteEditorSettings>(
    () => mapImpressumToPageText(siteCopy.impressum),
    [siteCopy],
  );
  const contentSourceRefreshKey = useContentSourceRefreshKey();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const settings = await getSettingsWithFallback();
      if (cancelled) return;
      setShowProductsPage(settings.showProductsPage !== false);
      setShowBookSection(settings.showBookSection !== false);
      setShowClassesSection(settings.showClassesSection !== false);
    })();
    return () => {
      cancelled = true;
    };
  }, [contentSourceRefreshKey]);

  return (
    <footer className="w-full py-24 px-8 bg-stone-50 border-t border-stone-200/50">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        <div className="col-span-12 md:col-span-6 space-y-12">
          <span className="text-2xl md:text-3xl font-serif tracking-[0.1em] text-stone-800 lowercase font-medium">
            {siteCopy.brand.siteName}
          </span>

          <div className="space-y-8 font-sans text-sm font-light text-stone-600">
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span
                  className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase w-24"
                  data-i18n="footerInstagram"
                >
                  {siteCopy.home.footer.instagramLabel}
                </span>
                <a
                  href="https://instagram.com/theschneider.hair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  {siteCopy.brand.instagramHandle}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase w-24">
                  {siteCopy.home.footer.directLabel}
                </span>
                <span>
                  <a
                    href={`mailto:${pageText.impressumContactEmail}`}
                    className="hover:text-stone-900 transition-colors"
                  >
                    {pageText.impressumContactEmail}
                  </a>
                  {' · '}
                  {pageText.impressumContactPhone}
                </span>
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-200/50 w-full md:max-w-md">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-stone-400 mb-2 footer-info-label">
                  {siteCopy.home.footer.businessHoursLabel}
                </p>
                <p className="whitespace-pre-line">{loc.operatingHours}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-bold text-stone-400 mb-2 footer-info-label">
                  {siteCopy.home.footer.contactLabel}
                </p>
                <p className="whitespace-pre-line">{loc.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 flex flex-col md:items-end md:justify-center space-y-6 footer-links">
          {showProductsPage && (
            <Link
              to="/products"
              data-i18n="footerAmazon"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
            >
              {siteCopy.home.footer.linkRecommendedProducts}
            </Link>
          )}
          {showBookSection && (
            <Link
              to="/education#ebook"
              data-i18n="footerEbook"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
            >
              {siteCopy.home.footer.linkBleachEbook}
            </Link>
          )}
          <Link
            to="/education"
            data-i18n="footerEducationFAQ"
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
          >
            {siteCopy.home.footer.linkEducationFaq}
          </Link>
          {showClassesSection && (
            <Link
              to="/education#events"
              data-i18n="footerEventTickets"
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
            >
              {siteCopy.home.footer.linkEventTickets}
            </Link>
          )}
          <a
            href={assetUrl('legal.html')}
            data-i18n="footerImpressum"
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
          >
            {siteCopy.home.footer.linkLegal}
          </a>
          <a
            href={assetUrl('terms.html')}
            data-i18n="footerAGB"
            className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-500 hover:text-gold transition-colors"
          >
            {siteCopy.home.footer.linkTerms}
          </a>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto mt-24 pt-8 border-t border-stone-200 flex justify-between items-center text-[9px] tracking-[0.2em] uppercase text-stone-400 font-medium">
        <span className="select-none">
          {formatCopy(siteCopy.home.footer.copyrightTemplate, { year: new Date().getFullYear() })}
        </span>
      </div>
    </footer>
  );
}
