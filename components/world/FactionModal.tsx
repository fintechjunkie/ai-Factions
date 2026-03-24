'use client';

import { useEffect, useState } from 'react';
import { Faction } from '@/lib/types';
import FactionDetail from './FactionDetail';
import { FACTION_ICONS } from '@/lib/icons';

interface FactionModalProps {
  faction: Faction;
  onClose: () => void;
}

export default function FactionModal({ faction, onClose }: FactionModalProps) {
  const icon = FACTION_ICONS[faction.id];
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 200);
  }

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(7, 9, 15, 0.88)',
        backdropFilter: 'blur(10px)',
        animation: closing ? 'overlayOut 0.2s ease forwards' : 'overlayIn 0.2s ease forwards',
      }}
      onClick={handleClose}
    >
      {/* Close hint */}
      <div className="absolute top-5 right-6 z-50">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111820] border border-border cursor-pointer transition-all duration-200 hover:border-gold/50 hover:bg-gold/5 hover:shadow-[0_0_12px_rgba(201,168,76,0.1)]"
        >
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted">ESC</span>
          <span className="text-muted text-base">✕</span>
        </button>
      </div>

      {/* Modal card */}
      <div
        className="w-full max-w-[660px] max-h-[82vh] mx-6 flex flex-col rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${faction.color}44`,
          background: 'linear-gradient(180deg, #0C1018 0%, #0A0E14 100%)',
          boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 30px ${faction.color}15, inset 0 1px 0 ${faction.color}15`,
          animation: closing ? 'modalSlideOut 0.2s ease forwards' : 'modalSlideIn 0.3s ease forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — not scrollable */}
        <div
          className="flex-shrink-0 px-7 py-5 border-b"
          style={{
            background: `linear-gradient(180deg, ${faction.color}08, transparent)`,
            borderColor: `${faction.color}22`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="game-icon flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, ${faction.color}20, ${faction.color}08)`,
                borderColor: `${faction.color}44`,
              }}
            >
              {icon?.emoji || '⚡'}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="font-mono text-[10px] font-bold tracking-[0.1em] rounded px-1.5 py-0.5"
                  style={{ background: `${faction.color}22`, color: faction.color }}
                >
                  {faction.code}
                </span>
                <span className="font-mono font-bold text-sm" style={{ color: faction.color }}>
                  {faction.name}
                </span>
              </div>
              <span className="font-mono text-[9px] text-muted tracking-[0.08em] capitalize">
                {faction.category} · {faction.posture}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-7 py-5" style={{ minHeight: 0 }}>
          <FactionDetail faction={faction} />
        </div>

        {/* Footer with close */}
        <div
          className="flex-shrink-0 px-7 py-3 border-t flex justify-end"
          style={{ borderColor: `${faction.color}15`, background: '#0A0E14' }}
        >
          <button
            onClick={handleClose}
            className="font-mono text-[10px] tracking-[0.1em] text-muted hover:text-gold cursor-pointer transition-colors px-3 py-1.5 rounded border border-border hover:border-gold/30"
          >
            CLOSE ✕
          </button>
        </div>
      </div>
    </div>
  );
}
