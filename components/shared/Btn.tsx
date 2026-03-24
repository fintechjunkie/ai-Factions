'use client';

interface BtnProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  teal?: boolean;
}

export default function Btn({ label, onClick, disabled, secondary, teal }: BtnProps) {
  if (secondary) {
    return (
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`
          bg-transparent text-body border-2 border-border font-mono font-bold text-xs
          tracking-[0.1em] px-7 py-3.5 rounded-xl transition-all
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gold/40 hover:text-gold cursor-pointer'}
        `}
        style={{
          boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        {label}
      </button>
    );
  }

  const borderColor = teal ? '#14B8A6' : '#B8943F';
  const bgGrad = teal
    ? 'linear-gradient(180deg, #18D4B0, #14B8A6, #0F9985)'
    : 'linear-gradient(180deg, #DEB85C, #C9A84C, #A8893A)';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        text-black font-mono font-bold text-xs tracking-[0.12em]
        px-8 py-3.5 rounded-xl transition-all relative overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed !bg-raised !text-muted' : 'cursor-pointer hover:brightness-110 active:translate-y-[1px]'}
      `}
      style={{
        background: disabled ? undefined : bgGrad,
        border: disabled ? '2px solid #1A2535' : `2px solid ${borderColor}`,
        boxShadow: disabled
          ? 'none'
          : `0 4px 14px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.15)`,
      }}
    >
      {label}
    </button>
  );
}
