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
  'What happens next after my target year?',
];

interface OraclePanelProps {
  isOpen: boolean;
  onClose: () => void;
  preload?: string;
  gameContext?: string;
}

/** Format Oracle response into styled blocks */
function formatOracleResponse(text: string) {
  // Split into paragraphs
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  return paragraphs.map((para, i) => {
    // Check for headers (lines starting with ** or ##)
    const headerMatch = para.match(/^\*\*(.+?)\*\*$/);
    if (headerMatch) {
      return (
        <p key={i} className="font-mono text-[11px] tracking-[0.12em] text-gold uppercase mt-4 mb-1.5">
          ◈ {headerMatch[1]}
        </p>
      );
    }

    // Check for bullet points
    if (para.includes('\n- ') || para.startsWith('- ')) {
      const items = para.split(/\n/).filter(l => l.trim());
      return (
        <div key={i} className="space-y-1.5 my-2">
          {items.map((item, j) => {
            const clean = item.replace(/^[-•]\s*/, '');
            // Bold text in bullets
            const formatted = clean.replace(/\*\*(.+?)\*\*/g, '<strong class="text-gold/90">$1</strong>');
            return (
              <div key={j} className="flex gap-2 items-start">
                <span className="text-gold/40 font-mono text-[10px] mt-1 flex-shrink-0">▸</span>
                <p
                  className="font-serif text-[13px] text-text/85 leading-[1.65]"
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              </div>
            );
          })}
        </div>
      );
    }

    // Regular paragraph — handle bold text
    const formatted = para
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gold/90">$1</strong>')
      .replace(/\n/g, ' ');

    return (
      <p
        key={i}
        className="font-serif text-[13.5px] text-text/85 leading-[1.75] mb-3"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  });
}

export default function OraclePanel({ isOpen, onClose, preload, gameContext }: OraclePanelProps) {
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastAnswerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && preload && messages.length === 0) {
      setInput(preload);
      inputRef.current?.focus();
    }
  }, [isOpen, preload, messages.length]);

  // Scroll to top of last answer when new answer arrives
  useEffect(() => {
    if (lastAnswerRef.current && !loading) {
      lastAnswerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      <div
        className="fixed top-0 right-0 h-full w-[520px] z-50 flex flex-col animate-[slideIn_0.25s_ease-out_forwards]"
        style={{
          background: 'linear-gradient(180deg, #080c14, #060a10)',
          borderLeft: '1px solid #C9A84C22',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.5), -5px 0 30px rgba(201,168,76,0.03)',
        }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0 border-b"
          style={{
            background: 'linear-gradient(135deg, #C9A84C0A, #14B8A604, transparent)',
            borderColor: '#C9A84C18',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Oracle icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: 'linear-gradient(135deg, #C9A84C18, #14B8A610)',
                border: '1px solid #C9A84C33',
                boxShadow: '0 0 16px rgba(201,168,76,0.12), 0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              🔮
            </div>
            <div>
              <p className="font-mono text-[12px] font-bold text-gold tracking-[0.1em]">
                ORACLE TERMINAL
              </p>
              <p className="font-mono text-[8px] tracking-[0.08em]" style={{ color: gameContext ? '#14B8A6' : '#C9A84C66' }}>
                {gameContext ? '● POST-GAME ANALYSIS MODE' : '● SCENARIO INTELLIGENCE MODE'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111820] border border-border cursor-pointer transition-all duration-200 hover:border-gold/50 hover:bg-gold/5"
          >
            <span className="font-mono text-[9px] tracking-[0.1em] text-muted">ESC</span>
            <span className="text-muted text-sm">✕</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] text-gold/40">&gt;</span>
                <span className="font-mono text-[11px] text-gold/60">ORACLE READY</span>
                <div className="flex-1 h-px bg-gold/10" />
              </div>

              <div
                className="rounded-xl px-4 py-3.5 mb-4"
                style={{ background: '#C9A84C08', border: '1px solid #C9A84C15' }}
              >
                <p className="font-serif text-[13px] text-text/80 leading-[1.7]">
                  {gameContext
                    ? 'I have your simulation results loaded. Ask me anything about the world your predictions created — who won, who lost, and what happens next.'
                    : 'Full analytical context loaded: 10 factions, 3 scenarios, 14 societal groups, 9 trigger events. I can analyze power dynamics, alliances, vulnerabilities, and second-order effects.'}
                </p>
              </div>

              <p className="font-mono text-[9px] tracking-[0.12em] text-gold/30 uppercase mb-2.5">
                SUGGESTED QUERIES
              </p>
              <div className="space-y-1.5">
                {suggestedQs.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left font-mono text-[11px] text-body/70 rounded-lg px-3.5 py-2.5 hover:text-gold transition-all cursor-pointer"
                    style={{
                      background: '#0b1018',
                      border: '1px solid #1A253544',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#C9A84C44';
                      e.currentTarget.style.background = '#C9A84C08';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#1A253544';
                      e.currentTarget.style.background = '#0b1018';
                    }}
                  >
                    <span className="text-gold/40 mr-1.5">▸</span> {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
            const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
            return (
              <div key={i} ref={isLastAssistant ? lastAnswerRef : undefined}>
                {msg.role === 'user' ? (
                  <div className="flex items-start gap-2.5 py-2">
                    <span className="font-mono text-[11px] text-gold/50 mt-0.5 flex-shrink-0">&gt;</span>
                    <p className="font-mono text-[13px] text-gold leading-[1.5] font-medium">{msg.content}</p>
                  </div>
                ) : (
                  <div
                    className="rounded-xl px-5 py-4 mt-1"
                    style={{
                      background: 'linear-gradient(180deg, #0d1219, #0a0e14)',
                      border: '1px solid #C9A84C12',
                      boxShadow: 'inset 0 1px 0 rgba(201,168,76,0.04)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gold/8">
                      <span className="text-sm">🔮</span>
                      <span className="font-mono text-[9px] tracking-[0.12em] text-gold/40">ORACLE RESPONSE</span>
                    </div>
                    {formatOracleResponse(msg.content)}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div
              className="rounded-xl px-5 py-4"
              style={{ background: '#0d1219', border: '1px solid #C9A84C10' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm">🔮</span>
                <span className="font-mono text-[10px] text-gold/40 tracking-[0.1em]">PROCESSING QUERY</span>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gold/60"
                      style={{ animation: `dot 1.4s ${i * 0.22}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div
          className="px-5 py-4 flex-shrink-0 border-t"
          style={{ borderColor: '#C9A84C12', background: '#080c12' }}
        >
          <div className="flex gap-2.5 items-end">
            <span className="font-mono text-sm text-gold/30 mb-2">&gt;</span>
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
              className="flex-1 rounded-lg px-4 py-2.5 text-gold font-mono text-[13px] leading-[1.5] resize-none"
              style={{
                background: '#0a0e14',
                border: '1px solid #C9A84C18',
                caretColor: '#C9A84C',
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className={`font-mono text-[10px] font-bold tracking-[0.1em] px-4 py-2.5 rounded-lg transition-all ${
                !input.trim() || loading
                  ? 'bg-raised text-muted cursor-not-allowed'
                  : 'bg-gold/15 text-gold border border-gold/40 hover:bg-gold/25 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)] cursor-pointer'
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
