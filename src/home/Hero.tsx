/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSiteCopy } from '../context/SiteCopyContext';
import { shouldUseHashRouting } from '../lib/shouldUseHashRouting';
import { triggerBooking } from '../lib/salonizedBookingWidget';
import { assetUrl } from '../shared/utils/assetUrl';

export function Hero() {
  const { siteCopy } = useSiteCopy();
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [useBottomRevealVideo, setUseBottomRevealVideo] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [navBannerVisible, setNavBannerVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // Keep nav visible during looping hero.
    window.dispatchEvent(new CustomEvent('hero-scrub-progress', { detail: 1 }));
  }, []);

  useEffect(() => {
    const onReplay = () => {
      const video = heroVideoRef.current;
      if (!video) return;
      video.currentTime = 0;
      void video.play().catch(() => {});
    };
    window.addEventListener('hero-replay', onReplay);
    return () => {
      window.removeEventListener('hero-replay', onReplay);
    };
  }, []);

  useEffect(() => {
    const onBottomReveal = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      const shouldUseBottomVideo = Boolean(customEvent.detail);
      setUseBottomRevealVideo(shouldUseBottomVideo);
      const video = heroVideoRef.current;
      if (video && shouldUseBottomVideo) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
    };
    window.addEventListener('hero-bottom-reveal', onBottomReveal as EventListener);
    return () => {
      window.removeEventListener('hero-bottom-reveal', onBottomReveal as EventListener);
    };
  }, []);

  useEffect(() => {
    const onBanner = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setNavBannerVisible(Boolean(customEvent.detail));
    };
    window.addEventListener('site-nav-banner-visible', onBanner as EventListener);
    return () => {
      window.removeEventListener('site-nav-banner-visible', onBanner as EventListener);
    };
  }, []);

  return (
  <section className="hero-tablet-section relative h-screen min-h-screen flex items-center overflow-hidden px-4 sm:px-8 pt-24 pb-8 md:pt-32 md:pb-16 bg-stone-950">
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 h-full w-full origin-[72%_52%] sm:origin-[70%_50%] md:origin-[68%_50%] lg:origin-[65%_50%] will-change-transform"
        initial={{ scale: 1, x: '0%', y: '0%' }}
        animate={
          reduceMotion
            ? { scale: 1, x: '0%', y: '0%' }
            : { scale: 1.05, x: '-1%', y: '0.45%' }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 48,
                ease: 'easeInOut',
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
              }
        }
      >
        <video
          ref={heroVideoRef}
          src={assetUrl(useBottomRevealVideo ? '/media/herovideo2.mp4' : '/media/herovideo.mp4')}
          className="h-full w-full scale-[1.02] object-cover object-[72%_center] sm:object-[70%_center] md:object-[68%_center] lg:object-[65%_center]"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-stone-950/20" />
    </div>

    <div className="hero-tablet-grid grid grid-cols-12 w-full max-w-[1720px] mx-auto items-start gap-8 md:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hero-tablet-copy col-span-12 z-10 space-y-8 md:space-y-12 mt-8 md:mt-0"
      >
        {siteCopy.home.hero.badge ? (
          <div className="inline-block px-4 py-1.5 bg-stone-100 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">{siteCopy.home.hero.badge}</span>
          </div>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              navBannerVisible
                ? {
                    opacity: 0,
                    scale: 1,
                    y: 0,
                    textShadow:
                      '0 0 0 rgba(231,229,223,0), 0 1px 2px rgba(28,25,23,0)',
                  }
                : {
                    opacity: [0.92, 1, 0.92],
                    scale: [1, 1.01, 1],
                    y: 0,
                    textShadow: [
                      '0 0 0 rgba(231,229,223,0), 0 1px 2px rgba(28,25,23,0.45)',
                      '0 0 22px rgba(231,229,223,0.25), 0 1px 3px rgba(28,25,23,0.5)',
                      '0 0 0 rgba(231,229,223,0), 0 1px 2px rgba(28,25,23,0.45)',
                    ],
                  }
            }
            transition={
              navBannerVisible
                ? reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                : {
                    opacity: { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    scale: { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    textShadow: { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                    y: { duration: 0.7, ease: 'easeOut', delay: 0.12 },
                  }
            }
            className="mb-[96px] text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-[#e8e4dc] font-light lowercase pointer-events-none"
            aria-hidden={navBannerVisible}
          >
            theschneider.hair
          </motion.p>
          <h1 className="relative z-10 text-[13vw] sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] text-stone-50 max-w-full pr-[34vw] sm:pr-[30vw] md:pr-[min(38vw,20rem)] lg:pr-[min(42vw,28rem)] xl:pr-120">
            {siteCopy.home.hero.titleLine1}
            <br />
            {siteCopy.home.hero.titleLine2}
            <br />
            <span className="italic font-normal text-stone-200 whitespace-nowrap">{siteCopy.home.hero.titleAccent}</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.55 }}
          className="text-stone-100 max-w-md leading-relaxed tracking-wide text-sm md:text-base opacity-90 font-light text-justify"
        >
          {siteCopy.home.hero.body}
        </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
            className="hero-tablet-cta-row flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center pt-4 w-full"
          >
            <button 
              onClick={triggerBooking}
              className="cta-pulse px-8 md:px-12 py-4 md:py-5 w-full sm:w-auto bg-stone-50 text-stone-800 text-[10px] font-bold tracking-[0.3em] uppercase rounded-md hover:bg-gold hover:scale-[1.02] active:scale-95 transition-all duration-500 booking-trigger text-center relative overflow-hidden group shadow-lg shadow-stone-900/10"
            >
              <span className="relative z-10">{siteCopy.home.hero.ctaBook}</span>
              <div className="absolute inset-0 bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <Link 
              to="/#services" 
              onClick={(e) => {
                const element = document.getElementById('services');
                if (element) {
                  e.preventDefault();
                  element.scrollIntoView(); // Rely on CSS smooth scroll
                  const useHashNavigation = shouldUseHashRouting();
                  if (useHashNavigation) {
                    window.location.hash = '/#services';
                  } else {
                    window.history.pushState(null, '', '/#services');
                  }
                }
              }}
              className="hero-tablet-explore-link text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-stone-100 hover:text-stone-50 transition-colors uppercase border-b border-stone-200/60 hover:border-stone-50 pb-1 whitespace-nowrap text-center"
            >
              {siteCopy.home.hero.exploreServices}
            </Link>
          </motion.div>
      </motion.div>
    </div>
  </section>
  );
}
