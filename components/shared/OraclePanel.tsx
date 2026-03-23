'use client';

import { useState, useRef, useEffect } from 'react';

interface OracleMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'Which faction is most likely to win by 2028?',
  'How does the F5 swing vote change the game?',
  'What happens if China reaches AI parity?',
  'Why is the F2-F10 alliance so durable?',
  'Which group is most at risk right now?',
];

const GAME_QUESTIONS = [
  'Why did this scenario dominate?',
  'Which of my predictions had the biggest impact?',
  'What would have changed if I predicted differently on jobs?',
  'Who are the real winners in my world?',
  'What happens next after January 2028?',
];

interface OraclePanelProps {
  isOpen: boolean;
  onClose: () => void;
  preload?: string;
  gameContext?: string;
}

export default function OraclePanel({ isOpen, onClose, preload, gameContext }: OraclePanelProps) {
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && preload && messages.length === 0) {
      setInput(preload);
      inputRef.current?.focus();
    }
  }, [isOpen, preload, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const enrichedMsg = gameContext
      ? `[GAME CONTEXT: The player just completed a simulation. ${gameContext}]\n\nPlayer question: ${msg}`
      : msg;

    const userMsg: OracleMessage = { role: 'user', content: enrichedMsg };
    const displayMsg: OracleMessage = { role: 'user', content: text || input.trim() };
    const newMessages = [...messages, userMsg];
    const displayMessages = [...messages, displayMsg];
    setMessages(displayMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('Oracle request failed');

      const data = await res.json();
      setMessages([...displayMessages, { role: 'assistant', content: data.content || 'No response.' }]);
    } catch {
      setMessages([
        ...displayMessages,
        { role: 'assistant', content: '> ERROR: Connection lost. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const suggestedQs = gameContext ? GAME_QUESTIONS : SUGGESTED_QUESTIONS;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[480px] terminal z-50 flex flex-col animate-[slideIn_0.25s_ease-out_forwards]">
        {/* Terminal header */}
        <div className="terminal-header flex items-center justify-between px-5 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold text-gold tracking-[0.1em]">
                ◎ ORACLE_TERMINAL
              </p>
              <p className="font-mono text-[8px] text-gold/30 tracking-[0.08em]">
                {gameContext ? 'MODE: POST-GAME ANALYSIS' : 'MODE: SCENARIO INTELLIGENCE'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[10px] text-muted hover:text-gold border border-border hover:border-gold/40 rounded px-2 py-1 transition-colors cursor-pointer"
          >
            [ESC]
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {messages.length === 0 && !loading && (
            <div>
              <p className="font-mono text-[11px] text-gold/40 mb-1">&gt; ORACLE READY</p>
              <p className="font-serif text-sm text-body mb-4 leading-[1.6]">
                {gameContext
                  ? 'I have your simulation results. Ask me anything about the world your predictions created.'
                  : 'Full analytical context loaded: 10 factions, 3 scenarios, 14 groups, 9 triggers. Query me.'}
              </p>
              <p className="font-mono text-[9px] tracking-[0.1em] text-gold/30 uppercase mb-2">
                SUGGESTED QUERIES
              </p>
              <div className="space-y-1">
                {suggestedQs.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left font-mono text-[11px] text-body/80 bg-[#0d1117] border border-[#1A253544] rounded px-3 py-2 hover:border-gold/30 hover:text-gold transition-colors cursor-pointer"
                  >
                    &gt; {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-gold/50 mt-0.5 flex-shrink-0">&gt;</span>
                  <p className="font-mono text-sm text-gold leading-[1.5]">{msg.content}</p>
                </div>
              ) : (
                <div className="pl-4 border-l border-gold/10">
                  <p className="font-serif text-sm text-text/90 leading-[1.7] whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 pl-4">
              <span className="font-mono text-[10px] text-gold/40">PROCESSING</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gold/60"
                    style={{ animation: `dot 1.4s ${i * 0.22}s ease-in-out infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-[#C9A84C15] flex-shrink-0">
          <div className="flex gap-2 items-end">
            <span className="font-mono text-sm text-gold/40 mb-1.5">&gt;</span>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Query the Oracle..."
              rows={1}
              className="flex-1 terminal-input rounded px-3 py-2 text-gold font-mono text-sm leading-[1.5] resize-none"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className={`font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-2 rounded transition-colors ${
                !input.trim() || loading
                  ? 'bg-raised text-muted cursor-not-allowed'
                  : 'bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30 cursor-pointer'
              }`}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
