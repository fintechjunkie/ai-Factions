'use client';

import { useState } from 'react';
import { SCENARIOS } from '@/lib/data/scenarios';
import ScenarioPanel from '@/components/world/ScenarioPanel';

export default function ScenariosPage() {
  const [activeId, setActiveId] = useState<'gold' | 'backlash' | 'stalemate'>('gold');
  const active = SCENARIOS.find((s) => s.id === activeId)!;

  return (
    <div className="animate-[fadeIn_0.4s_ease_forwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
        SCENARIOS
      </p>
      <h2 className="font-serif text-3xl font-normal text-text mb-6">
        Three Possible Futures
      </h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
            style={{
              background: activeId === s.id ? `${s.color}18` : '#111820',
              border: `1px solid ${activeId === s.id ? s.color : '#1A2535'}`,
            }}
          >
            <span className="text-lg">{s.icon}</span>
            <span
              className="font-mono text-xs font-bold tracking-[0.08em]"
              style={{ color: activeId === s.id ? s.color : '#9A9080' }}
            >
              {s.name}
            </span>
            <span
              className="font-mono text-[10px] font-bold"
              style={{ color: s.color }}
            >
              {s.defaultProbability}%
            </span>
          </button>
        ))}
      </div>

      {/* Active scenario panel */}
      <div className="max-w-[800px]">
        <ScenarioPanel scenario={active} />
      </div>
    </div>
  );
}
