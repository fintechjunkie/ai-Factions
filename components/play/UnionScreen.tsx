'use client';

import { SimulationResult } from '@/lib/types';
import Btn from '@/components/shared/Btn';

const SCENARIO_META: Record<string, { icon: string; color: string; name: string; plain: string }> = {
  gold: {
    icon: '🚀',
    color: '#FBBF24',
    name: 'The Gold Rush',
    plain: 'AI deploys fast with no real guardrails. Capital wins. Labor loses. Tech billionaires get everything they wanted.',
  },
  backlash: {
    icon: '🔥',
    color: '#F43F5E',
    name: 'The Backlash',
    plain: 'Visible job losses trigger a political revolt. Democrats win Congress and pass worker protections. The tech industry faces its first real reckoning.',
  },
  stalemate: {
    icon: '⚖️',
    color: '#14B8A6',
    name: 'The Stalemate',
    plain: 'Washington gridlocks. The EU becomes the de facto global regulator. Courts and state laws create a patchwork nobody controls.',
  },
};

interface UnionScreenProps {
  result: SimulationResult;
  onNext: () => void;
}

export default function UnionScreen({ result, onNext }: UnionScreenProps) {
  const dom = result.dominantScenario;
  const meta = SCENARIO_META[dom];

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-5 py-10">
      <div className="w-full max-w-[680px] animate-[fadeIn_0.4s_ease_forwards]">
        {/* Eyebrow */}
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase text-center mb-3.5">
          JANUARY 1, 2028
        </p>

        {/* Title + badge */}
        <div className="text-center mb-7">
          <h1 className="font-serif text-[30px] font-normal text-text mb-3.5">
            AI State of the Union
          </h1>
          <span
            className="inline-block font-mono text-[11px] font-bold tracking-[0.1em] rounded px-3 py-1"
            style={{
              background: `${meta.color}22`,
              color: meta.color,
              border: `1px solid ${meta.color}55`,
            }}
          >
            {dom.toUpperCase()} SCENARIO — {meta.name}
          </span>
        </div>

        {/* Three scenario cards */}
        <div className="flex gap-2 justify-center mb-7">
          {(['gold', 'backlash', 'stalemate'] as const).map((k) => {
            const m = SCENARIO_META[k];
            const prob = result.probabilities?.[k] || 0;
            const isDom = dom === k;
            return (
              <div
                key={k}
                className="flex-1 rounded-xl px-3.5 py-4 text-center"
                style={{
                  background: isDom ? `${m.color}18` : '#111820',
                  border: `2px solid ${isDom ? m.color : '#1A2535'}`,
                }}
              >
                <div className="text-xl mb-1.5">{m.icon}</div>
                <div className="font-mono font-bold text-lg mb-1" style={{ color: m.color }}>
                  {prob}%
                </div>
                <div
                  className="font-mono font-bold text-[11px] tracking-[0.08em] mb-2"
                  style={{ color: isDom ? m.color : '#9A9080' }}
                >
                  {m.name.toUpperCase()}
                </div>
                <p className="font-serif text-xs text-muted leading-[1.55] m-0">{m.plain}</p>
                {isDom && (
                  <div className="mt-2.5 font-mono text-[9px] tracking-[0.1em]" style={{ color: m.color }}>
                    ▲ DOMINANT
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* State of the Union narrative */}
        <div className="bg-card border border-border rounded-xl px-8 py-7 mb-5">
          {(result.stateOfUnion || []).map((p, i) => (
            <p
              key={i}
              className={`font-serif text-base leading-[1.9] ${i === 0 ? 'text-text' : 'text-body'} ${
                i < (result.stateOfUnion?.length || 0) - 1 ? 'mb-5' : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Key Insight */}
        <div className="bg-[#C9A84C12] border border-[#C9A84C33] rounded-lg px-4.5 py-3.5 mb-7">
          <p className="font-mono text-[10px] tracking-[0.15em] text-gold mb-1.5">KEY INSIGHT</p>
          <p className="font-serif text-sm text-text leading-[1.7] m-0">{result.keyInsight}</p>
        </div>

        <div className="text-center">
          <Btn label="YOUR OUTCOME →" onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
