'use client';

import { useState } from 'react';
import { SimulationResult } from '@/lib/types';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import ScoreBar, { scoreColor, deltaColor, deltaSign } from '@/components/shared/ScoreBar';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';

interface AllGroupsGridProps {
  result: SimulationResult;
  chosenId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function AllGroupsGrid({ result, chosenId, onNext, onBack }: AllGroupsGridProps) {
  const sorted = [...(result.groups || [])].sort((a, b) => b.score - a.score);
  const [expanded, setExpanded] = useState<string | null>(chosenId);

  function toggle(id: string) {
    setExpanded((cur) => (cur === id ? null : id));
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-5 py-10">
      <div className="w-full max-w-[900px] animate-[fadeIn_0.4s_ease_forwards]">
        <div className="text-center mb-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
            JANUARY 1, 2028
          </p>
          <h2 className="font-serif text-[26px] font-normal text-text mb-1.5">
            How all 14 groups fared
          </h2>
          <p className="font-serif text-sm text-body">
            Sorted best to worst. Click any card to expand. Grey bar = today. Colored bar = 2028.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-2.5 mb-9">
          {sorted.map((gd) => {
            const grp = GROUPS.find((g) => g.id === gd.id);
            if (!grp) return null;
            const base = BASE_SCORES[gd.id] || 50;
            const delta = gd.score - base;
            const dc = deltaColor(delta);
            const isMe = gd.id === chosenId;
            const isOpen = expanded === gd.id;

            return (
              <div
                key={gd.id}
                onClick={() => toggle(gd.id)}
                className="rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200"
                style={{
                  background: isOpen ? `${grp.color}12` : '#111820',
                  border: `1px solid ${isOpen || isMe ? grp.color : '#1A2535'}`,
                  boxShadow: isOpen
                    ? `0 0 0 2px ${grp.color}66`
                    : isMe
                    ? `0 0 0 2px ${grp.color}44`
                    : 'none',
                }}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex-1 mr-2">
                    <p
                      className="font-mono font-bold text-[11px] mb-0.5"
                      style={{ color: isOpen || isMe ? grp.color : '#9A9080' }}
                    >
                      {isMe ? '★ ' : ''}{grp.name}
                    </p>
                    {gd.headline && (
                      <p className="font-serif text-[11px] italic m-0" style={{ color: dc }}>
                        {gd.headline}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="text-right">
                      <span className="font-mono font-bold text-[17px]" style={{ color: scoreColor(gd.score) }}>
                        {gd.score}
                      </span>
                      <span className="font-mono text-[10px] ml-1" style={{ color: dc }}>
                        {deltaSign(delta)}{delta}
                      </span>
                    </div>
                    <span className="text-muted text-[11px] ml-1 select-none">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                <ScoreBar base={base} final={gd.score} color={grp.color} />

                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="font-mono text-[10px] text-muted tracking-[0.1em] mb-1">WHO THEY ARE</p>
                    <p className="font-serif text-xs text-body leading-[1.5] mb-2.5">{grp.desc}</p>
                    {gd.note && (
                      <>
                        <p className="font-mono text-[10px] text-muted tracking-[0.1em] mb-1 mt-2">WHAT HAPPENED</p>
                        <p className="font-serif text-[13px] text-text leading-[1.6] m-0">{gd.note}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <BackButton onClick={onBack} />
          <Btn label="SEE WHO WON POLITICALLY →" onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
