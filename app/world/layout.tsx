'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Factions', href: '/world/factions' },
  { label: 'Events', href: '/world/events' },
  { label: 'Coalitions', href: '/world/coalitions' },
  { label: 'People', href: '/world/people' },
  { label: 'Scenarios', href: '/world/scenarios' },
];

export default function WorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      {/* Secondary tab nav */}
      <div className="bg-surf border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 flex gap-1">
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`font-mono text-xs tracking-[0.1em] px-4 py-3 transition-colors border-b-2 ${
                  active
                    ? 'text-gold border-gold'
                    : 'text-muted border-transparent hover:text-body'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
