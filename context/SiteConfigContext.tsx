'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type SiteConfig = Record<string, string>;

interface SiteConfigContextValue {
  config: SiteConfig;
  get: (key: string) => string;
}

const DEFAULT_CONFIG: SiteConfig = {};

const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: DEFAULT_CONFIG,
  get: () => '',
});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: ReactNode;
}) {
  const [injected, setInjected] = useState<SiteConfig>(config);

  useEffect(() => {
    setInjected(config);
  }, [config]);

  const value: SiteConfigContextValue = {
    config: injected,
    get: (key: string) => injected[key] ?? '',
  };

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}