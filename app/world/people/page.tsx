'use client';

import { useState } from 'react';
import { GROUPS } from '@/lib/data/groups';
import { SCENARIOS } from '@/lib/data/scenarios';
import GroupCard from '@/components/world/GroupCard';

type SortMode = 'score' | 'name';

export default function PeoplePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortMode>('score');

  function toggle(id: string) {
    setExpandedId((cur) => (cur === id ? null : id));
  }

  const sorted = [...GROUPS].sort((a, b) => {
    if (sortBy === 'score') return b.baseScore - a.baseScore;
    return a.name.localeCompare(b.name);
  });

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
              <div
                className="h-full rounded-sm"
                style={{ width: `${s.defaultProbability}%`, background: s.color }}
              />
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
        {sorted.map((g) => (
          <div key={g.id} className={expandedId === g.id ? 'col-span-3' : ''}>
            <GroupCard
              group={g}
              expanded={expandedId === g.id}
              onClick={() => toggle(g.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
