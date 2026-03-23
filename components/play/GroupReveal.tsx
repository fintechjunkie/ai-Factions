'use client';

import { SimulationResult } from '@/lib/types';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import { scoreColor, deltaColor, deltaSign } from '@/components/shared/ScoreBar';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';

interface GroupRevealProps {
  result: SimulationResult;
  chosenId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function GroupReveal({ result, chosenId, onNext, onBack }: GroupRevealProps) {
  const grp = GROUPS.find((g) => g.id === chosenId) || GROUPS[0];
  const gd = (result.groups || []).find((g) => g.id === chosenId) || {
    score: BASE_SCORES[chosenId] || 50,
    headline: '',
    note: '',
  };
  const base = BASE_SCORES[chosenId] || 50;
  const delta = gd.score - base;
  const dc = deltaColor(delta);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-[680px] animate-[fadeIn_0.4s_ease_forwards]">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase text-center mb-3.5">
          YOUR OUTCOME
        </p>
        <h2
          className="font-serif text-[26px] font-normal text-center mb-1"
          style={{ color: grp.color }}
        >
          {grp.name}
        </h2>
        <p className="font-serif text-sm text-body text-center mb-7">{grp.desc}</p>

        {/* Big score display */}
        <div className="flex gap-3 mb-5">
          {/* Today */}
          <div className="flex-1 bg-card rounded-xl p-5 text-center border border-[#3A4A6A]">
            <p className="font-mono text-[10px] text-muted tracking-[0.15em] mb-2">TODAY</p>
            <p className="font-mono font-bold text-[40px] text-[#6A8AB0] mb-1">{base}</p>
            <div className="h-1.5 bg-raised rounded-sm overflow-hidden">
              <div className="h-full rounded-sm" style={{ width: `${base}%`, background: '#3A4A6A' }} />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center flex-col gap-1 px-2">
            <div className="font-mono text-xl" style={{ color: dc }}>→</div>
            <div className="font-mono font-bold text-sm" style={{ color: dc }}>
              {deltaSign(delta)}{delta}
            </div>
          </div>

          {/* 2028 */}
          <div
            className="flex-1 bg-card rounded-xl p-5 text-center"
            style={{ border: `1px solid ${grp.color}44` }}
          >
            <p className="font-mono text-[10px] text-muted tracking-[0.15em] mb-2">JANUARY 1, 2028</p>
            <p className="font-mono font-bold text-[40px] mb-1" style={{ color: scoreColor(gd.score) }}>
              {gd.score}
            </p>
            <div className="h-1.5 bg-raised rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm transition-[width] duration-1000 ease-out"
                style={{ width: `${gd.score}%`, background: scoreColor(gd.score) }}
              />
            </div>
          </div>
        </div>

        {/* Headline */}
        {gd.headline && (
          <p className="font-serif text-lg text-center mb-4 italic" style={{ color: dc }}>
            &ldquo;{gd.headline}&rdquo;
          </p>
        )}

        {/* Narrative */}
        <div
          className="bg-card rounded-xl px-6 py-5 mb-5"
          style={{ border: `1px solid ${grp.color}33` }}
        >
          <p className="font-serif text-base text-text leading-[1.9] m-0">
            {result.chosenGroupNarrative}
          </p>
        </div>

        <p className="font-mono text-[10px] text-muted text-center mb-6 leading-[1.6]">
          Score: 1 (dire) to 100 (thriving). Reflects economic security, employment stability, and income.
        </p>

        <div className="flex justify-between">
          <BackButton onClick={onBack} />
          <Btn label="SEE ALL 14 GROUPS →" onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
