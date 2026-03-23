'use client';

import { useState } from 'react';
import { TRIGGERS } from '@/lib/data/triggers';
import TriggerCard from '@/components/world/TriggerCard';

export default function EventsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    setExpandedId((cur) => (cur === id ? null : id));
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
        Click any card to expand the full analysis.
      </p>

      <div className="space-y-2 max-w-[800px]">
        {TRIGGERS.map((t) => (
          <TriggerCard
            key={t.id}
            trigger={t}
            expanded={expandedId === t.id}
            onClick={() => toggle(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
