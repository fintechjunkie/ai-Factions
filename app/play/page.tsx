'use client';

import { useState, useRef, useEffect } from 'react';
import { SimulationResult, PlayerResponse } from '@/lib/types';
import { useApp } from '@/lib/context';
import { EVENTS } from '@/lib/data/events';
import { FACTIONS } from '@/lib/data/factions';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
import { GROUP_ICONS, EVENT_ICONS } from '@/lib/icons';
import { scoreColor } from '@/components/shared/ScoreBar';
import Btn from '@/components/shared/Btn';
import BackButton from '@/components/shared/BackButton';
import WorldPanelButton from '@/components/shared/WorldPanelButton';
import OracleButton from '@/components/shared/OracleButton';
import ChoiceButton from '@/components/play/ChoiceButton';
import ProcessingScreen from '@/components/play/ProcessingScreen';
import UnionScreen from '@/components/play/UnionScreen';
import GroupReveal from '@/components/play/GroupReveal';
import AllGroupsGrid from '@/components/play/AllGroupsGrid';
import FactionsVerdict from '@/components/play/FactionsVerdict';
import IntroScreen from '@/components/play/IntroScreen';

type Phase =
  | 'intro'
  | 'choose_group'
  | 'choose_year'
  | 'events'
  | 'processing'
  | 'error'
  | 'reveal_union'
  | 'reveal_group'
  | 'reveal_all'
  | 'reveal_factions';

const YEAR_OPTIONS = [2028, 2030, 2033, 2036, 2040];

export default function PlayPage() {
  const { setGameContext } = useApp();
  const [phase, setPhase] = useState<Phase>('intro');
  const [history, setHistory] = useState<Phase[]>([]);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [targetYear, setTargetYear] = useState<number>(2028);
  const [responses, setResponses] = useState<(PlayerResponse | null)[]>(
    Array(EVENTS.length).fill(null)
  );
  const [evIdx, setEvIdx] = useState(0);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Event screen local state
  const [choice, setChoice] = useState<string | null>(null);
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync local state when event index changes + scroll to top
  useEffect(() => {
    const saved = responses[evIdx];
    setChoice(saved?.choice ?? null);
    setText(saved?.text ?? '');
    window.scrollTo(0, 0);
  }, [evIdx, responses]);

  // Scroll to top on phase changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  function goTo(next: Phase) {
    setHistory((h) => [...h, phase]);
    setPhase(next);
  }

  function goBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setPhase(prev);
  }

  function answer(idx: number, data: PlayerResponse) {
    setResponses((prev) => {
      const n = [...prev];
      n[idx] = data;
      return n;
    });
  }

  function nextEvent() {
    if (!choice) return;
    const updatedResponses = [...responses];
    updatedResponses[evIdx] = { choice, text };
    setResponses(updatedResponses);
    if (evIdx < EVENTS.length - 1) {
      setEvIdx((i) => i + 1);
    } else {
      setPhase('processing');
      simulate(updatedResponses);
    }
  }

  function prevEvent() {
    if (choice) {
      answer(evIdx, { choice, text });
    }
    if (evIdx > 0) {
      setEvIdx((i) => i - 1);
    } else {
      goBack();
    }
  }

  async function simulate(finalResponses?: (PlayerResponse | null)[]) {
    setError(null);
    const grp = GROUPS.find((g) => g.id === chosenId) || GROUPS[0];
    const responsesToSend = finalResponses || responses;

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: chosenId,
          groupName: grp.name,
          groupDesc: grp.desc,
          targetYear,
          responses: responsesToSend,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResult(data);
      setHistory([]);
      setPhase('reveal_union');
      // Set game context for Oracle
      const scenarioNames: Record<string, string> = { gold: 'Gold Rush', backlash: 'Backlash', stalemate: 'Stalemate' };
      setGameContext(
        `Dominant scenario: ${scenarioNames[data.dominantScenario] || data.dominantScenario}. ` +
        `Target year: January 1, ${targetYear}. ` +
        `Probabilities: Gold ${data.probabilities?.gold}%, Backlash ${data.probabilities?.backlash}%, Stalemate ${data.probabilities?.stalemate}%. ` +
        `Key insight: ${data.keyInsight}. ` +
        `Player chose group: ${grp.name}.`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Simulation failed.');
      setPhase('error');
    }
  }

  function replay() {
    setPhase('intro');
    setHistory([]);
    setChosenId(null);
    setTargetYear(2028);
    setResponses(Array(EVENTS.length).fill(null));
    setEvIdx(0);
    setResult(null);
    setError(null);
  }

  // ── INTRO ──
  if (phase === 'intro') {
    return <IntroScreen onNext={() => goTo('choose_group')} />;
  }

  // ── CHOOSE GROUP ──
  if (phase === 'choose_group') {
    const selectedGrp = GROUPS.find((g) => g.id === chosenId);
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-5 py-10">
        <div className="w-full max-w-[900px] animate-[fadeIn_0.4s_ease_forwards]">
          <div className="text-center mb-7">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
              BEFORE WE BEGIN
            </p>
            <h2 className="font-serif text-[28px] font-normal text-text mb-2.5">
              Who are you in this story?
            </h2>
            <p className="font-serif text-sm text-body max-w-[500px] mx-auto">
              Pick the group you identify with or care most about. Your outcome will be revealed first.
              Scores show how each group is faring in society today (1-100).
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 mb-6">
            {GROUPS.map((g) => {
              const active = chosenId === g.id;
              const base = BASE_SCORES[g.id];
              const bcolor = scoreColor(base);
              const icon = GROUP_ICONS[g.id];
              return (
                <div
                  key={g.id}
                  onClick={() => setChosenId(g.id)}
                  className="rounded-lg px-3.5 py-3 cursor-pointer transition-all duration-150"
                  style={{
                    background: active ? `${g.color}15` : '#111820',
                    border: `1px solid ${active ? g.color : '#1A2535'}`,
                    boxShadow: active ? `0 0 12px ${g.color}22` : 'none',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className="game-icon-sm flex items-center justify-center"
                      style={{ background: `linear-gradient(180deg, ${g.color}20, ${g.color}08)`, borderColor: `${g.color}44` }}
                    >
                      {icon?.emoji}
                    </span>
                    <p className="font-mono font-bold text-[11px]" style={{ color: g.color }}>
                      {g.name}
                    </p>
                  </div>
                  <p className="text-[11px] text-muted leading-[1.4] mb-2">{g.desc}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1 bg-raised rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm"
                        style={{ width: `${base}%`, background: bcolor }}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold min-w-[20px]" style={{ color: bcolor }}>
                      {base}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {chosenId && selectedGrp && (
            <div
              className="rounded-xl px-5 py-3.5 mb-5 text-center"
              style={{
                background: '#111820',
                border: `1px solid ${selectedGrp.color}44`,
              }}
            >
              <p className="font-serif text-sm text-text m-0">
                You are a <strong style={{ color: selectedGrp.color }}>{selectedGrp.name}</strong>.
                <span className="text-body"> {selectedGrp.desc}.</span>
                <span className="text-muted font-mono text-[11px]"> Today&apos;s score: {BASE_SCORES[chosenId]}/100</span>
              </p>
            </div>
          )}

          <div className="text-center">
            <Btn
              label={chosenId ? 'CONTINUE →' : 'SELECT YOUR GROUP TO CONTINUE'}
              onClick={() => { if (chosenId) goTo('choose_year'); }}
              disabled={!chosenId}
            />
          </div>
        </div>
      </div>
    );
  }

  // ── CHOOSE YEAR ──
  if (phase === 'choose_year') {
    const yearDescriptions: Record<number, string> = {
      2028: 'Near-term. The immediate ripple effects of your predictions. Early winners and losers become clear.',
      2030: 'Mid-range. Policies take hold, markets adjust, and second-order effects emerge. Some groups adapt; others don\'t.',
      2033: 'One cycle out. A full economic cycle lets compounding effects play out. Structural changes become visible.',
      2036: 'Long-range. A decade of AI reshapes institutions, education, and the labor market from the ground up.',
      2040: 'Deep future. The full arc of transformation. Some groups have rebuilt entirely; others have been left behind.',
    };

    return (
      <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-[640px] animate-[fadeIn_0.4s_ease_forwards]">
          <div className="cyber-frame scanlines px-8 py-8">
            {/* Terminal header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[9px] tracking-[0.15em] text-gold/30">
                TEMPORAL_CALIBRATION
              </span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3 text-center">
              SET YOUR TIME HORIZON
            </p>
            <h2 className="font-serif text-[28px] font-normal text-text mb-3 text-center gold-glow">
              How far into the future?
            </h2>
            <p className="font-serif text-sm text-body text-center mb-8 max-w-[440px] mx-auto">
              Your 9 predictions start from March 2026. Choose when to measure the consequences.
              Longer horizons amplify both gains and losses.
            </p>

            {/* Year options */}
            <div className="space-y-2 mb-8">
              {YEAR_OPTIONS.map((year) => {
                const active = targetYear === year;
                const yearsOut = year - 2026;
                return (
                  <button
                    key={year}
                    onClick={() => setTargetYear(year)}
                    className={`w-full text-left rounded-xl px-5 py-4 border transition-all duration-200 cursor-pointer ${active ? 'active' : ''}`}
                    style={{
                      background: active ? '#C9A84C12' : '#0a0e14',
                      borderColor: active ? '#C9A84C' : '#1A2535',
                      boxShadow: active ? '0 0 16px rgba(201, 168, 76, 0.15)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-2xl font-bold min-w-[60px]"
                        style={{ color: active ? '#C9A84C' : '#4A5570' }}
                      >
                        {year}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[10px] text-muted tracking-[0.1em]">
                            {yearsOut} {yearsOut === 1 ? 'YEAR' : 'YEARS'} OUT
                          </span>
                          {year === 2028 && (
                            <span className="font-mono text-[8px] text-gold/50 bg-gold/10 rounded px-1.5 py-0.5">
                              DEFAULT
                            </span>
                          )}
                          {year >= 2036 && (
                            <span className="font-mono text-[8px] text-red/50 bg-red/10 rounded px-1.5 py-0.5">
                              HIGH VARIANCE
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-xs text-body leading-[1.5] m-0">
                          {yearDescriptions[year]}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <BackButton onClick={goBack} />
              <Btn label="BEGIN EVENTS →" onClick={() => goTo('events')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── EVENTS ──
  if (phase === 'events') {
    const ev = EVENTS[evIdx];
    const evIcon = EVENT_ICONS[ev.id];
    return (
      <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-start px-5 py-6">
        <div className="w-full max-w-[960px] animate-[fadeIn_0.3s_ease_forwards]">
          {/* Progress bar */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-mono text-[11px] text-gold/80 whitespace-nowrap">
              {evIdx + 1} / {EVENTS.length}
            </span>
            <div className="flex-1 flex gap-1">
              {EVENTS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5 rounded-sm transition-all duration-300"
                  style={{
                    background: i <= evIdx ? '#C9A84C' : '#161E2C',
                    boxShadow: i === evIdx ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Two-column layout */}
          <div className="flex gap-4">
            {/* LEFT: Context (briefing) */}
            <div className="w-[340px] flex-shrink-0">
              <div className="cyber-frame px-5 py-4 h-full">
                {/* Title */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gold/10">
                  <span
                    className="game-icon flex items-center justify-center"
                    style={{ background: 'linear-gradient(180deg, #C9A84C18, #C9A84C06)', borderColor: '#C9A84C33' }}
                  >
                    {evIcon?.emoji || ev.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.15em] text-gold font-bold">
                      {ev.title.toUpperCase()}
                    </p>
                    <p className="font-mono text-[8px] text-muted tracking-[0.1em]">
                      EVENT {evIdx + 1} — INTEL BRIEFING
                    </p>
                  </div>
                </div>

                {/* Context */}
                {ev.body.map((p, i) => (
                  <p key={i} className="font-serif text-[13px] text-body leading-[1.7] mb-2.5">
                    {p}
                  </p>
                ))}

                {/* Related factions */}
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border flex-wrap">
                  <span className="font-mono text-[8px] text-muted tracking-[0.1em] mr-1">FACTIONS:</span>
                  {ev.relatedFactionIds.map((fid) => {
                    const f = FACTIONS.find((x) => x.id === fid);
                    if (!f) return null;
                    return (
                      <WorldPanelButton
                        key={fid}
                        context={{ type: 'faction', id: fid }}
                        label={f.code}
                        className="!text-[8px] bg-raised rounded px-1.5 py-0.5 border border-border hover:border-gold/40"
                      />
                    );
                  })}
                  {ev.relatedTriggerIds[0] && (
                    <WorldPanelButton
                      context={{ type: 'trigger', id: ev.relatedTriggerIds[0] }}
                      label="◎ ANALYSIS"
                      className="!text-[8px] ml-auto border border-gold/20 rounded px-1.5 py-0.5 hover:border-gold/50"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Decision panel */}
            <div className="flex-1 min-w-0">
              <div className="cyber-frame border-flow px-5 py-4">
                <p className="font-mono text-[9px] tracking-[0.15em] text-gold/50 uppercase mb-2">
                  YOUR PREDICTION
                </p>
                <p className="font-serif text-lg font-normal text-text mb-3">{ev.choiceQ}</p>

                {/* Choices — compact */}
                <div className="mb-4">
                  {ev.choices.map((c) => (
                    <ChoiceButton
                      key={c.v}
                      choice={c}
                      selected={choice === c.v}
                      onClick={() => setChoice(c.v)}
                    />
                  ))}
                </div>

                {/* Elaboration — compact */}
                <div className="bg-[#0a0e14] rounded-lg p-3 border border-[#1A253544]">
                  <p className="font-mono text-[9px] text-gold/60 tracking-[0.12em] mb-1.5">
                    ELABORATE — OPTIONAL
                  </p>
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) nextEvent();
                    }}
                    placeholder={ev.textQ}
                    rows={2}
                    className="bg-transparent border-none text-text font-serif text-sm leading-[1.6] p-0 resize-none w-full outline-none placeholder:text-[#4A557066]"
                  />
                </div>

                {/* Nav — inside the decision panel */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                  <BackButton onClick={prevEvent} />
                  <Btn
                    label={evIdx < EVENTS.length - 1 ? 'NEXT EVENT →' : '▶ BUILD MY WORLD'}
                    onClick={nextEvent}
                    disabled={!choice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── PROCESSING ──
  if (phase === 'processing') {
    return <ProcessingScreen targetYear={targetYear} />;
  }

  // ── ERROR ──
  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-5">
        <div className="text-center animate-[fadeIn_0.4s_ease_forwards]">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-3.5">
            SOMETHING WENT WRONG
          </p>
          <h2 className="font-serif text-[22px] font-normal text-text mb-3.5">
            The simulation failed
          </h2>
          <p className="font-serif text-sm text-body mb-7 leading-[1.7] max-w-[400px] mx-auto">
            {error || 'Please try again.'}
          </p>
          <Btn
            label="TRY AGAIN →"
            onClick={() => {
              setPhase('processing');
              simulate();
            }}
          />
        </div>
      </div>
    );
  }

  // ── REVEAL: UNION ──
  if (phase === 'reveal_union' && result) {
    return <UnionScreen result={result} onNext={() => goTo('reveal_group')} />;
  }

  // ── REVEAL: GROUP ──
  if (phase === 'reveal_group' && result && chosenId) {
    return (
      <GroupReveal
        result={result}
        chosenId={chosenId}
        onNext={() => goTo('reveal_all')}
        onBack={goBack}
      />
    );
  }

  // ── REVEAL: ALL GROUPS ──
  if (phase === 'reveal_all' && result && chosenId) {
    return (
      <AllGroupsGrid
        result={result}
        chosenId={chosenId}
        onNext={() => goTo('reveal_factions')}
        onBack={goBack}
      />
    );
  }

  // ── REVEAL: FACTIONS ──
  if (phase === 'reveal_factions' && result && chosenId) {
    return (
      <FactionsVerdict
        result={result}
        responses={responses}
        chosenId={chosenId}
        onReplay={replay}
        onBack={goBack}
      />
    );
  }

  return null;
}
