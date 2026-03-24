'use client';

import { useState } from 'react';
import { GROUPS } from '@/lib/data/groups';
import { SCENARIOS } from '@/lib/data/scenarios';
import { FACTIONS } from '@/lib/data/factions';
import { GROUP_ICONS } from '@/lib/icons';
import { scoreColor } from '@/components/shared/ScoreBar';
import DetailModal from '@/components/shared/DetailModal';
import OracleButton from '@/components/shared/OracleButton';

type SortMode = 'score' | 'name';

export default function PeoplePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortMode>('score');

  const sorted = [...GROUPS].sort((a, b) => {
    if (sortBy === 'score') return b.baseScore - a.baseScore;
    return a.name.localeCompare(b.name);
  });

  const selected = GROUPS.find((g) => g.id === selectedId) || null;

  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease_forwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
        SOCIETAL GROUPS
      </p>
      <h2 className="font-serif text-3xl font-normal text-text mb-2">
        14 Groups, 14 Futures
      </h2>

      {/* Scenario probability bars */}
      <div className="flex gap-3 mb-6">
        {SCENARIOS.map((s) => (
          <div
            key={s.id}
            className="flex-1 rounded-lg px-3 py-2.5"
            style={{ background: '#111820', border: `1px solid ${s.color}33` }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-bold" style={{ color: s.color }}>
                {s.icon} {s.name}
              </span>
              <span className="font-mono text-[11px] font-bold" style={{ color: s.color }}>
                {s.defaultProbability}%
              </span>
            </div>
            <div className="h-1 bg-raised rounded-sm overflow-hidden">
              <div className="h-full rounded-sm" style={{ width: `${s.defaultProbability}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      <p className="font-serif text-xs text-muted mb-4 italic">
        These are baseline probabilities. Play the simulation to model a specific scenario.
      </p>

      {/* Sort toggle */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'score' as const, label: 'By Score' },
          { key: 'name' as const, label: 'By Name' },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`font-mono text-[10px] tracking-[0.1em] px-3 py-1.5 rounded transition-colors cursor-pointer ${
              sortBy === s.key
                ? 'bg-gold/20 text-gold border border-gold/40'
                : 'bg-card text-muted border border-border hover:border-muted'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Group grid */}
      <div className="grid grid-cols-3 gap-2">
        {sorted.map((g) => {
          const bcolor = scoreColor(g.baseScore);
          const icon = GROUP_ICONS[g.id];
          return (
            <div
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className="rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-150 hover:border-gold/30"
              style={{ background: '#111820', border: '1px solid #1A2535' }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="game-icon-sm flex items-center justify-center"
                    style={{ background: `linear-gradient(180deg, ${g.color}18, ${g.color}06)`, borderColor: `${g.color}33` }}
                  >
                    {icon?.emoji || '👤'}
                  </span>
                  <span className="font-mono font-bold text-[11px]" style={{ color: g.color }}>
                    {g.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-bold" style={{ color: bcolor }}>
                    {g.baseScore}
                  </span>
                  <span className="text-muted text-[11px] select-none">▸</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex-1 h-1 bg-raised rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm" style={{ width: `${g.baseScore}%`, background: bcolor }} />
                </div>
              </div>
              <p className="font-serif text-xs text-muted leading-[1.4]">{g.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <DetailModal
          title={selected.name}
          subtitle={`Score: ${selected.baseScore}/100`}
          emoji={GROUP_ICONS[selected.id]?.emoji || '👤'}
          color={selected.color}
          onClose={() => setSelectedId(null)}
        >
          <div className="space-y-5">
            {/* Profile */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">PROFILE</p>
              <p className="font-serif text-sm text-body leading-[1.7]">{selected.fullDescription}</p>
            </div>

            {/* Score */}
            <div className="rounded-xl p-4" style={{ background: `${selected.color}08`, border: `1px solid ${selected.color}20` }}>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: selected.color }}>
                CURRENT SCORE
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-bold" style={{ color: scoreColor(selected.baseScore) }}>
                  {selected.baseScore}
                </span>
                <div className="flex-1 h-2.5 bg-raised rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{ width: `${selected.baseScore}%`, background: scoreColor(selected.baseScore) }}
                  />
                </div>
              </div>
            </div>

            {/* Scenario scores */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">SCENARIO OUTCOMES</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Gold Rush', color: '#FBBF24', data: selected.goldRush },
                  { label: 'Backlash', color: '#F43F5E', data: selected.backlash },
                  { label: 'Stalemate', color: '#14B8A6', data: selected.stalemate },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3.5 text-center"
                    style={{ background: `${s.color}0A`, border: `1px solid ${s.color}20` }}
                  >
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase mb-1.5" style={{ color: s.color }}>
                      {s.label}
                    </p>
                    <p className="font-mono font-bold text-xl mb-1" style={{ color: scoreColor(s.data.score) }}>
                      {s.data.score}
                    </p>
                    <p className="font-serif text-[11px] text-body leading-[1.4] italic">{s.data.headline}</p>
                    <p className="font-serif text-[10px] text-muted leading-[1.4] mt-1.5">{s.data.mechanism}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Represented by */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">REPRESENTED BY</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.representedBy.map((id) => (
                  <span key={id} className="font-mono text-[10px] font-bold rounded px-2 py-1 bg-gold/10 text-gold border border-gold/30">
                    {getFactionName(id)}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Risk & Opportunity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ background: '#F871710A', border: '1px solid #F8717120' }}>
                <p className="font-mono text-[9px] tracking-[0.15em] text-red uppercase mb-1.5">KEY RISK</p>
                <p className="font-serif text-sm text-body leading-[1.6]">{selected.keyRisk}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: '#4ADE800A', border: '1px solid #4ADE8020' }}>
                <p className="font-mono text-[9px] tracking-[0.15em] text-green uppercase mb-1.5">KEY OPPORTUNITY</p>
                <p className="font-serif text-sm text-body leading-[1.6]">{selected.keyOpportunity}</p>
              </div>
            </div>

            {/* Oracle */}
            <OracleButton
              preload={`What does the future look like for ${selected.name}? How do the three scenarios affect them?`}
              label={`◎ Ask Oracle about ${selected.name}`}
              className="!text-[11px]"
            />
          </div>
        </DetailModal>
      )}
    </div>
  );
}
