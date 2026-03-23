'use client';

import { WorldPanelContext } from '@/lib/types';
import { FACTIONS } from '@/lib/data/factions';
import { TRIGGERS } from '@/lib/data/triggers';
import { GROUPS } from '@/lib/data/groups';
import { SCENARIOS } from '@/lib/data/scenarios';
import { MATRIX } from '@/lib/data/matrix';
import FactionDetail from '@/components/world/FactionDetail';
import TriggerCard from '@/components/world/TriggerCard';
import GroupCard from '@/components/world/GroupCard';
import ScenarioPanel from '@/components/world/ScenarioPanel';

interface WorldPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: WorldPanelContext | null;
}

export default function WorldPanel({ isOpen, onClose, context }: WorldPanelProps) {
  if (!isOpen || !context) return null;

  let title = '';
  let content: React.ReactNode = null;

  switch (context.type) {
    case 'faction': {
      const faction = FACTIONS.find((f) => f.id === context.id);
      if (faction) {
        title = faction.name;
        content = <FactionDetail faction={faction} />;
      }
      break;
    }
    case 'trigger': {
      const trigger = TRIGGERS.find((t) => t.id === context.id);
      if (trigger) {
        title = trigger.name;
        content = <TriggerCard trigger={trigger} expanded />;
      }
      break;
    }
    case 'group': {
      const group = GROUPS.find((g) => g.id === context.id);
      if (group) {
        title = group.name;
        content = <GroupCard group={group} expanded />;
      }
      break;
    }
    case 'scenario': {
      const scenario = SCENARIOS.find((s) => s.id === context.id);
      if (scenario) {
        title = scenario.name;
        content = <ScenarioPanel scenario={scenario} />;
      }
      break;
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-[480px] bg-surf border-l border-border z-50 flex flex-col animate-[slideIn_0.25s_ease-out_forwards]"
        style={{ '--slide-from': '100%', '--slide-to': '0' } as React.CSSProperties}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-0.5">
              {context.type.toUpperCase()}
            </p>
            <p className="font-mono text-sm font-bold text-gold">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors text-xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{content}</div>

        {/* Footer link */}
        <div className="px-6 py-3 border-t border-border flex-shrink-0">
          <p className="font-mono text-[10px] text-muted">
            Go deeper in{' '}
            <a
              href={`/world/${context.type === 'faction' ? 'factions' : context.type === 'trigger' ? 'events' : context.type === 'group' ? 'people' : 'scenarios'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              World mode →
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
