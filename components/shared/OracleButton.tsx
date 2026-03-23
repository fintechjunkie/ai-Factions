'use client';

import { useApp } from '@/lib/context';

interface OracleButtonProps {
  preload?: string;
  label?: string;
  className?: string;
}

export default function OracleButton({ preload, label, className }: OracleButtonProps) {
  const { openOracle } = useApp();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openOracle(preload);
      }}
      className={`font-mono text-[10px] font-bold tracking-[0.1em] text-gold/70 hover:text-gold transition-colors cursor-pointer ${className || ''}`}
      title={preload || 'Ask the Oracle'}
    >
      {label || '◎'}
    </button>
  );
}
