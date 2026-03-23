'use client';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = '← BACK' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent text-body border border-border font-mono font-bold text-xs tracking-[0.1em] px-7 py-3 rounded-md hover:border-muted transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}
