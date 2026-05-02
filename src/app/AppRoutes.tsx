import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RouteLoadingFallback from '../shared/ui/RouteLoadingFallback';

type PageComponent = React.ComponentType;

interface AppRoutesProps {
  Home: PageComponent;
  ArtistsPage: PageComponent;
  EducationFAQPage: PageComponent;
  RecommendedProductsPage: PageComponent;
}

export default function AppRoutes({
  Home,
  ArtistsPage,
  EducationFAQPage,
  RecommendedProductsPage,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/docs/index.html" element={<Home />} />
      <Route
        path="/artists"
        element={
          <React.Suspense fallback={<RouteLoadingFallback />}>
            <ArtistsPage />
          </React.Suspense>
        }
      />
      <Route
        path="/education"
        element={
          <React.Suspense fallback={<RouteLoadingFallback />}>
            <EducationFAQPage />
          </React.Suspense>
        }
      />
      <Route
        path="/products"
        element={
          <React.Suspense fallback={<RouteLoadingFallback />}>
            <RecommendedProductsPage />
          </React.Suspense>
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
