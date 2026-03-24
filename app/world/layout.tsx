'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const TABS = [
  { label: 'Factions', href: '/world/factions', desc: '10 power players' },
  { label: 'Events', href: '/world/events', desc: '9 trigger events' },
  { label: 'Coalitions', href: '/world/coalitions', desc: 'Alliance network' },
  { label: 'People', href: '/world/people', desc: '14 societal groups' },
  { label: 'Scenarios', href: '/world/scenarios', desc: '3 possible futures' },
];

export default function WorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Scroll to top when entering world mode
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div>
      {/* Secondary tab nav */}
      <div className="bg-surf border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 flex gap-0.5">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`group flex flex-col px-4 py-2.5 transition-all border-b-2 ${
                  active
                    ? 'text-gold border-gold bg-gold/5'
                    : 'text-muted border-transparent hover:text-body hover:bg-white/[0.02]'
                }`}
              >
                <span className="font-mono text-xs tracking-[0.1em] font-bold">
                  {tab.label}
                </span>
                <span className={`font-mono text-[8px] tracking-[0.05em] mt-0.5 ${
                  active ? 'text-gold/50' : 'text-muted/50'
                }`}>
                  {tab.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
