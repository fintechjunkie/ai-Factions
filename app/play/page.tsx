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

type Phase =
  | 'intro'
  | 'choose_group'
  | 'events'
  | 'processing'
  | 'error'
  | 'reveal_union'
  | 'reveal_group'
  | 'reveal_all'
  | 'reveal_factions';

export default function PlayPage() {
  const { setGameContext } = useApp();
  const [phase, setPhase] = useState<Phase>('intro');
  const [history, setHistory] = useState<Phase[]>([]);
  const [chosenId, setChosenId] = useState<string | null>(null);
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
    setResponses(Array(EVENTS.length).fill(null));
    setEvIdx(0);
    setResult(null);
    setError(null);
  }

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-[720px]">
          <div className="cyber-frame border-flow scanlines px-10 py-10">
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gold/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-gold/40 ml-2">
                AI_FACTIONS://SIMULATION_TERMINAL
              </span>
            </div>

            {/* Typewriter content */}
            <div className="space-y-0">
              <p className="type-line font-mono text-[11px] tracking-[0.2em] text-gold/60 uppercase text-center mb-2">
                &gt; INITIALIZING... MARCH 2026
              </p>
              <h1 className="type-line font-serif text-4xl font-normal text-text text-center leading-[1.25] mb-6">
                The world is mid-transformation.
              </h1>
              <div className="type-line h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-5" />
              <p className="type-line font-serif text-[15px] leading-[1.85] text-body mb-4">
                &gt; Artificial intelligence has moved from science fiction to the infrastructure of daily life in less than four years. The productivity gains are real. They are flowing almost entirely to the people who own the technology.
              </p>
              <p className="type-line font-serif text-[15px] leading-[1.85] text-body mb-4">
                &gt; Ten factions are fighting to shape what comes next. Tech billionaires, labor unions, European regulators, military officials, artists — each with their own vision for the future.
              </p>
              <p className="type-line font-serif text-[15px] leading-[1.85] text-text mb-0 cursor-blink">
                &gt; Nine events will determine what kind of world exists on January 1, 2028. You will predict each one. The simulation will build the world your predictions produce.
              </p>
              <div className="type-line h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-5" />
            </div>

            <div className="text-center animate-[fadeIn_0.5s_5.5s_ease_forwards] opacity-0">
              <Btn label="▶ INITIALIZE SIMULATION" onClick={() => goTo('choose_group')} />
            </div>
          </div>
        </div>
      </div>
    );
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
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="faction-icon-sm flex items-center justify-center text-sm"
                      style={{ background: `${g.color}15`, borderColor: `${g.color}33` }}
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
              onClick={() => { if (chosenId) goTo('events'); }}
              disabled={!chosenId}
            />
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
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gold/10">
                  <span
                    className="faction-icon flex items-center justify-center text-xl"
                    style={{ background: '#C9A84C12', borderColor: '#C9A84C33' }}
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
    return <ProcessingScreen />;
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
