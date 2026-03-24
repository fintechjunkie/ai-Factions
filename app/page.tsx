'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const STREAM_POSITIONS = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];

// Animated counter hook
function useCounter(target: number, duration: number = 2000, delay: number = 500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const factions = useCounter(10, 1500, 800);
  const events = useCounter(9, 1500, 1000);
  const groups = useCounter(14, 1500, 1200);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-vibrant flex flex-col items-center justify-center px-5 py-12 relative overflow-hidden">
      {/* Floating color orbs */}
      <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-10%', left: '-5%' }} />
      <div className="orb orb-teal" style={{ width: 350, height: 350, top: '20%', right: '-8%' }} />
      <div className="orb orb-purple" style={{ width: 300, height: 300, bottom: '5%', left: '10%' }} />
      <div className="orb orb-pink" style={{ width: 250, height: 250, bottom: '15%', right: '15%' }} />

      {/* Ambient data streams */}
      {mounted && STREAM_POSITIONS.map((left, i) => (
        <div
          key={i}
          className="data-stream"
          style={{
            left: `${left}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + i * 0.6}s`,
            height: `${30 + i * 8}px`,
          }}
        />
      ))}

      <div className="max-w-[760px] w-full relative z-10">
        <div className="cyber-frame scanlines px-10 py-10">
          {/* Terminal chrome */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-gold/30">
              AI_FACTIONS://SCENARIO_ANALYSIS
            </span>
            <span className="ml-auto font-mono text-[9px] text-teal/60 animate-pulse">
              ● LIVE
            </span>
          </div>

          {/* Eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold/50 uppercase text-center mb-5">
            MARCH 2026
          </p>

          {/* Headline with shimmer */}
          <h1 className="font-serif text-[42px] font-normal text-center leading-[1.25] mb-4 text-shimmer">
            The world is mid-transformation.
          </h1>

          {/* Animated stat tickers */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <span className="font-mono text-2xl font-bold text-gold stat-ticker">{factions}</span>
              <p className="font-mono text-[9px] tracking-[0.15em] text-muted mt-0.5">FACTIONS</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl font-bold text-teal stat-ticker">{events}</span>
              <p className="font-mono text-[9px] tracking-[0.15em] text-muted mt-0.5">EVENTS</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-2xl font-bold text-purple stat-ticker">{groups}</span>
              <p className="font-mono text-[9px] tracking-[0.15em] text-muted mt-0.5">GROUPS</p>
            </div>
          </div>

          {/* Animated divider */}
          <div className="divider-animated mb-6" />

          {/* Body copy */}
          <p className="font-serif text-base leading-[1.85] text-body mb-5">
            Artificial intelligence has moved from science fiction to the
            infrastructure of daily life in less than four years. The productivity
            gains are real. They are flowing almost entirely to the people who own
            the technology. Entry-level professional jobs — the ones that teach
            skills, build careers, and anchor households — are disappearing faster
            than they are being replaced.
          </p>

          <p className="font-serif text-base leading-[1.85] text-body mb-5">
            <span className="text-gold/80">Ten factions</span> are fighting to shape what comes next. Tech billionaires
            who believe the future belongs to whoever builds fastest. Labor unions
            writing AI protections into contracts before the window closes.
            European regulators whose law now has real teeth. Military officials
            who see AI as the defining edge against China. <span className="text-pink/80">Artists and musicians</span> fighting
            for compensation for the work their creations were trained on.
          </p>

          <p className="font-serif text-base leading-[1.85] text-text mb-5">
            Two modes. One world. <strong className="text-teal">Explore</strong> the factions, events,
            and forces shaping this moment. Or <strong className="text-gold">Play</strong> the
            simulation — predict nine key events and see the world your choices
            produce.
          </p>

          <p className="font-serif text-base leading-[1.85] text-body mb-0">
            And there is the <strong className="text-gold">Oracle</strong> — a powerful AI strategist that has deeply analyzed every faction, every alliance, and every scenario. Ask it what life is like for nurses in the Backlash. Ask it why tech billionaires keep winning. Ask it anything. Look for the <span className="font-mono text-gold text-[11px]">◎ ASK ORACLE</span> button.
          </p>

          {/* Animated divider */}
          <div className="divider-animated my-8" />

          {/* The Fork */}
          <div className="grid grid-cols-2 gap-4">
            {/* World Card */}
            <Link href="/world/factions" className="block group">
              <div className="relative bg-[#0a0e14] border border-teal/30 rounded-xl p-6 transition-all duration-300 group-hover:border-teal group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] cursor-pointer h-full flex flex-col overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="game-icon-lg mb-4 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(20,184,166,0.2)]" style={{ borderColor: '#14B8A6' }}>
                    🌐
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.15em] text-teal uppercase mb-2">
                    EXPLORE THE WORLD
                  </p>
                  <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                    Deep dive into the factions, events, and forces shaping
                    AI&apos;s impact on society.
                  </p>
                  <span className="inline-block bg-teal text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(20,184,166,0.4)]">
                    ENTER THE WORLD →
                  </span>
                </div>
              </div>
            </Link>

            {/* Play Card */}
            <Link href="/play" className="block group">
              <div className="relative bg-[#0a0e14] border border-gold/30 rounded-xl p-6 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] cursor-pointer h-full flex flex-col overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative z-10">
                  <div className="game-icon-lg mb-4 btn-pulse" style={{ borderColor: '#C9A84C' }}>
                    ▶
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.15em] text-gold uppercase mb-2">
                    PLAY THE SIMULATION
                  </p>
                  <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                    Predict 9 key events. Choose a time horizon. See the world
                    your choices produce.
                  </p>
                  <span className="inline-block bg-gold text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(201,168,76,0.4)]">
                    START THE SIMULATION →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
