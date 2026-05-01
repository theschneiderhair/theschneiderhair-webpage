/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCallback, useEffect, useRef} from 'react';

import {assetUrl} from '../../shared/utils/assetUrl';

import './ComingSoonOverlay.css';

const TITLE = 'theschneider.hair — Coming Soon';

const SCISSORS_FAVICON_HREF =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="30" cy="30" r="12" fill="black"/>
      <circle cx="30" cy="70" r="12" fill="black"/>
      <line x1="42" y1="32" x2="85" y2="10" stroke="black" stroke-width="6"/>
      <line x1="42" y1="68" x2="85" y2="90" stroke="black" stroke-width="6"/>
    </svg>`.replace(/\s+/g, ' '),
  );

export type ComingSoonOverlayProps = {
  tripleClickBypassEnabled: boolean;
  onBypass: () => void;
};

export function ComingSoonOverlay({
  tripleClickBypassEnabled,
  onBypass,
}: ComingSoonOverlayProps) {
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.classList.add('coming-soon-active');
    const prevTitle = document.title;
    document.title = TITLE;

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = SCISSORS_FAVICON_HREF;
    link.setAttribute('data-coming-soon-favicon', '');
    document.head.appendChild(link);

    return () => {
      document.body.classList.remove('coming-soon-active');
      document.title = prevTitle;
      link.remove();
    };
  }, []);

  const handleHeroImageClick = useCallback(() => {
    if (!tripleClickBypassEnabled) return;

    clickCountRef.current += 1;
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      onBypass();
      return;
    }

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      resetTimerRef.current = null;
    }, 650);
  }, [onBypass, tripleClickBypassEnabled]);

  const heroSrc = assetUrl('media/artist/artist-hero.png');

  return (
    <div className="coming-soon" role="document" aria-label="Coming soon">
      <header>
        <div className="brand">theschneider.hair</div>

        <nav className="nav" aria-hidden="true">
          <span>Berlin</span>
          <span>Blonding</span>
          <span>Extensions</span>
          <span>Soon</span>
        </nav>
      </header>

      <main>
        <section>
          <div className="eyebrow">Berlin Friedrichshain</div>

          <h1>
            Master
            <br />
            Blonding &
            <span>Extensions</span>
          </h1>

          <p className="copy">
            A new digital home for theschneider.hair is coming soon. High-end blonding, premium
            extensions, education, products, and booking access will be available here shortly.
          </p>

          <div className="actions">
            <a className="button" href="mailto:info@theschneiderhair.com">
              Contact
            </a>
            <span className="note">Coming Soon</span>
          </div>
        </section>

        <section className="visual" aria-hidden="true">
          <img
            src={heroSrc}
            alt=""
            className={`hero-image${tripleClickBypassEnabled ? ' hero-image--bypass' : ''}`}
            draggable={false}
            onClick={handleHeroImageClick}
          />

          <div className="floating-card">
            <strong>soon</strong>
            <p>
              Minimal, refined, and built for the next chapter of theschneider.hair.
            </p>
          </div>
        </section>
      </main>

      <footer>theschneider.hair</footer>
    </div>
  );
}
