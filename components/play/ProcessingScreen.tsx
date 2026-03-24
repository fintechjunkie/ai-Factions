'use client';

import { useState, useEffect } from 'react';

interface ProcessingScreenProps {
  targetYear?: number;
}

export default function ProcessingScreen({ targetYear = 2028 }: ProcessingScreenProps) {
  const [lineIdx, setLineIdx] = useState(0);

  const MESSAGES = [
    'Reading your predictions...',
    'Mapping faction dynamics...',
    'Weighing trigger interactions...',
    'Running group impact models...',
    'Computing scenario probabilities...',
    'Drafting the State of the Union...',
    `Finalizing January 1, ${targetYear}...`,
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setLineIdx((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 900);
    return () => clearInterval(t);
  }, [MESSAGES.length]);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-5">
      <div className="text-center animate-[fadeIn_0.4s_ease_forwards]">
        {/* Pulsing dots */}
        <div className="flex justify-center gap-2.5 mb-11">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold"
              style={{ animation: `dot 1.4s ${i * 0.22}s ease-in-out infinite` }}
            />
          ))}
        </div>

        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
          ANALYZING YOUR WORLD
        </p>
        <h2 className="font-serif text-2xl font-normal text-text mb-9">
          Building January 1, {targetYear}
        </h2>
        <p className="font-mono text-[13px] text-gold tracking-[0.05em] min-h-[22px]">
          {MESSAGES[lineIdx]}
        </p>
      </div>
    </div>
  );
}
