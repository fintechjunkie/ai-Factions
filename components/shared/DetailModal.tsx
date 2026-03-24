'use client';

import { useEffect, useState, ReactNode } from 'react';

interface DetailModalProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  color: string;
  children: ReactNode;
  onClose: () => void;
}

export default function DetailModal({ title, subtitle, emoji, color, children, onClose }: DetailModalProps) {
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 200);
  }

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
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh]"
      style={{
        background: 'rgba(7, 9, 15, 0.88)',
        backdropFilter: 'blur(10px)',
        animation: closing ? 'overlayOut 0.2s ease forwards' : 'overlayIn 0.2s ease forwards',
      }}
      onClick={handleClose}
    >
      {/* Close hint top-right */}
      <div className="absolute top-5 right-6 z-50">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111820] border border-border cursor-pointer transition-all duration-200 hover:border-gold/50 hover:bg-gold/5 hover:shadow-[0_0_12px_rgba(201,168,76,0.1)]"
        >
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted">ESC</span>
          <span className="text-muted text-base">✕</span>
        </button>
      </div>

      {/* Modal */}
      <div
        className="w-full max-w-[680px] max-h-[85vh] mx-6 flex flex-col rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${color}44`,
          background: `linear-gradient(180deg, ${color}08 0%, #0C1018 5%, #0A0E14 100%)`,
          boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 30px ${color}15, inset 0 1px 0 ${color}15`,
          animation: closing ? 'modalSlideOut 0.2s ease forwards' : 'modalSlideIn 0.3s ease forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-7 py-5 border-b"
          style={{
            background: `linear-gradient(135deg, ${color}0D, ${color}04, transparent)`,
            borderColor: `${color}22`,
          }}
        >
          <div className="flex items-center gap-3">
            {emoji && (
              <span
                className="game-icon flex items-center justify-center"
                style={{
                  background: `linear-gradient(180deg, ${color}22, ${color}08)`,
                  borderColor: `${color}44`,
                }}
              >
                {emoji}
              </span>
            )}
            <div>
              <span className="font-mono font-bold text-sm" style={{ color }}>
                {title}
              </span>
              {subtitle && (
                <p className="font-mono text-[9px] text-muted tracking-[0.08em] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-7 py-5" style={{ minHeight: 0 }}>
          {children}
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 px-7 py-3 border-t flex justify-end"
          style={{ borderColor: `${color}15`, background: '#0A0E14' }}
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
