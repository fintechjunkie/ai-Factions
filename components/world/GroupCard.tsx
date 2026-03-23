'use client';

import { Group } from '@/lib/types';
import { FACTIONS } from '@/lib/data/factions';
import { scoreColor } from '@/components/shared/ScoreBar';
import OracleButton from '@/components/shared/OracleButton';

interface GroupCardProps {
  group: Group;
  expanded?: boolean;
  onClick?: () => void;
}

export default function GroupCard({ group, expanded = false, onClick }: GroupCardProps) {
  const bcolor = scoreColor(group.baseScore);

  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-xl px-4 py-3.5 transition-all duration-150 ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: expanded ? `${group.color}12` : '#111820',
        border: `1px solid ${expanded ? group.color : '#1A2535'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono font-bold text-[11px]" style={{ color: group.color }}>
          {group.name}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] font-bold" style={{ color: bcolor }}>
            {group.baseScore}
          </span>
          {onClick && (
            <span className="text-muted text-[11px] select-none">{expanded ? '▲' : '▼'}</span>
          )}
        </div>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="flex-1 h-1 bg-raised rounded-sm overflow-hidden">
          <div className="h-full rounded-sm" style={{ width: `${group.baseScore}%`, background: bcolor }} />
        </div>
      </div>

      <p className="font-serif text-xs text-muted leading-[1.4]">{group.desc}</p>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Full description */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">PROFILE</p>
            <p className="font-serif text-xs text-body leading-[1.6]">{group.fullDescription}</p>
          </div>

          {/* Scenario scores */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">
              SCENARIO OUTCOMES
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'goldRush' as const, label: 'Gold Rush', color: '#FBBF24', data: group.goldRush },
                { key: 'backlash' as const, label: 'Backlash', color: '#F43F5E', data: group.backlash },
                { key: 'stalemate' as const, label: 'Stalemate', color: '#14B8A6', data: group.stalemate },
              ].map((s) => (
                <div key={s.key} className="bg-raised rounded-lg p-2.5 text-center">
                  <p className="font-mono text-[8px] tracking-[0.1em] uppercase mb-1" style={{ color: s.color }}>
                    {s.label}
                  </p>
                  <p className="font-mono font-bold text-lg mb-0.5" style={{ color: scoreColor(s.data.score) }}>
                    {s.data.score}
                  </p>
                  <p className="font-serif text-[10px] text-body leading-[1.3] italic">{s.data.headline}</p>
                  <p className="font-serif text-[9px] text-muted leading-[1.3] mt-1">{s.data.mechanism}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Represented by */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
              REPRESENTED BY
            </p>
            <div className="flex flex-wrap gap-1">
              {group.representedBy.map((id) => (
                <span
                  key={id}
                  className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5 bg-gold/10 text-gold border border-gold/30"
                >
                  {getFactionName(id)}
                </span>
              ))}
            </div>
          </div>

          {/* Key Risk & Opportunity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red/5 border border-red/20 rounded-lg p-2.5">
              <p className="font-mono text-[9px] tracking-[0.15em] text-red uppercase mb-1">KEY RISK</p>
              <p className="font-serif text-[11px] text-body leading-[1.5]">{group.keyRisk}</p>
            </div>
            <div className="bg-green/5 border border-green/20 rounded-lg p-2.5">
              <p className="font-mono text-[9px] tracking-[0.15em] text-green uppercase mb-1">KEY OPPORTUNITY</p>
              <p className="font-serif text-[11px] text-body leading-[1.5]">{group.keyOpportunity}</p>
            </div>
          </div>

          {/* Oracle */}
          <OracleButton
            preload={`What does the future look like for ${group.name}? How do the three scenarios affect them differently, and what should they watch for?`}
            label={`◎ Ask Oracle about ${group.name}`}
            className="!text-[11px]"
          />
        </div>
      )}
    </div>
  );
}
