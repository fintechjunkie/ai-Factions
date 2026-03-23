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
          bg-transparent text-body border border-border font-mono font-bold text-xs
          tracking-[0.1em] px-7 py-3 rounded-md transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-muted cursor-pointer'}
        `}
      >
        {label}
      </button>
    );
  }

  const bg = teal ? 'bg-teal' : 'bg-gold';
  const hoverBg = teal ? 'hover:brightness-110' : 'hover:bg-[#DEB85C]';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${bg} text-black font-mono font-bold text-xs tracking-[0.12em]
        px-7 py-3 rounded-md transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed !bg-raised !text-muted' : `${hoverBg} cursor-pointer`}
      `}
    >
      {label}
    </button>
  );
}
