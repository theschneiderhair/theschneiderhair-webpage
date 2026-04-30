import React, {createContext, useContext, useMemo} from 'react';
import {legalSiteCopy} from '../content/legalSiteCopy';
import {
  defaultWebsiteTextVariables,
  formatCopy as formatCopyFn,
  type SiteCopy,
  type WebsiteTextVariables,
} from '../content/siteCopy';

type SiteCopyContextValue = {
  siteCopy: SiteCopy;
  formatCopy: typeof formatCopyFn;
};

const SiteCopyContext = createContext<SiteCopyContextValue | null>(null);

function cloneWebsiteTextVariables(data: WebsiteTextVariables): WebsiteTextVariables {
  return JSON.parse(JSON.stringify(data)) as WebsiteTextVariables;
}

export function SiteCopyProvider({children}: {children: React.ReactNode}) {
  const siteCopy = useMemo(
    () => ({...cloneWebsiteTextVariables(defaultWebsiteTextVariables), ...legalSiteCopy}) as SiteCopy,
    []
  );

  const value = useMemo<SiteCopyContextValue>(
    () => ({
      siteCopy,
      formatCopy: formatCopyFn,
    }),
    [siteCopy]
  );

  return <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>;
}

export function useSiteCopy(): SiteCopyContextValue {
  const ctx = useContext(SiteCopyContext);
  if (!ctx) {
    throw new Error('useSiteCopy must be used within SiteCopyProvider');
  }
  return ctx;
}
