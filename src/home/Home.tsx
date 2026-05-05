/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

import { useContentSourceRefreshKey } from '../hooks/useContentSourceRefreshKey';
import { getSettingsWithFallback } from '../lib/publicData';

import VideoCarouselLightboxSection from '../components/VideoCarouselLightboxSection';

import { AboutArtist } from './AboutArtist';
import { Footer } from './Footer';
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
  const bottomRevealRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const target = bottomRevealRef.current;
    if (!target) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        window.dispatchEvent(new CustomEvent('hero-bottom-reveal', { detail: isVisible }));

        if (isVisible && !wasVisible) {
          window.dispatchEvent(new CustomEvent('hero-replay'));
        }
        wasVisible = isVisible;
      },
      { threshold: [0, 0.2, 0.5, 1] },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      window.dispatchEvent(new CustomEvent('hero-bottom-reveal', { detail: false }));
    };
  }, []);

  return (
    <main className="relative">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Hero />
      </div>
      <div className="relative z-20 mt-[100vh]">
        <div className="bg-stone-50 dark:bg-stone-950">
          <AboutArtist />
          {showGallerySection && <Portfolio />}
          {showReviewsSection && <Reviews />}
          {showPricingSection && <Services />}
          {showVideoSection && <VideoCarouselLightboxSection />}
          {showInstagramTagbox && <HomeVideoCarousel />}
          <LocationSection />
          <FinalCTA />
          <Footer />
        </div>
        <div ref={bottomRevealRef} className="h-[90vh]" aria-hidden="true" />
      </div>
    </main>
  );
}
