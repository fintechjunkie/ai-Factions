import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg grid-bg flex flex-col items-center justify-center px-5 py-12">
      <div className="max-w-[760px] w-full">
        <div className="cyber-frame scanlines px-10 py-10">
          {/* Terminal chrome */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-gold/30">
              AI_FACTIONS://SCENARIO_ANALYSIS
            </span>
          </div>

          {/* Eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold/50 uppercase text-center mb-5">
            MARCH 2026
          </p>

          {/* Headline */}
          <h1 className="font-serif text-[42px] font-normal text-text text-center leading-[1.25] mb-8 gold-glow">
            The world is mid-transformation.
          </h1>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-6" />

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
            Ten factions are fighting to shape what comes next. Tech billionaires
            who believe the future belongs to whoever builds fastest. Labor unions
            writing AI protections into contracts before the window closes.
            European regulators whose law now has real teeth. Military officials
            who see AI as the defining edge against China. Artists and musicians
            fighting for compensation for the work their creations were trained on.
          </p>

          <p className="font-serif text-base leading-[1.85] text-text mb-0">
            Two modes. One world. <strong className="text-gold/80">Explore</strong> the factions, events,
            and forces shaping this moment. Or <strong className="text-gold/80">Play</strong> the
            simulation — predict nine key events and see the world your choices
            produce on January 1, 2028.
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-8" />

          {/* The Fork */}
          <div className="grid grid-cols-2 gap-4">
            {/* World Card */}
            <Link href="/world/factions" className="block group">
              <div className="bg-[#0a0e14] border border-teal/30 rounded-xl p-6 transition-all duration-200 group-hover:border-teal group-hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] cursor-pointer h-full flex flex-col">
                <div className="game-icon mb-4" style={{ background: 'linear-gradient(180deg, #14B8A618, #14B8A606)', borderColor: '#14B8A644' }}>
                  🌐
                </div>
                <p className="font-mono text-[11px] tracking-[0.15em] text-teal uppercase mb-2">
                  EXPLORE THE WORLD
                </p>
                <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                  Deep dive into the factions, events, and forces shaping
                  AI&apos;s impact on society.
                </p>
                <span className="inline-block bg-teal text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-colors hover:brightness-110 self-start">
                  ENTER THE WORLD →
                </span>
              </div>
            </Link>

            {/* Play Card */}
            <Link href="/play" className="block group">
              <div className="bg-[#0a0e14] border border-gold/30 rounded-xl p-6 transition-all duration-200 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] cursor-pointer h-full flex flex-col">
                <div className="game-icon mb-4" style={{ background: 'linear-gradient(180deg, #C9A84C18, #C9A84C06)', borderColor: '#C9A84C44' }}>
                  ▶
                </div>
                <p className="font-mono text-[11px] tracking-[0.15em] text-gold uppercase mb-2">
                  PLAY THE SIMULATION
                </p>
                <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                  Predict 9 key events. See the world your choices produce on
                  January 1, 2028.
                </p>
                <span className="inline-block bg-gold text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-colors hover:brightness-110 self-start">
                  START THE SIMULATION →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
