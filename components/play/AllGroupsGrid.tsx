'use client';

import { useState } from 'react';
import { SimulationResult } from '@/lib/types';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import { GROUP_ICONS } from '@/lib/icons';
import ScoreBar, { scoreColor, deltaColor, deltaSign } from '@/components/shared/ScoreBar';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';
import DetailModal from '@/components/shared/DetailModal';

interface AllGroupsGridProps {
  result: SimulationResult;
  chosenId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function AllGroupsGrid({ result, chosenId, onNext, onBack }: AllGroupsGridProps) {
  const sorted = [...(result.groups || [])].sort((a, b) => b.score - a.score);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const year = result.targetYear || 2028;

  const selectedGd = result.groups?.find((g) => g.id === selectedId);
  const selectedGrp = GROUPS.find((g) => g.id === selectedId);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-5 py-10">
      <div className="w-full max-w-[900px] animate-[fadeIn_0.4s_ease_forwards]">
        <div className="text-center mb-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
            JANUARY 1, {year}
          </p>
          <h2 className="font-serif text-[26px] font-normal text-text mb-1.5">
            How all 14 groups fared
          </h2>
          <p className="font-serif text-sm text-body">
            Sorted best to worst. Click any card to expand. Grey bar = today. Colored bar = {year}.
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
            const icon = GROUP_ICONS[gd.id];

            return (
              <div
                key={gd.id}
                onClick={() => setSelectedId(gd.id)}
                className="rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200 hover:border-gold/30"
                style={{
                  background: '#111820',
                  border: `1px solid ${isMe ? grp.color : '#1A2535'}`,
                  boxShadow: isMe ? `0 0 0 2px ${grp.color}44` : 'none',
                }}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <span
                      className="game-icon-sm flex items-center justify-center"
                      style={{ background: `linear-gradient(180deg, ${grp.color}18, ${grp.color}06)`, borderColor: `${grp.color}33` }}
                    >
                      {icon?.emoji || '👤'}
                    </span>
                    <div>
                      <p
                        className="font-mono font-bold text-[11px] mb-0.5"
                        style={{ color: isMe ? grp.color : '#9A9080' }}
                      >
                        {isMe ? '★ ' : ''}{grp.name}
                      </p>
                      {gd.headline && (
                        <p className="font-serif text-[10px] italic m-0" style={{ color: dc }}>
                          {gd.headline}
                        </p>
                      )}
                    </div>
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
                    <span className="text-muted text-[11px] ml-1 select-none">▸</span>
                  </div>
                </div>

                <ScoreBar base={base} final={gd.score} color={grp.color} />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <BackButton onClick={onBack} />
          <Btn label="SEE WHO WON POLITICALLY →" onClick={onNext} />
        </div>
      </div>

      {/* Modal */}
      {selectedGd && selectedGrp && (
        <DetailModal
          title={selectedGrp.name}
          subtitle={`Score: ${selectedGd.score}/100 · ${selectedGd.headline || ''}`}
          emoji={GROUP_ICONS[selectedGrp.id]?.emoji || '👤'}
          color={selectedGrp.color}
          onClose={() => setSelectedId(null)}
        >
          <div className="space-y-5">
            {/* Score comparison */}
            <div className="rounded-xl p-5" style={{ background: `${selectedGrp.color}0A`, border: `1px solid ${selectedGrp.color}20` }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase">MARCH 2026</p>
                  <p className="font-mono text-2xl font-bold" style={{ color: scoreColor(BASE_SCORES[selectedGrp.id]) }}>
                    {BASE_SCORES[selectedGrp.id]}
                  </p>
                </div>
                <div className="text-center px-4">
                  <span className="font-mono text-2xl" style={{ color: deltaColor(selectedGd.score - BASE_SCORES[selectedGrp.id]) }}>
                    →
                  </span>
                  <p className="font-mono text-sm font-bold" style={{ color: deltaColor(selectedGd.score - BASE_SCORES[selectedGrp.id]) }}>
                    {deltaSign(selectedGd.score - BASE_SCORES[selectedGrp.id])}{selectedGd.score - BASE_SCORES[selectedGrp.id]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase">JAN {year}</p>
                  <p className="font-mono text-2xl font-bold" style={{ color: scoreColor(selectedGd.score) }}>
                    {selectedGd.score}
                  </p>
                </div>
              </div>
              <ScoreBar base={BASE_SCORES[selectedGrp.id]} final={selectedGd.score} color={selectedGrp.color} />
            </div>

            {/* Who they are */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">WHO THEY ARE</p>
              <p className="font-serif text-sm text-body leading-[1.7]">{selectedGrp.desc}</p>
            </div>

            {/* What happened */}
            {selectedGd.note && (
              <div className="rounded-xl p-4" style={{ background: `${deltaColor(selectedGd.score - BASE_SCORES[selectedGrp.id])}0A`, border: `1px solid ${deltaColor(selectedGd.score - BASE_SCORES[selectedGrp.id])}20` }}>
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
                  WHAT HAPPENED BY {year}
                </p>
                <p className="font-serif text-[14px] text-text leading-[1.7]">{selectedGd.note}</p>
              </div>
            )}

            {/* Key Risk & Opportunity (from static data) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ background: '#F871710A', border: '1px solid #F8717120' }}>
                <p className="font-mono text-[9px] tracking-[0.15em] text-red uppercase mb-1.5">KEY RISK</p>
                <p className="font-serif text-sm text-body leading-[1.6]">{selectedGrp.keyRisk}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: '#4ADE800A', border: '1px solid #4ADE8020' }}>
                <p className="font-mono text-[9px] tracking-[0.15em] text-green uppercase mb-1.5">KEY OPPORTUNITY</p>
                <p className="font-serif text-sm text-body leading-[1.6]">{selectedGrp.keyOpportunity}</p>
              </div>
            </div>
          </div>
        </DetailModal>
      )}
    </div>
  );
}
