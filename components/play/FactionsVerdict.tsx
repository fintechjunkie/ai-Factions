'use client';

import { useState } from 'react';
import { SimulationResult, PlayerResponse } from '@/lib/types';
import { EVENTS } from '@/lib/data/events';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';

const SCENARIO_META: Record<string, { icon: string; color: string; name: string }> = {
  gold: { icon: '🚀', color: '#FBBF24', name: 'The Gold Rush' },
  backlash: { icon: '🔥', color: '#F43F5E', name: 'The Backlash' },
  stalemate: { icon: '⚖️', color: '#14B8A6', name: 'The Stalemate' },
};

function outcomeColor(o: string): string {
  const map: Record<string, string> = {
    Win: '#4ADE80',
    'Partial Win': '#34D399',
    Draw: '#4A5570',
    'Partial Loss': '#F87171',
    Loss: '#EF4444',
  };
  return map[o] || '#4A5570';
}

interface FactionsVerdictProps {
  result: SimulationResult;
  responses: (PlayerResponse | null)[];
  chosenId: string;
  onReplay: () => void;
  onBack: () => void;
}

export default function FactionsVerdict({ result, responses, chosenId, onReplay, onBack }: FactionsVerdictProps) {
  const [copied, setCopied] = useState(false);
  const probs = result.probabilities || { gold: 35, backlash: 25, stalemate: 40 };
  const dom = result.dominantScenario;
  const domMeta = SCENARIO_META[dom];
  const grp = GROUPS.find((g) => g.id === chosenId) || GROUPS[0];

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
    lines.push(
      `Dominant Scenario: ${scenarioName} (Gold Rush ${probs.gold}% | Backlash ${probs.backlash}% | Stalemate ${probs.stalemate}%)`,
      ''
    );
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

    async function tryClipboard() {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(txt);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
          return;
        }
      } catch { /* fallback */ }
      fallback();
    }

    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        alert('Copy failed — please select all text and copy manually.');
      }
      document.body.removeChild(ta);
    }

    tryClipboard();
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-5 py-10">
      <div className="w-full max-w-[680px] animate-[fadeIn_0.4s_ease_forwards]">
        <div className="text-center mb-7">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
            THE POLITICAL VERDICT
          </p>
          <h2 className="font-serif text-[26px] font-normal text-text mb-4.5">
            Who won and who lost
          </h2>

          {/* Scenario probability cards */}
          <div className="flex gap-2 justify-center mb-2.5">
            {(['gold', 'backlash', 'stalemate'] as const).map((k) => {
              const m = SCENARIO_META[k];
              return (
                <div
                  key={k}
                  className="rounded-lg px-3.5 py-2 text-center min-w-[95px]"
                  style={{
                    background: dom === k ? `${m.color}22` : '#111820',
                    border: `1px solid ${dom === k ? m.color : '#1A2535'}`,
                  }}
                >
                  <div className="text-[15px] mb-0.5">{m.icon}</div>
                  <div className="font-mono font-bold text-sm" style={{ color: m.color }}>
                    {probs[k]}%
                  </div>
                  <div className="font-mono text-[9px] text-muted tracking-[0.1em] mt-0.5">
                    {k.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="font-serif text-[13px] text-body">
            Dominant: <span style={{ color: domMeta.color }}>{domMeta.name}</span>
          </p>
        </div>

        {/* Factions list */}
        <div className="mb-7">
          {(result.factions || []).map((f) => {
            const oc = outcomeColor(f.outcome);
            return (
              <div key={f.code} className="flex items-start gap-3 py-2.5 border-b border-border">
                <span className="font-mono font-bold text-[11px] text-muted min-w-[26px]">{f.code}</span>
                <div className="flex-1">
                  <p className="font-mono font-bold text-[11px] text-body mb-0.5">{f.name}</p>
                  <p className="font-serif text-xs text-muted leading-[1.5] m-0">{f.reason}</p>
                </div>
                <span
                  className="font-mono text-[9px] font-bold tracking-[0.08em] rounded px-1.5 py-0.5 whitespace-nowrap"
                  style={{
                    background: `${oc}22`,
                    color: oc,
                    border: `1px solid ${oc}44`,
                  }}
                >
                  {f.outcome ? f.outcome.toUpperCase() : '—'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Key insight */}
        <div className="bg-card border border-border rounded-xl px-6 py-5 mb-7">
          <p className="font-mono text-[10px] tracking-[0.15em] text-gold mb-1.5">
            YOUR WORLD IN ONE SENTENCE
          </p>
          <p className="font-serif text-[15px] text-text leading-[1.8] m-0">{result.keyInsight}</p>
        </div>

        {/* Save & copy */}
        <div className="bg-raised border border-border rounded-xl px-6 py-4.5 mb-7">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted mb-2.5">SAVE YOUR RESULTS</p>
          <p className="font-serif text-[13px] text-body mb-3.5 leading-[1.6]">
            Copy a complete report of your 9 predictions, all group outcomes, and faction verdicts to paste or share anywhere.
          </p>
          <div className="flex gap-2.5 items-center">
            <Btn label={copied ? '✓ COPIED!' : 'COPY FULL REPORT'} onClick={doCopy} />
            {copied && <span className="font-mono text-[11px] text-green">Report copied to clipboard</span>}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <BackButton onClick={onBack} />
          <Btn label="PLAY AGAIN" onClick={onReplay} secondary />
        </div>
      </div>
    </div>
  );
}
