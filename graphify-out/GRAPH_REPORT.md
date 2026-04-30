# Graph Report - C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage  (2026-04-29)

## Corpus Check
- 51 files · ~237,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 157 nodes · 159 edges · 41 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]

## God Nodes (most connected - your core abstractions)
1. `triggerBooking()` - 10 edges
2. `readConsentRecord()` - 6 edges
3. `hasConsentFor()` - 5 edges
4. `isWidgetReallyOpen()` - 5 edges
5. `closeSalonizedWidget()` - 5 edges
6. `useContentSourceRefreshKey()` - 4 edges
7. `normalizeRecord()` - 4 edges
8. `clickSalonizedWidgetButton()` - 4 edges
9. `openSalonizedWidget()` - 4 edges
10. `assetUrl()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `syncConsent()` --calls--> `hasConsentFor()`  [INFERRED]
  C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\pages\EducationFAQ.tsx → C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\cookieConsent.ts
- `openPreferences()` --calls--> `readConsentRecord()`  [INFERRED]
  C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\home\CookieConsent.tsx → C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\cookieConsent.ts
- `syncConsent()` --calls--> `hasConsentFor()`  [INFERRED]
  C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\home\HomeVideoCarousel.tsx → C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\cookieConsent.ts
- `triggerBooking()` --calls--> `hasConsentFor()`  [INFERRED]
  C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\salonizedBookingWidget.ts → C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\cookieConsent.ts
- `triggerBooking()` --calls--> `openConsentPreferences()`  [INFERRED]
  C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\salonizedBookingWidget.ts → C:\Users\diggs\Desktop\webdev\theschneiderhair-webpage\src\lib\cookieConsent.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (13): buildAcceptAllRecord(), buildConsentRecord(), buildDeclineAllRecord(), hasAnySavedConsent(), hasConsentFor(), isObject(), migrateLegacyConsent(), normalizePreferences() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (15): openConsentPreferences(), applyBookingWidgetCompany(), clickSalonizedWidgetButton(), closeSalonizedWidget(), ensureSalonizedLoader(), findSalonizedWidgetButton(), getSalonizedContainer(), hasSalonizedApi() (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.27
Nodes (5): assetUrl(), normalizeBaseUrl(), trimSlashes(), resolveGalleryImageSrc(), resolveMediaSrc()

### Community 3 - "Community 3"
Cohesion: 0.39
Nodes (4): handleNext(), handlePrev(), onTouchEnd(), resetTimer()

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (4): AdminLeaveAuthGuard(), Home(), useContentSourceRefreshKey(), WidgetManager()

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (3): alertDialog(), handleSubmit(), syncConsent()

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.43
Nodes (4): extractYoutubeVideoId(), isValidYoutubeVideoUrl(), newLocalId(), normalizeVideoLinkItems()

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (2): formatSiteCopy(), formatCopy()

### Community 11 - "Community 11"
Cohesion: 0.83
Nodes (3): clampCookieFabPosition(), defaultCookieFabPosition(), readStoredCookieFabPosition()

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (2): LocationSection(), useSiteEditorSettingsRefresh()

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 18`** (2 nodes): `App.tsx`, `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `AppRoutes()`, `AppRoutes.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `ImageWithFallback.tsx`, `ImageWithFallback()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `FinalCTA.tsx`, `FinalCTA()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `GalleryLightbox.tsx`, `GalleryLightbox()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `ScrollToAnchor.tsx`, `ScrollToAnchor()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `Services.tsx`, `fetchServices()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `probeAdminCloudHealthAllSourcesLive()`, `adminCloudHealthLedProbe.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `firebase.ts`, `handleFirestoreError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `shouldUseHashRouting.ts`, `shouldUseHashRouting()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `Legal.tsx`, `onChange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `RecommendedProducts.tsx`, `onChanged()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `RouteLoadingFallback.tsx`, `RouteLoadingFallback()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `GdprSectionBlocks.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `legalSiteCopy.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `AboutArtist.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `navTypes.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Terms.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `domain.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `hasConsentFor()` connect `Community 0` to `Community 1`, `Community 5`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `triggerBooking()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `syncConsent()` connect `Community 5` to `Community 0`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `triggerBooking()` (e.g. with `hasConsentFor()` and `openConsentPreferences()`) actually correct?**
  _`triggerBooking()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `hasConsentFor()` (e.g. with `syncConsent()` and `triggerBooking()`) actually correct?**
  _`hasConsentFor()` has 3 INFERRED edges - model-reasoned connections that need verification._