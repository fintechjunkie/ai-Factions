'use client';

import { Faction } from '@/lib/types';
import { FACTIONS } from '@/lib/data/factions';
import OracleButton from '@/components/shared/OracleButton';

interface FactionDetailProps {
  faction: Faction;
}

export default function FactionDetail({ faction }: FactionDetailProps) {
  function getFactionName(id: string) {
    return FACTIONS.find((f) => f.id === id)?.name || id;
  }

  return (
    <div className="space-y-4">
      {/* Voices */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
          PUBLIC FIGURES & ORGANIZATIONS
        </p>
        <div className="flex flex-wrap gap-1.5">
          {faction.voices.map((v) => (
            <span
              key={v.name}
              className="font-mono text-[10px] rounded px-2 py-1"
              style={{ background: '#161E2C', border: '1px solid #1A2535' }}
            >
              <span className="text-text">{v.name}</span>
              <span className="text-muted ml-1">— {v.role}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Primary Weapon */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">
          PRIMARY WEAPON
        </p>
        <p className="font-serif text-sm text-text">{faction.primaryWeapon}</p>
      </div>

      {/* Stance */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">
          CURRENT STANCE
        </p>
        <p className="font-serif text-sm text-body leading-[1.7]">{faction.stance}</p>
      </div>

      {/* Message */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">
          PUBLIC NARRATIVE
        </p>
        <p className="font-serif text-sm text-text leading-[1.7] italic">&ldquo;{faction.message}&rdquo;</p>
      </div>

      {/* Tactics */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1.5">
          TACTICS
        </p>
        <ul className="space-y-1">
          {faction.tactics.map((t, i) => (
            <li key={i} className="font-serif text-xs text-body leading-[1.5] pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-muted">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Manipulation */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">
          HOW THEY SHAPE OPINION
        </p>
        <p className="font-serif text-xs text-body leading-[1.6]">{faction.manipulation}</p>
      </div>

      {/* Allies & Opponents */}
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="font-mono text-[10px] tracking-[0.15em] text-green uppercase mb-1.5">ALLIES</p>
          <div className="flex flex-wrap gap-1">
            {faction.allies.map((id) => (
              <span key={id} className="font-mono text-[10px] font-bold rounded px-1.5 py-0.5 bg-green/10 text-green border border-green/30">
                {getFactionName(id)}
              </span>
            ))}
            {faction.allies.length === 0 && <span className="font-mono text-[10px] text-muted">None</span>}
          </div>
        </div>
        <div className="flex-1">
          <p className="font-mono text-[10px] tracking-[0.15em] text-red uppercase mb-1.5">OPPONENTS</p>
          <div className="flex flex-wrap gap-1">
            {faction.opponents.map((id) => (
              <span key={id} className="font-mono text-[10px] font-bold rounded px-1.5 py-0.5 bg-red/10 text-red border border-red/30">
                {getFactionName(id)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Projections */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-raised rounded-lg p-3">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">EOY 2026</p>
          <p className="font-serif text-xs text-body leading-[1.6]">{faction.eoy2026}</p>
        </div>
        <div className="bg-raised rounded-lg p-3">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-1">EOY 2027</p>
          <p className="font-serif text-xs text-body leading-[1.6]">{faction.eoy2027}</p>
        </div>
      </div>

      {/* Key Fact */}
      <div className="bg-[#C9A84C12] border border-[#C9A84C33] rounded-lg p-3">
        <p className="font-mono text-[10px] tracking-[0.15em] text-gold uppercase mb-1">KEY FACT</p>
        <p className="font-serif text-xs text-text leading-[1.6]">{faction.keyFact}</p>
      </div>

      {/* Oracle button */}
      <div className="pt-2">
        <OracleButton
          preload={`Tell me about ${faction.name} (${faction.code}). What is their strategy, who are their key allies and opponents, and what is their most likely outcome by 2028?`}
          label={`◎ Ask Oracle about ${faction.name}`}
          className="!text-[11px]"
        />
      </div>
    </div>
  );
}
