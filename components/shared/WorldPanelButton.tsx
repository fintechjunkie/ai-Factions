'use client';

import { useApp } from '@/lib/context';
import { WorldPanelContext } from '@/lib/types';

interface WorldPanelButtonProps {
  context: WorldPanelContext;
  label?: string;
  className?: string;
}

export default function WorldPanelButton({ context, label, className }: WorldPanelButtonProps) {
  const { openWorldPanel } = useApp();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openWorldPanel(context);
      }}
      className={`font-mono text-[10px] font-bold tracking-[0.08em] text-gold/60 hover:text-gold transition-colors cursor-pointer ${className || ''}`}
    >
      {label || '◎'}
    </button>
  );
}
