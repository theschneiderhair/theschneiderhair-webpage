/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

import { useContentSourceRefreshKey } from '../hooks/useContentSourceRefreshKey';
import { getSettingsWithFallback } from '../lib/publicData';

import VideoCarouselLightboxSection from '../components/VideoCarouselLightboxSection';

import { AboutArtist } from './AboutArtist';
import { FinalCTA } from './FinalCTA';
import { Hero } from './Hero';
import { HomeVideoCarousel } from './HomeVideoCarousel';
import { LocationSection } from './LocationSection';
import { Portfolio } from './Portfolio';
import { Reviews } from './Reviews';
import { Services } from './Services';

export function Home() {
  const [showReviewsSection, setShowReviewsSection] = useState(true);
  const [showPricingSection, setShowPricingSection] = useState(true);
  const [showVideoSection, setShowVideoSection] = useState(true);
  const [showInstagramTagbox, setShowInstagramTagbox] = useState(true);
  const [showGallerySection, setShowGallerySection] = useState(true);
  const contentSourceRefreshKey = useContentSourceRefreshKey();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const settings = await getSettingsWithFallback();
      if (cancelled) return;
      setShowReviewsSection(settings.showReviewsSection !== false);
      setShowPricingSection(settings.showPricingSection !== false);
      setShowVideoSection(settings.showVideoSection !== false);
      setShowInstagramTagbox(settings.showInstagramTagbox !== false);
      setShowGallerySection(settings.showGallerySection !== false);
    })();
    return () => {
      cancelled = true;
    };
  }, [contentSourceRefreshKey]);

  return (
    <main>
      <Hero />
      <AboutArtist />
      {showGallerySection && <Portfolio />}
      {showReviewsSection && <Reviews />}
      {showPricingSection && <Services />}
      {showVideoSection && <VideoCarouselLightboxSection />}
      {showInstagramTagbox && <HomeVideoCarousel />}
      <LocationSection />
      <FinalCTA />
    </main>
  );
}
