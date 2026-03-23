'use client';

import { useState } from 'react';
import { SimulationResult, PlayerResponse } from '@/lib/types';
import { EVENTS } from '@/lib/data/events';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import { FACTION_ICONS, OUTCOME_ICONS } from '@/lib/icons';
import { useApp } from '@/lib/context';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';

const SCENARIO_META: Record<string, { icon: string; color: string; name: string; glyph: string }> = {
  gold: { icon: '🚀', color: '#FBBF24', name: 'The Gold Rush', glyph: '◈' },
  backlash: { icon: '🔥', color: '#F43F5E', name: 'The Backlash', glyph: '◉' },
  stalemate: { icon: '⚖️', color: '#14B8A6', name: 'The Stalemate', glyph: '◎' },
};

interface FactionsVerdictProps {
  result: SimulationResult;
  responses: (PlayerResponse | null)[];
  chosenId: string;
  onReplay: () => void;
  onBack: () => void;
}

export default function FactionsVerdict({ result, responses, chosenId, onReplay, onBack }: FactionsVerdictProps) {
  const [copied, setCopied] = useState(false);
  const { openOracle } = useApp();
  const probs = result.probabilities || { gold: 35, backlash: 25, stalemate: 40 };
  const dom = result.dominantScenario;
  const domMeta = SCENARIO_META[dom];
  const grp = GROUPS.find((g) => g.id === chosenId) || GROUPS[0];

  // Count wins/losses
  const wins = (result.factions || []).filter(f => f.outcome === 'Win' || f.outcome === 'Partial Win').length;
  const losses = (result.factions || []).filter(f => f.outcome === 'Loss' || f.outcome === 'Partial Loss').length;

  function doCopy() {
    const lines = [
      'AI FACTIONS: THE SIMULATION',
      `Played: ${new Date().toLocaleDateString()}`,
      `Your Group: ${grp.name}`,
      '',
      '=== YOUR 9 PREDICTIONS ===',
      '',
    ];
    EVENTS.forEach((ev, i) => {
      const r = responses[i];
      const cobj = r ? ev.choices.find((c) => c.v === r.choice) : null;
      lines.push(`${i + 1}. ${ev.title}`);
      lines.push(`   Call: ${cobj ? `${cobj.label}: ${cobj.desc}` : '—'}`);
      if (r?.text) lines.push(`   View: ${r.text}`);
      lines.push('');
    });
    const scenarioName = SCENARIO_META[dom]?.name || dom;
    lines.push('=== THE WORLD ON JANUARY 1, 2028 ===', '');
    lines.push(`Dominant Scenario: ${scenarioName} (Gold Rush ${probs.gold}% | Backlash ${probs.backlash}% | Stalemate ${probs.stalemate}%)`, '');
    (result.stateOfUnion || []).forEach((p) => { lines.push(p); lines.push(''); });
    lines.push(`Key Insight: ${result.keyInsight}`, '');
    lines.push(`=== YOUR OUTCOME: ${grp.name.toUpperCase()} ===`, '');
    const gd = (result.groups || []).find((g) => g.id === chosenId) || { score: 50 };
    lines.push(result.chosenGroupNarrative || '');
    const base = BASE_SCORES[chosenId] || 50;
    const delta = gd.score - base;
    lines.push(`Score: ${base} today → ${gd.score} in 2028 (${delta >= 0 ? '+' : ''}${delta} pts)`, '');
    lines.push('=== ALL 14 GROUPS ===', '');
    const sorted = [...(result.groups || [])].sort((a, b) => b.score - a.score);
    sorted.forEach((g) => {
      const grpd = GROUPS.find((x) => x.id === g.id);
      const b = BASE_SCORES[g.id] || 50;
      const d = g.score - b;
      lines.push(`${grpd ? grpd.name : g.id}: ${b} → ${g.score} (${d >= 0 ? '+' : ''}${d})`);
    });
    lines.push('', '=== FACTION VERDICTS ===', '');
    (result.factions || []).forEach((f) => {
      lines.push(`${f.code} ${f.name}: ${f.outcome} — ${f.reason}`);
    });
    const txt = lines.join('\n');
    navigator.clipboard?.writeText(txt).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-start px-5 py-8">
      <div className="w-full max-w-[900px] animate-[fadeIn_0.4s_ease_forwards]">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold/50 uppercase mb-2">
            SIMULATION COMPLETE — POLITICAL VERDICT
          </p>
          <h2 className="font-serif text-3xl font-normal text-text mb-4">
            Who won and who lost
          </h2>

          {/* Dominant scenario — big display */}
          <div className="cyber-frame inline-block px-8 py-4 mb-4">
            <div className="flex items-center gap-4 justify-center">
              <span className="text-3xl">{domMeta.icon}</span>
              <div>
                <p className="font-mono text-[10px] text-muted tracking-[0.15em]">DOMINANT SCENARIO</p>
                <p className="font-mono text-xl font-bold" style={{ color: domMeta.color }}>
                  {domMeta.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Three scenario probability bars */}
        <div className="flex gap-3 mb-6">
          {(['gold', 'backlash', 'stalemate'] as const).map((k) => {
            const m = SCENARIO_META[k];
            const isDom = dom === k;
            return (
              <div
                key={k}
                className="flex-1 rounded-xl px-4 py-3 text-center transition-all"
                style={{
                  background: isDom ? `${m.color}15` : '#111820',
                  border: `2px solid ${isDom ? m.color : '#1A2535'}`,
                  boxShadow: isDom ? `0 0 20px ${m.color}22` : 'none',
                }}
              >
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="font-mono font-bold text-2xl mb-1" style={{ color: m.color }}>
                  {probs[k]}%
                </div>
                <div className="font-mono text-[10px] tracking-[0.08em]" style={{ color: isDom ? m.color : '#9A9080' }}>
                  {m.name.toUpperCase()}
                </div>
                <div className="h-1.5 bg-raised rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${probs[k]}%`, background: m.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Faction grid — visual cards */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {(result.factions || []).map((f) => {
            const oi = OUTCOME_ICONS[f.outcome] || OUTCOME_ICONS['Draw'];
            const fi = FACTION_ICONS[f.code.toLowerCase()] || { emoji: '◆' };
            const isWin = f.outcome === 'Win' || f.outcome === 'Partial Win';
            const isLoss = f.outcome === 'Loss' || f.outcome === 'Partial Loss';

            return (
              <div
                key={f.code}
                className="cyber-frame px-4 py-3 flex items-start gap-3"
                style={{
                  borderColor: `${oi.color}33`,
                  boxShadow: (isWin || isLoss) ? `0 0 12px ${oi.color}11` : 'none',
                }}
              >
                {/* Faction icon */}
                <span
                  className="game-icon-sm flex items-center justify-center"
                  style={{ background: `linear-gradient(180deg, ${oi.color}18, ${oi.color}06)`, borderColor: `${oi.color}33` }}
                >
                  {fi.emoji}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-muted mr-2">{f.code}</span>
                      <span className="font-mono text-[11px] font-bold text-text">{f.name}</span>
                    </div>
                    {/* Outcome badge */}
                    <span
                      className={`font-mono text-[10px] font-bold tracking-[0.08em] rounded px-2 py-0.5 ${
                        isWin ? 'outcome-win' : isLoss ? 'outcome-loss' : ''
                      }`}
                      style={{
                        background: `${oi.color}18`,
                        color: oi.color,
                        border: `1px solid ${oi.color}44`,
                      }}
                    >
                      {oi.emoji} {f.outcome.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-body leading-[1.4]">{f.reason}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key insight */}
        <div className="cyber-frame border-flow px-6 py-5 mb-6">
          <p className="font-mono text-[10px] tracking-[0.15em] text-gold mb-2">
            ◈ YOUR WORLD IN ONE SENTENCE
          </p>
          <p className="font-serif text-lg text-text leading-[1.7]">{result.keyInsight}</p>
        </div>

        {/* Action bar */}
        <div className="flex gap-3 items-center justify-between bg-surf border border-border rounded-xl px-5 py-4">
          <div className="flex gap-2">
            <BackButton onClick={onBack} />
            <Btn label="↺ PLAY AGAIN" onClick={onReplay} secondary />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => openOracle()}
              className="font-mono text-[10px] font-bold tracking-[0.1em] text-gold border border-gold/30 rounded px-4 py-2.5 hover:border-gold hover:bg-gold/10 transition-colors cursor-pointer"
            >
              ◎ ASK ORACLE ABOUT MY WORLD
            </button>
            <Btn
              label={copied ? '✓ COPIED' : '⎘ COPY REPORT'}
              onClick={doCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
