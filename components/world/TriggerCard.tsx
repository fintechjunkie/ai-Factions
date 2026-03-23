'use client';

import { Trigger } from '@/lib/types';
import { FACTIONS } from '@/lib/data/factions';
import { GROUPS } from '@/lib/data/groups';
import OracleButton from '@/components/shared/OracleButton';

const PROB_COLORS: Record<string, string> = {
  HIGH: '#4ADE80',
  MEDIUM: '#FBBF24',
  LOW: '#F87171',
};

const DIRECTION_ARROWS: Record<string, { symbol: string; color: string }> = {
  positive: { symbol: '↑', color: '#4ADE80' },
  negative: { symbol: '↓', color: '#F87171' },
  neutral: { symbol: '→', color: '#4A5570' },
};

interface TriggerCardProps {
  trigger: Trigger;
  expanded?: boolean;
  onClick?: () => void;
}

export default function TriggerCard({ trigger, expanded = false, onClick }: TriggerCardProps) {
  const probColor = PROB_COLORS[trigger.probability];

  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }
  function getFactionCode(id: string) {
    return FACTIONS.find((f) => f.id === id)?.code || id;
  }
  function getFactionColor(id: string) {
    return FACTIONS.find((f) => f.id === id)?.color || '#4A5570';
  }
  function getGroupName(id: string) {
    return GROUPS.find((g) => g.id === id)?.name || id;
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-xl px-4 py-3.5 transition-all duration-150 ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: expanded ? '#111820' : '#111820',
        border: `1px solid ${expanded ? probColor + '44' : '#1A2535'}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[10px] font-bold tracking-[0.1em] rounded px-1.5 py-0.5"
            style={{ background: `${probColor}22`, color: probColor }}
          >
            {trigger.id}
          </span>
          <span className="font-mono font-bold text-xs text-text">{trigger.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold" style={{ color: probColor }}>
            {trigger.probabilityPct}%
          </span>
          {onClick && (
            <span className="text-muted text-[11px] select-none">{expanded ? '▲' : '▼'}</span>
          )}
        </div>
      </div>

      {/* Probability bar */}
      <div className="h-1 bg-raised rounded-sm overflow-hidden mb-2">
        <div
          className="h-full rounded-sm"
          style={{ width: `${trigger.probabilityPct}%`, background: probColor }}
        />
      </div>

      <p className="font-serif text-xs text-body leading-[1.5]">
        {expanded ? trigger.description : trigger.description.slice(0, 120) + '...'}
      </p>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Beneficiaries & Casualties */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-green uppercase mb-1.5">
                BENEFICIARIES
              </p>
              <div className="flex flex-wrap gap-1">
                {trigger.beneficiaries.map((id) => (
                  <span
                    key={id}
                    className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5 bg-green/10 text-green border border-green/30"
                  >
                    {getFactionCode(id)} {getFactionName(id)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-red uppercase mb-1.5">
                CASUALTIES
              </p>
              <div className="flex flex-wrap gap-1">
                {trigger.casualties.map((id) => (
                  <span
                    key={id}
                    className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5 bg-red/10 text-red border border-red/30"
                  >
                    {getFactionCode(id)} {getFactionName(id)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Group Impacts */}
          {trigger.groupImpacts.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
                GROUP IMPACTS
              </p>
              <div className="space-y-1.5">
                {trigger.groupImpacts.map((gi) => {
                  const dir = DIRECTION_ARROWS[gi.direction];
                  return (
                    <div key={gi.groupId} className="flex items-start gap-2">
                      <span className="font-mono text-xs font-bold mt-0.5" style={{ color: dir.color }}>
                        {dir.symbol}
                      </span>
                      <div className="flex-1">
                        <span className="font-mono text-[10px] font-bold text-body">
                          {getGroupName(gi.groupId)}
                        </span>
                        <span className="font-mono text-[9px] text-muted ml-1.5">({gi.magnitude})</span>
                        <p className="font-serif text-[11px] text-muted leading-[1.4] mt-0.5">{gi.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Timing Matters */}
          <div className="bg-raised rounded-lg p-3">
            <p className="font-mono text-[10px] tracking-[0.15em] text-amber uppercase mb-1">
              TIMING MATTERS
            </p>
            <p className="font-serif text-xs text-body leading-[1.6]">{trigger.timingMatters}</p>
          </div>

          {/* Oracle */}
          <OracleButton
            preload={`Analyze trigger event ${trigger.id}: ${trigger.name}. What are the second-order effects? How does this interact with other triggers?`}
            label={`◎ Ask Oracle about ${trigger.name}`}
            className="!text-[11px]"
          />
        </div>
      )}
    </div>
  );
}
