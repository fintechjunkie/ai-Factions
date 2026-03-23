'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context';

export default function NavBar() {
  const pathname = usePathname();
  const isWorld = pathname.startsWith('/world');
  const isPlay = pathname.startsWith('/play');
  const { openOracle } = useApp();

  return (
    <nav className="bg-surf border-b border-border sticky top-0 z-30">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono font-bold text-sm text-gold tracking-[0.1em]">
            AI FACTIONS
          </Link>
          <span className="font-mono text-[10px] text-muted tracking-[0.08em]">
            SCENARIO ANALYSIS 2026-2027
          </span>
        </div>

        {/* Center: Mode toggle */}
        <div className="flex items-center gap-1">
          <Link
            href="/world/factions"
            className={`font-mono text-xs tracking-[0.1em] px-4 py-2 transition-colors border-b-2 ${
              isWorld
                ? 'text-gold border-gold'
                : 'text-muted border-transparent hover:text-body'
            }`}
          >
            WORLD
          </Link>
          <Link
            href="/play"
            className={`font-mono text-xs tracking-[0.1em] px-4 py-2 transition-colors border-b-2 ${
              isPlay
                ? 'text-gold border-gold'
                : 'text-muted border-transparent hover:text-body'
            }`}
          >
            PLAY
          </Link>
        </div>

        {/* Right: Oracle button */}
        <button
          onClick={() => openOracle()}
          className="font-mono text-xs font-bold tracking-[0.1em] text-gold border border-gold/40 rounded-md px-4 py-2 hover:border-gold transition-colors cursor-pointer"
        >
          ◎ ASK ORACLE
        </button>
      </div>
    </nav>
  );
}
