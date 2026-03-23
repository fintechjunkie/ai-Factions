'use client';

import { usePathname } from 'next/navigation';
import { AppProvider, useApp } from '@/lib/context';
import NavBar from './NavBar';
import OraclePanel from './OraclePanel';
import WorldPanel from './WorldPanel';

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const {
    oracleOpen, oraclePreload, oracleGameContext, closeOracle,
    worldPanelOpen, worldPanelContext, closeWorldPanel,
  } = useApp();

  return (
    <>
      {!isLanding && <NavBar />}
      {children}
      <OraclePanel
        isOpen={oracleOpen}
        onClose={closeOracle}
        preload={oraclePreload}
        gameContext={oracleGameContext}
      />
      <WorldPanel isOpen={worldPanelOpen} onClose={closeWorldPanel} context={worldPanelContext} />
    </>
  );
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutInner>{children}</LayoutInner>
    </AppProvider>
  );
}
