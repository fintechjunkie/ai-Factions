'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { WorldPanelContext } from '@/lib/types';

interface AppContextType {
  // Oracle
  oracleOpen: boolean;
  oraclePreload: string | undefined;
  openOracle: (preload?: string) => void;
  closeOracle: () => void;

  // WorldPanel
  worldPanelOpen: boolean;
  worldPanelContext: WorldPanelContext | null;
  openWorldPanel: (ctx: WorldPanelContext) => void;
  closeWorldPanel: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [oracleOpen, setOracleOpen] = useState(false);
  const [oraclePreload, setOraclePreload] = useState<string | undefined>();
  const [worldPanelOpen, setWorldPanelOpen] = useState(false);
  const [worldPanelContext, setWorldPanelContext] = useState<WorldPanelContext | null>(null);

  function openOracle(preload?: string) {
    setOraclePreload(preload);
    setOracleOpen(true);
  }

  function closeOracle() {
    setOracleOpen(false);
  }

  function openWorldPanel(ctx: WorldPanelContext) {
    setWorldPanelContext(ctx);
    setWorldPanelOpen(true);
  }

  function closeWorldPanel() {
    setWorldPanelOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        oracleOpen,
        oraclePreload,
        openOracle,
        closeOracle,
        worldPanelOpen,
        worldPanelContext,
        openWorldPanel,
        closeWorldPanel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
