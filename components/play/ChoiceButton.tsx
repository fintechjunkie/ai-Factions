'use client';

import { useState } from 'react';
import { Choice } from '@/lib/types';

interface ChoiceButtonProps {
  choice: Choice;
  selected: boolean;
  onClick: () => void;
}

export default function ChoiceButton({ choice, selected, onClick }: ChoiceButtonProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-start gap-3 rounded-lg p-3 mb-2 cursor-pointer transition-all duration-150"
      style={{
        background: selected ? '#C9A84C18' : hov ? '#161E2C' : '#111820',
        border: `1px solid ${selected ? '#C9A84C' : hov ? '#4A5570' : '#1A2535'}`,
      }}
    >
      {/* Radio circle */}
      <div
        className="w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center"
        style={{
          borderColor: selected ? '#C9A84C' : '#1A2535',
          background: selected ? '#C9A84C' : 'transparent',
        }}
      >
        {selected && <div className="w-[7px] h-[7px] rounded-full bg-black" />}
      </div>

      <div>
        <p
          className="font-mono font-bold text-xs mb-0.5"
          style={{ color: selected ? '#C9A84C' : '#E6DDD0' }}
        >
          {choice.label}
        </p>
        <p className="text-xs text-body leading-[1.4]">{choice.desc}</p>
      </div>
    </div>
  );
}
