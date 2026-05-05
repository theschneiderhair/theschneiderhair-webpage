/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom';

import AppRoutes from './app/AppRoutes';
import {
  CookieConsent,
  Footer,
  Home,
  Nav,
  ScrollToAnchor,
  WidgetManager,
} from './home';
import { shouldUseHashRouting } from './lib/shouldUseHashRouting';
import { useSalonizedEvents } from './lib/salonizedBookingWidget';

export default function App() {
  useSalonizedEvents();
  const Router = shouldUseHashRouting() ? HashRouter : BrowserRouter;

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <>
      <ScrollToAnchor />
      <WidgetManager />
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative">
        <Nav />
        <div className="flex-grow">
          <AppRoutes
            Home={Home}
            ArtistsPage={ArtistsPage}
            EducationFAQPage={EducationFAQPage}
            RecommendedProductsPage={RecommendedProductsPage}
          />
        </div>
        {!isHomeRoute && <Footer />}
        <CookieConsent />
      </div>
    </>
  );
}

const EducationFAQPage = React.lazy(() => import('./pages/EducationFAQ'));
const ArtistsPage = React.lazy(() => import('./pages/Artists'));
const RecommendedProductsPage = React.lazy(() => import('./pages/RecommendedProducts'));
