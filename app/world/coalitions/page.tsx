'use client';

import { useState } from 'react';
import { FACTIONS } from '@/lib/data/factions';
import { COALITIONS, ORPHAN_FACTION } from '@/lib/data/coalitions';
import { MATRIX } from '@/lib/data/matrix';
import CoalitionGraph from '@/components/world/CoalitionGraph';
import FactionDetail from '@/components/world/FactionDetail';
import { MatrixPairing } from '@/lib/types';

export default function CoalitionsPage() {
  const [selectedFaction, setSelectedFaction] = useState<string | null>(null);
  const [selectedPairing, setSelectedPairing] = useState<MatrixPairing | null>(null);

  const faction = selectedFaction ? FACTIONS.find((f) => f.id === selectedFaction) : null;

  function handleNodeClick(factionId: string) {
    setSelectedFaction(factionId);
    setSelectedPairing(null);
  }

  function handleEdgeClick(f1: string, f2: string) {
    const pairing = MATRIX.find(
      (m) => (m.f1 === f1 && m.f2 === f2) || (m.f1 === f2 && m.f2 === f1)
    );
    if (pairing) {
      setSelectedPairing(pairing);
      setSelectedFaction(null);
    }
  }

  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }
  function getFactionColor(id: string) {
    return FACTIONS.find((f) => f.id === id)?.color || '#4A5570';
  }

  const ALIGNMENT_COLORS: Record<string, string> = {
    natural_ally: '#4ADE80',
    conditional: '#FBBF24',
    natural_enemy: '#F87171',
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease_forwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
        COALITIONS
      </p>
      <h2 className="font-serif text-3xl font-normal text-text mb-6">
        Coalition Network
      </h2>

      <div className="flex gap-6">
        {/* Left: SVG graph */}
        <div className="flex-[3] min-w-0">
          <CoalitionGraph onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick} />
        </div>

        {/* Right: Coalition cards + detail panel */}
        <div className="flex-[2] min-w-[300px] space-y-3">
          {/* Coalition cards */}
          {COALITIONS.map((c) => {
            const stabilityColor =
              c.stability === 'High' ? '#4ADE80' : c.stability === 'Moderate' ? '#FBBF24' : '#F87171';
            return (
              <div key={c.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs" style={{ color: c.color }}>
                    {c.name}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold tracking-[0.08em] rounded px-1.5 py-0.5"
                    style={{ background: `${stabilityColor}22`, color: stabilityColor }}
                  >
                    {c.stability.toUpperCase()} STABILITY
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {c.members.map((id) => (
                    <button
                      key={id}
                      onClick={() => handleNodeClick(id)}
                      className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5 cursor-pointer transition-colors hover:brightness-125"
                      style={{
                        background: `${getFactionColor(id)}22`,
                        color: getFactionColor(id),
                        border: `1px solid ${getFactionColor(id)}33`,
                      }}
                    >
                      {getFactionName(id)}
                    </button>
                  ))}
                </div>

                <p className="font-serif text-xs text-body leading-[1.5] mb-2">{c.description}</p>

                {c.faultLines.length > 0 && (
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-red uppercase mb-1">
                      FAULT LINES
                    </p>
                    <ul className="space-y-0.5">
                      {c.faultLines.map((fl, i) => (
                        <li
                          key={i}
                          className="font-serif text-[11px] text-muted leading-[1.4] pl-2.5 relative before:content-['—'] before:absolute before:left-0 before:text-red/50"
                        >
                          {fl}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Orphan card */}
          <div className="bg-card border border-border rounded-xl p-4 border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-bold text-xs text-muted">F3 — Political Orphan</span>
            </div>
            <p className="font-serif text-xs text-body leading-[1.5]">{ORPHAN_FACTION.description}</p>
          </div>

          {/* Detail panel for selected faction or pairing */}
          {faction && (
            <div
              className="bg-card rounded-xl p-4"
              style={{ border: `1px solid ${faction.color}44` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-bold text-xs" style={{ color: faction.color }}>
                  {faction.code} — {faction.name}
                </span>
                <button
                  onClick={() => setSelectedFaction(null)}
                  className="text-muted hover:text-text text-sm cursor-pointer"
                >
                  ×
                </button>
              </div>
              <FactionDetail faction={faction} />
            </div>
          )}

          {selectedPairing && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-gold">
                    {FACTIONS.find((f) => f.id === selectedPairing.f1)?.code} ↔{' '}
                    {FACTIONS.find((f) => f.id === selectedPairing.f2)?.code}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5"
                    style={{
                      background: `${ALIGNMENT_COLORS[selectedPairing.alignment]}22`,
                      color: ALIGNMENT_COLORS[selectedPairing.alignment],
                    }}
                  >
                    {selectedPairing.alignment.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPairing(null)}
                  className="text-muted hover:text-text text-sm cursor-pointer"
                >
                  ×
                </button>
              </div>
              <p className="font-serif text-xs text-body leading-[1.6] mb-2">
                {selectedPairing.dynamic}
              </p>
              <div className="bg-raised rounded-lg p-2.5">
                <p className="font-mono text-[9px] text-gold tracking-[0.1em] mb-0.5">KEY VARIABLE</p>
                <p className="font-serif text-[11px] text-text leading-[1.5]">
                  {selectedPairing.keyVariable}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
