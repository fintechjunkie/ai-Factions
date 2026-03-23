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
  'Which group is most at risk in the Gold Rush scenario?',
];

interface OraclePanelProps {
  isOpen: boolean;
  onClose: () => void;
  preload?: string;
}

export default function OraclePanel({ isOpen, onClose, preload }: OraclePanelProps) {
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle preload context
  useEffect(() => {
    if (isOpen && preload && messages.length === 0) {
      setInput(preload);
      inputRef.current?.focus();
    }
  }, [isOpen, preload, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: OracleMessage = { role: 'user', content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error('Oracle request failed');
      }

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content || 'No response.' }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[480px] bg-surf border-l border-border z-50 flex flex-col animate-[slideIn_0.25s_ease-out_forwards]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div>
            <p className="font-mono text-sm font-bold text-gold tracking-[0.1em]">◎ AI ORACLE</p>
            <p className="font-mono text-[10px] text-muted mt-0.5">
              Ask anything about factions, scenarios, or dynamics
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors text-xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div>
              <p className="font-serif text-sm text-body mb-4 leading-[1.7]">
                I have deep knowledge of all 10 factions, their alliances, the 3 scenarios,
                14 societal groups, and 9 trigger events. Ask me anything.
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase mb-2">
                SUGGESTED QUESTIONS
              </p>
              <div className="space-y-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="block w-full text-left font-serif text-xs text-body bg-card border border-border rounded-lg px-3 py-2 hover:border-gold/40 hover:text-text transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#C9A84C18] border border-gold/30'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="font-serif text-sm text-text leading-[1.7] whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gold"
                      style={{ animation: `dot 1.4s ${i * 0.22}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0">
          <div className="flex gap-2">
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
              placeholder="Ask the Oracle..."
              rows={2}
              className="flex-1 bg-card border border-border rounded-lg text-text font-serif text-sm leading-[1.6] p-3 resize-none"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className={`font-mono text-xs font-bold tracking-[0.1em] px-4 rounded-md transition-colors self-end ${
                !input.trim() || loading
                  ? 'bg-raised text-muted cursor-not-allowed'
                  : 'bg-gold text-black hover:bg-[#DEB85C] cursor-pointer'
              }`}
              style={{ height: 40 }}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
