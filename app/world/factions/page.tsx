'use client';

import { useState } from 'react';
import { FACTIONS } from '@/lib/data/factions';
import { MatrixPairing } from '@/lib/types';
import FactionCard from '@/components/world/FactionCard';
import FactionModal from '@/components/world/FactionModal';
import PowerMatrix from '@/components/world/PowerMatrix';

export default function FactionsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPairing, setSelectedPairing] = useState<MatrixPairing | null>(null);

  const selectedFaction = FACTIONS.find((f) => f.id === selectedId) || null;

  return (
    <div className="animate-[fadeIn_0.4s_ease_forwards]">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-2">FACTIONS</p>
      <h2 className="font-serif text-3xl font-normal text-text mb-6">
        The 10 Factions Shaping AI Policy
      </h2>

      <div className="flex gap-6">
        {/* Left: Faction grid */}
        <div className="flex-[2] min-w-0">
          <div className="grid grid-cols-2 gap-2">
            {FACTIONS.map((f) => (
              <div key={f.id}>
                <FactionCard
                  faction={f}
                  isExpanded={selectedId === f.id}
                  onClick={() => setSelectedId(f.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Power Matrix (sticky) */}
        <div className="flex-1 min-w-[280px]">
          <div className="sticky top-32">
            <PowerMatrix
              onPairingClick={(pairing) => setSelectedPairing(pairing)}
            />

            {/* Selected pairing detail */}
            {selectedPairing && (
              <div className="mt-4 bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-gold">
                    {FACTIONS.find((f) => f.id === selectedPairing.f1)?.code} ↔{' '}
                    {FACTIONS.find((f) => f.id === selectedPairing.f2)?.code}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5"
                    style={{
                      background:
                        selectedPairing.alignment === 'natural_ally'
                          ? '#4ADE8022'
                          : selectedPairing.alignment === 'conditional'
                          ? '#FBBF2422'
                          : '#F8717122',
                      color:
                        selectedPairing.alignment === 'natural_ally'
                          ? '#4ADE80'
                          : selectedPairing.alignment === 'conditional'
                          ? '#FBBF24'
                          : '#F87171',
                    }}
                  >
                    {selectedPairing.alignment.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="font-serif text-xs text-body leading-[1.6] mb-2">
                  {selectedPairing.dynamic}
                </p>
                <p className="font-mono text-[10px] text-muted">
                  <span className="text-gold">Key variable:</span> {selectedPairing.keyVariable}
                </p>
                <button
                  onClick={() => setSelectedPairing(null)}
                  className="mt-2 font-mono text-[10px] text-muted hover:text-text cursor-pointer"
                >
                  × Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {selectedFaction && (
        <FactionModal
          faction={selectedFaction}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
