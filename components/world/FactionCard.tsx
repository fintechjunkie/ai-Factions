'use client';

import { Faction } from '@/lib/types';

interface FactionCardProps {
  faction: Faction;
  isExpanded: boolean;
  onClick: () => void;
}

export default function FactionCard({ faction, isExpanded, onClick }: FactionCardProps) {
  const postureBg: Record<string, string> = {
    Offensive: '#4ADE8022',
    Defensive: '#F8717122',
    Swing: '#FBBF2422',
  };
  const postureColor: Record<string, string> = {
    Offensive: '#4ADE80',
    Defensive: '#F87171',
    Swing: '#FBBF24',
  };

  return (
    <div
      onClick={onClick}
      className="rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-150"
      style={{
        background: isExpanded ? `${faction.color}12` : '#111820',
        border: `1px solid ${isExpanded ? faction.color : '#1A2535'}`,
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px] font-bold tracking-[0.1em] rounded px-1.5 py-0.5"
            style={{ background: `${faction.color}22`, color: faction.color }}
          >
            {faction.code}
          </span>
          <span className="font-mono font-bold text-xs" style={{ color: faction.color }}>
            {faction.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-muted tracking-[0.08em] capitalize">
            {faction.category}
          </span>
          <span
            className="font-mono text-[9px] font-bold tracking-[0.08em] rounded px-1.5 py-0.5"
            style={{ background: postureBg[faction.posture], color: postureColor[faction.posture] }}
          >
            {faction.posture.toUpperCase()}
          </span>
        </div>
      </div>
      <p className="font-serif text-xs text-body leading-[1.5] m-0 line-clamp-2">
        {faction.stance}
      </p>
    </div>
  );
}
