'use client';

import { useEffect } from 'react';
import { Faction } from '@/lib/types';
import FactionDetail from './FactionDetail';
import { FACTION_ICONS } from '@/lib/icons';

interface FactionModalProps {
  faction: Faction;
  onClose: () => void;
}

export default function FactionModal({ faction, onClose }: FactionModalProps) {
  const icon = FACTION_ICONS[faction.id];

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-overlay"
      style={{ background: 'rgba(7, 9, 15, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="modal-content w-full max-w-[640px] max-h-[85vh] overflow-y-auto cyber-frame border-flow"
        style={{ borderColor: `${faction.color}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-7 py-5 border-b"
          style={{
            background: `linear-gradient(180deg, #0C1018 0%, #0C1018F0 100%)`,
            borderColor: `${faction.color}22`,
          }}
        >
          <div className="flex items-center justify-between">
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

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center cursor-pointer transition-all duration-150 hover:border-gold/50 hover:bg-gold/5"
            >
              <span className="text-muted text-sm">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 py-5">
          <FactionDetail faction={faction} />
        </div>
      </div>
    </div>
  );
}
