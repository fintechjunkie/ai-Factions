'use client';

import { useState } from 'react';
import { TRIGGERS } from '@/lib/data/triggers';
import { FACTIONS } from '@/lib/data/factions';
import { GROUPS } from '@/lib/data/groups';
import { EVENT_ICONS } from '@/lib/icons';
import DetailModal from '@/components/shared/DetailModal';
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

export default function EventsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = TRIGGERS.find((t) => t.id === selectedId) || null;

  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }
  function getFactionCode(id: string) {
    return FACTIONS.find((f) => f.id === id)?.code || id;
  }
  function getGroupName(id: string) {
    return GROUPS.find((g) => g.id === id)?.name || id;
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease_forwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
        TRIGGER EVENTS
      </p>
      <h2 className="font-serif text-3xl font-normal text-text mb-2">
        9 Events That Will Shape 2026-2027
      </h2>
      <p className="font-serif text-sm text-body mb-6">
        Each trigger event has a probability, beneficiaries, casualties, and timing dependencies.
        Click any card to see the full analysis.
      </p>

      <div className="space-y-2 max-w-[800px]">
        {TRIGGERS.map((t) => {
          const probColor = PROB_COLORS[t.probability];
          const icon = EVENT_ICONS[t.id];
          return (
            <div
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className="rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-150 hover:border-gold/30"
              style={{
                background: '#111820',
                border: `1px solid #1A2535`,
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <span className="game-icon" style={{ borderColor: probColor }}>
                    {icon?.emoji || '⚡'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-xs text-text">{t.name}</span>
                      <span
                        className="font-mono text-[9px] font-bold tracking-[0.1em] rounded px-1.5 py-0.5"
                        style={{ background: `${probColor}22`, color: probColor }}
                      >
                        {t.probability} · {t.probabilityPct}%
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-muted text-[11px] select-none">▸</span>
              </div>
              <div className="h-1 bg-raised rounded-sm overflow-hidden mb-2">
                <div className="h-full rounded-sm" style={{ width: `${t.probabilityPct}%`, background: probColor }} />
              </div>
              <p className="font-serif text-xs text-body leading-[1.5]">
                {t.description.slice(0, 120)}...
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <DetailModal
          title={selected.name}
          subtitle={`${selected.id} · ${selected.probability} PROBABILITY · ${selected.probabilityPct}%`}
          emoji={EVENT_ICONS[selected.id]?.emoji || '⚡'}
          color={PROB_COLORS[selected.probability]}
          onClose={() => setSelectedId(null)}
        >
          <div className="space-y-5">
            {/* Description */}
            <p className="font-serif text-sm text-body leading-[1.7]">{selected.description}</p>

            {/* Probability bar */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">PROBABILITY</p>
              <div className="h-2.5 bg-raised rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all"
                  style={{ width: `${selected.probabilityPct}%`, background: PROB_COLORS[selected.probability] }}
                />
              </div>
              <p className="font-mono text-[11px] mt-1" style={{ color: PROB_COLORS[selected.probability] }}>
                {selected.probabilityPct}%
              </p>
            </div>

            {/* Beneficiaries & Casualties */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ background: '#4ADE800A', border: '1px solid #4ADE8020' }}>
                <p className="font-mono text-[10px] tracking-[0.15em] text-green uppercase mb-2">BENEFICIARIES</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.beneficiaries.map((id) => (
                    <span key={id} className="font-mono text-[9px] font-bold rounded px-2 py-1 bg-green/10 text-green border border-green/30">
                      {getFactionCode(id)} {getFactionName(id)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-4" style={{ background: '#F871710A', border: '1px solid #F8717120' }}>
                <p className="font-mono text-[10px] tracking-[0.15em] text-red uppercase mb-2">CASUALTIES</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.casualties.map((id) => (
                    <span key={id} className="font-mono text-[9px] font-bold rounded px-2 py-1 bg-red/10 text-red border border-red/30">
                      {getFactionCode(id)} {getFactionName(id)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Group Impacts */}
            {selected.groupImpacts.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">GROUP IMPACTS</p>
                <div className="space-y-2">
                  {selected.groupImpacts.map((gi) => {
                    const dir = DIRECTION_ARROWS[gi.direction];
                    return (
                      <div
                        key={gi.groupId}
                        className="flex items-start gap-3 rounded-lg px-3.5 py-2.5"
                        style={{ background: `${dir.color}08`, border: `1px solid ${dir.color}15` }}
                      >
                        <span className="font-mono text-sm font-bold mt-0.5" style={{ color: dir.color }}>
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

            {/* Timing */}
            <div className="rounded-xl p-4" style={{ background: '#FBBF240A', border: '1px solid #FBBF2420' }}>
              <p className="font-mono text-[10px] tracking-[0.15em] text-amber uppercase mb-1.5">TIMING MATTERS</p>
              <p className="font-serif text-sm text-body leading-[1.6]">{selected.timingMatters}</p>
            </div>

            {/* Oracle */}
            <OracleButton
              preload={`Analyze trigger event ${selected.id}: ${selected.name}. What are the second-order effects?`}
              label={`◎ Ask Oracle about ${selected.name}`}
              className="!text-[11px]"
            />
          </div>
        </DetailModal>
      )}
    </div>
  );
}
