'use client';

import { scoreColor } from './ScoreBar';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const color = scoreColor(score);
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
    lg: 'text-sm px-2.5 py-1',
  };

  return (
    <span
      className={`font-mono font-bold rounded ${sizeClasses[size]}`}
      style={{ color, background: `${color}22`, border: `1px solid ${color}44` }}
    >
      {score}
    </span>
  );
}
