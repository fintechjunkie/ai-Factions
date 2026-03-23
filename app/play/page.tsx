'use client';

import { useState, useRef, useEffect } from 'react';
import { SimulationResult, PlayerResponse } from '@/lib/types';
import { EVENTS } from '@/lib/data/events';
import { FACTIONS } from '@/lib/data/factions';
import { GROUPS, BASE_SCORES } from '@/lib/data/groups';
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
        <div className="w-full max-w-[680px] animate-[fadeIn_0.4s_ease_forwards]">
          <div className="cyber-frame scanlines px-10 py-10">
            <p className="font-mono text-[11px] tracking-[0.2em] text-gold/60 uppercase text-center mb-6">
              MARCH 2026 — SIMULATION TERMINAL
            </p>
            <h1 className="font-serif text-4xl font-normal text-text text-center leading-[1.25] mb-9">
              The world is mid-transformation.
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-6" />
            <p className="font-serif text-base leading-[1.85] text-body mb-4">
              Artificial intelligence has moved from science fiction to the infrastructure of daily life in less than four years. The productivity gains are real. They are flowing almost entirely to the people who own the technology.
            </p>
            <p className="font-serif text-base leading-[1.85] text-body mb-4">
              Ten factions are fighting to shape what comes next. Tech billionaires, labor unions, European regulators, military officials, artists — each with their own vision for the future.
            </p>
            <p className="font-serif text-base leading-[1.85] text-text mb-0">
              Nine events over the next two years will determine what kind of world exists on January 1, 2028. You will predict each one. The simulation will build the world your predictions produce.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-6" />
            <div className="text-center">
              <Btn label="BEGIN →" onClick={() => goTo('choose_group')} />
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
              return (
                <div
                  key={g.id}
                  onClick={() => setChosenId(g.id)}
                  className="rounded-lg px-3.5 py-3 cursor-pointer transition-all duration-150"
                  style={{
                    background: active ? `${g.color}15` : '#111820',
                    border: `1px solid ${active ? g.color : '#1A2535'}`,
                  }}
                >
                  <p className="font-mono font-bold text-[11px] mb-1" style={{ color: g.color }}>
                    {g.name}
                  </p>
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
    return (
      <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-start px-5 py-10">
        <div className="w-full max-w-[720px] animate-[fadeIn_0.4s_ease_forwards]">
          {/* Progress bar — top level */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="font-mono text-[11px] text-gold/80 whitespace-nowrap">
              {evIdx + 1} / {EVENTS.length}
            </span>
            <div className="flex-1 flex gap-1">
              {EVENTS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 rounded-sm transition-all duration-300"
                  style={{
                    background: i <= evIdx ? '#C9A84C' : '#161E2C',
                    boxShadow: i === evIdx ? '0 0 6px rgba(201,168,76,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main frame */}
          <div className="cyber-frame scanlines px-8 py-7 mb-6">
            {/* Title bar */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gold/10">
              <span className="text-2xl">{ev.icon}</span>
              <div className="flex-1">
                <p className="font-mono text-[13px] tracking-[0.15em] text-gold font-bold">
                  {ev.title.toUpperCase()}
                </p>
                <p className="font-mono text-[9px] text-muted tracking-[0.1em] mt-0.5">
                  EVENT {evIdx + 1} — SCENARIO ANALYSIS 2026-2027
                </p>
              </div>
              {ev.relatedTriggerIds[0] && (
                <WorldPanelButton
                  context={{ type: 'trigger', id: ev.relatedTriggerIds[0] }}
                  label="◎ DEEP ANALYSIS"
                  className="text-[9px] border border-gold/20 rounded px-2 py-1 hover:border-gold/50"
                />
              )}
            </div>

            {/* Context paragraphs */}
            <div className="mb-5">
              {ev.body.map((p, i) => (
                <p key={i} className="font-serif text-[15px] text-body leading-[1.85] mb-3">
                  {p}
                </p>
              ))}
            </div>

            {/* Related factions */}
            {ev.relatedFactionIds.length > 0 && (
              <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-border">
                <span className="font-mono text-[9px] text-muted tracking-[0.1em]">FACTIONS INVOLVED:</span>
                {ev.relatedFactionIds.map((fid) => {
                  const f = FACTIONS.find((x) => x.id === fid);
                  if (!f) return null;
                  return (
                    <WorldPanelButton
                      key={fid}
                      context={{ type: 'faction', id: fid }}
                      label={f.code}
                      className="!text-[9px] bg-raised rounded px-2 py-0.5 border border-border hover:border-gold/40"
                    />
                  );
                })}
              </div>
            )}

            {/* Choice question */}
            <p className="font-serif text-lg font-normal text-text mb-4">{ev.choiceQ}</p>

            {/* Choices */}
            <div className="mb-5">
              {ev.choices.map((c) => (
                <ChoiceButton
                  key={c.v}
                  choice={c}
                  selected={choice === c.v}
                  onClick={() => setChoice(c.v)}
                />
              ))}
            </div>

            {/* Text elaboration */}
            <div className="bg-raised/50 rounded-lg p-4 border border-border">
              <p className="font-mono text-[10px] text-gold tracking-[0.12em] mb-2">
                TELL US MORE — OPTIONAL
              </p>
              <p className="font-serif text-sm text-body mb-2.5">{ev.textQ}</p>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) nextEvent();
                }}
                placeholder="Add nuance, context, or specifics..."
                className="bg-card border border-border rounded-lg text-text font-serif text-sm leading-[1.75] p-3 resize-y w-full min-h-[80px]"
              />
              <p className="font-mono text-[9px] text-muted mt-1.5">Ctrl/Cmd + Enter to continue</p>
            </div>
          </div>

          {/* Nav — outside the frame */}
          <div className="flex justify-between items-center">
            <BackButton onClick={prevEvent} />
            <Btn
              label={evIdx < EVENTS.length - 1 ? 'NEXT EVENT →' : 'BUILD MY WORLD →'}
              onClick={nextEvent}
              disabled={!choice}
            />
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
