'use client';

import { useEffect, useState } from 'react';

function scoreColor(s: number): string {
  if (s >= 75) return '#4ADE80';
  if (s >= 60) return '#6EE7B7';
  if (s >= 45) return '#FBBF24';
  if (s >= 30) return '#F87171';
  return '#EF4444';
}

function deltaColor(d: number): string {
  if (d > 0) return '#4ADE80';
  if (d < 0) return '#F87171';
  return '#4A5570';
}

function deltaSign(d: number): string {
  return d > 0 ? '+' : '';
}

interface ScoreBarProps {
  base: number;
  final: number;
  color?: string;
}

export default function ScoreBar({ base, final, color }: ScoreBarProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const delta = final - base;
  const dc = deltaColor(delta);
  const barColor = color || scoreColor(final);

  return (
    <div className="mt-1.5">
      {/* TODAY bar */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-mono text-[9px] text-muted min-w-[36px]">TODAY</span>
        <div className="flex-1 h-1.5 bg-raised rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm"
            style={{ width: `${base}%`, background: '#3A4A6A' }}
          />
        </div>
        <span className="font-mono text-[11px] font-bold text-muted min-w-[24px] text-right">
          {base}
        </span>
      </div>

      {/* 2028 bar */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-muted min-w-[36px]">2028</span>
        <div className="flex-1 h-1.5 bg-raised rounded-sm overflow-hidden">
          <div
            className="h-full rounded-sm transition-[width] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              width: ready ? `${final}%` : '0%',
              background: barColor,
            }}
          />
        </div>
        <span
          className="font-mono text-[11px] font-bold min-w-[24px] text-right"
          style={{ color: scoreColor(final) }}
        >
          {final}
        </span>
      </div>

      {/* Delta */}
      <div className="text-right mt-0.5">
        <span className="font-mono text-[10px] font-bold" style={{ color: dc }}>
          {deltaSign(delta)}{delta} pts
        </span>
      </div>
    </div>
  );
}

export { scoreColor, deltaColor, deltaSign };
