import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-5 py-12">
      <div className="max-w-[720px] w-full animate-[fadeIn_0.4s_ease_forwards]">
        {/* Eyebrow */}
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase text-center mb-6">
          MARCH 2026
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl font-normal text-text text-center leading-[1.25] mb-9">
          The world is mid-transformation.
        </h1>

        {/* Divider */}
        <div className="h-px bg-border my-6" />

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
          Two modes. One world. <strong>Explore</strong> the factions, events,
          and forces shaping this moment. Or <strong>Play</strong> the
          simulation — predict nine key events and see the world your choices
          produce on January 1, 2028.
        </p>

        {/* Divider */}
        <div className="h-px bg-border my-6" />

        {/* The Fork */}
        <div className="grid grid-cols-2 gap-4">
          {/* World Card */}
          <Link href="/world/factions" className="block group">
            <div className="bg-card border border-teal/40 rounded-xl p-6 transition-all duration-150 group-hover:border-teal cursor-pointer h-full flex flex-col">
              <p className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase mb-3">
                EXPLORE THE WORLD
              </p>
              <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                Deep dive into the factions, events, and forces shaping
                AI&apos;s impact on society.
              </p>
              <span className="inline-block bg-teal text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-colors hover:brightness-110">
                ENTER THE WORLD →
              </span>
            </div>
          </Link>

          {/* Play Card */}
          <Link href="/play" className="block group">
            <div className="bg-card border border-gold/40 rounded-xl p-6 transition-all duration-150 group-hover:border-gold cursor-pointer h-full flex flex-col">
              <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-3">
                PLAY THE SIMULATION
              </p>
              <p className="font-serif text-sm leading-[1.7] text-body flex-1 mb-5">
                Predict 9 key events. See the world your choices produce on
                January 1, 2028.
              </p>
              <span className="inline-block bg-gold text-black font-mono font-bold text-xs tracking-[0.12em] px-5 py-2.5 rounded-md transition-colors hover:brightness-110">
                START THE SIMULATION →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
