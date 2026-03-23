'use client';

import { Scenario } from '@/lib/types';
import { FACTIONS } from '@/lib/data/factions';
import OracleButton from '@/components/shared/OracleButton';

const OUTCOME_COLORS: Record<string, string> = {
  Win: '#4ADE80',
  'Partial Win': '#34D399',
  Draw: '#4A5570',
  'Partial Loss': '#F87171',
  Loss: '#EF4444',
};

interface ScenarioPanelProps {
  scenario: Scenario;
}

export default function ScenarioPanel({ scenario }: ScenarioPanelProps) {
  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }
  function getFactionCode(id: string) {
    return FACTIONS.find((f) => f.id === id)?.code || id;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{scenario.icon}</span>
          <span className="font-mono font-bold text-lg" style={{ color: scenario.color }}>
            {scenario.name}
          </span>
          <span
            className="font-mono text-[11px] font-bold rounded px-2 py-0.5 ml-auto"
            style={{ background: `${scenario.color}22`, color: scenario.color }}
          >
            {scenario.defaultProbability}%
          </span>
        </div>
        <p className="font-serif text-sm text-text leading-[1.7] mb-2">{scenario.plainDescription}</p>
        <p className="font-mono text-[10px] text-muted">{scenario.condition}</p>
      </div>

      {/* Narrative */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">NARRATIVE</p>
        {scenario.narrative.map((p, i) => (
          <p key={i} className="font-serif text-sm text-body leading-[1.8] mb-3">
            {p}
          </p>
        ))}
      </div>

      {/* Faction Outcomes */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">
          FACTION OUTCOMES
        </p>
        <div className="space-y-1.5">
          {scenario.factionOutcomes.map((fo) => {
            const oc = OUTCOME_COLORS[fo.outcome] || '#4A5570';
            return (
              <div key={fo.factionId} className="flex items-start gap-2 py-1.5 border-b border-border">
                <span className="font-mono text-[10px] font-bold text-muted min-w-[24px]">
                  {getFactionCode(fo.factionId)}
                </span>
                <div className="flex-1">
                  <span className="font-mono text-[10px] font-bold text-body">
                    {getFactionName(fo.factionId)}
                  </span>
                  <p className="font-serif text-[11px] text-muted leading-[1.4] mt-0.5">{fo.reason}</p>
                </div>
                <span
                  className="font-mono text-[8px] font-bold tracking-[0.08em] rounded px-1.5 py-0.5 whitespace-nowrap"
                  style={{ background: `${oc}22`, color: oc, border: `1px solid ${oc}44` }}
                >
                  {fo.outcome.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger Cluster */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
          TRIGGER CLUSTER
        </p>
        <div className="flex flex-wrap gap-1.5">
          {scenario.triggerCluster.map((id) => (
            <span
              key={id}
              className="font-mono text-[10px] font-bold rounded px-2 py-0.5"
              style={{ background: `${scenario.color}15`, color: scenario.color, border: `1px solid ${scenario.color}33` }}
            >
              {id}
            </span>
          ))}
        </div>
      </div>

      {/* Snapshots */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-raised rounded-lg p-3">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">EOY 2026</p>
          <p className="font-serif text-xs text-body leading-[1.6]">{scenario.eoy2026Snapshot}</p>
        </div>
        <div className="bg-raised rounded-lg p-3">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">EOY 2027</p>
          <p className="font-serif text-xs text-body leading-[1.6]">{scenario.eoy2027Snapshot}</p>
        </div>
      </div>

      {/* Oracle */}
      <OracleButton
        preload={`Analyze the ${scenario.name} scenario in depth. What are the key conditions that make it happen, who benefits most, and what are the second-order consequences?`}
        label={`◎ Ask Oracle about ${scenario.name}`}
        className="!text-[11px]"
      />
    </div>
  );
}
