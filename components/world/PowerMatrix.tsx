'use client';

import { useState } from 'react';
import { FACTIONS } from '@/lib/data/factions';
import { MATRIX } from '@/lib/data/matrix';
import { MatrixPairing } from '@/lib/types';

const FACTION_CODES = FACTIONS.map((f) => ({ id: f.id, code: f.code, color: f.color }));

function getAlignment(f1: string, f2: string): MatrixPairing | undefined {
  return MATRIX.find(
    (m) => (m.f1 === f1 && m.f2 === f2) || (m.f1 === f2 && m.f2 === f1)
  );
}

const ALIGNMENT_COLORS: Record<string, string> = {
  natural_ally: '#4ADE80',
  conditional: '#FBBF24',
  natural_enemy: '#F87171',
};

interface PowerMatrixProps {
  onPairingClick?: (pairing: MatrixPairing) => void;
}

export default function PowerMatrix({ onPairingClick }: PowerMatrixProps) {
  const [hovered, setHovered] = useState<{ f1: string; f2: string } | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; pairing: MatrixPairing } | null>(null);

  const hoveredPairing = hovered ? getAlignment(hovered.f1, hovered.f2) : null;

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-3">
        POWER MATRIX
      </p>

      <div className="relative">
        {/* Column headers */}
        <div className="flex ml-[30px]">
          {FACTION_CODES.map((f) => (
            <div key={f.id} className="flex-1 text-center">
              <span className="font-mono text-[8px] font-bold" style={{ color: f.color }}>
                {f.code}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        {FACTION_CODES.map((row) => (
          <div key={row.id} className="flex items-center">
            {/* Row label */}
            <div className="w-[30px] flex-shrink-0 text-right pr-1">
              <span className="font-mono text-[8px] font-bold" style={{ color: row.color }}>
                {row.code}
              </span>
            </div>

            {/* Cells */}
            {FACTION_CODES.map((col) => {
              const isDiag = row.id === col.id;
              const pairing = isDiag ? undefined : getAlignment(row.id, col.id);
              const cellColor = pairing ? ALIGNMENT_COLORS[pairing.alignment] : undefined;

              return (
                <div
                  key={col.id}
                  className="flex-1 aspect-square m-[1px] rounded-[2px] cursor-pointer transition-all duration-100"
                  style={{
                    background: isDiag
                      ? '#0F1420'
                      : cellColor
                      ? `${cellColor}30`
                      : '#111820',
                    border: isDiag ? 'none' : `1px solid ${cellColor ? `${cellColor}40` : '#1A2535'}`,
                    opacity:
                      hovered && !isDiag && hovered.f1 !== row.id && hovered.f2 !== col.id
                        ? 0.3
                        : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (isDiag) return;
                    setHovered({ f1: row.id, f2: col.id });
                    if (pairing) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                        pairing,
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setTooltip(null);
                  }}
                  onClick={() => {
                    if (pairing && onPairingClick) onPairingClick(pairing);
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredPairing && (
        <div className="mt-3 bg-raised border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="font-mono text-[9px] font-bold rounded px-1.5 py-0.5"
              style={{
                background: `${ALIGNMENT_COLORS[hoveredPairing.alignment]}22`,
                color: ALIGNMENT_COLORS[hoveredPairing.alignment],
              }}
            >
              {hoveredPairing.alignment.replace('_', ' ').toUpperCase()}
            </span>
            <span className="font-mono text-[9px] text-muted">
              Leverage: {hoveredPairing.leverage}
            </span>
          </div>
          <p className="font-serif text-xs text-body leading-[1.5]">{hoveredPairing.dynamic}</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-3 mt-3 justify-center">
        {[
          { label: 'Ally', color: '#4ADE80' },
          { label: 'Conditional', color: '#FBBF24' },
          { label: 'Enemy', color: '#F87171' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: `${l.color}40` }} />
            <span className="font-mono text-[9px] text-muted">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
