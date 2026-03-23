import { Scenario } from '@/lib/types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'gold',
    icon: '🚀',
    name: 'The Gold Rush',
    color: '#FBBF24',
    defaultProbability: 35,
    condition: 'No federal regulation + continued deployment acceleration + GOP holds Congress',
    plainDescription:
      "AI deploys fast with no real guardrails. Capital wins big. Labor loses ground steadily. Tech billionaires get most of what they wanted.",
    narrative: [
      'By January 2028, AI has reshaped the American economy without a single federal law governing it. The deployment pace set by OpenAI, Google, and Anthropic in 2025-2026 never slowed down. Autonomous AI agents handle customer service, legal research, financial analysis, and content creation at scale. Companies that adopted AI aggressively report 30-40% productivity gains.',
      'The economic numbers look spectacular from the top. Corporate profits hit record highs. The S&P 500 surged past 7,000. GDP growth exceeded 4% for three consecutive quarters. Tech billionaires added hundreds of billions to their net worth. But the gains are concentrated — the top 10% captured nearly all of the economic expansion.',
      'Congress never passed an AI law. The Senate voted down two attempts. The House never brought a bill to the floor. Forty-four states have their own AI laws, creating a contradictory patchwork that large companies can navigate and small ones cannot. The EU AI Act is the only meaningful external constraint, and US companies have largely compartmentalized compliance.',
      'The labor market tells two stories. Unemployment remains below 5%, but the composition has shifted dramatically. High-skill AI-adjacent roles pay more than ever. But entry-level professional positions have contracted by 25-30%, and the service sector continues its long decline. The workers who lost aren\'t counted as unemployed — they\'re underemployed, gigging, or have left the workforce entirely.',
    ],
    factionOutcomes: [
      { factionId: 'f1', outcome: 'Win', reason: 'Achieved deployment without regulation. Political capture successful.' },
      { factionId: 'f2', outcome: 'Partial Loss', reason: 'Voluntary commitments adopted but no enforcement mechanism achieved.' },
      { factionId: 'f3', outcome: 'Draw', reason: 'Open models thriving but corporate AI still dominates distribution.' },
      { factionId: 'f4', outcome: 'Loss', reason: 'No federal protections. Union contracts help members but most workers unprotected.' },
      { factionId: 'f5', outcome: 'Partial Win', reason: 'Reskilling programs funded but evidence of effectiveness limited.' },
      { factionId: 'f6', outcome: 'Loss', reason: 'No legislative victories. Reduced to opposition rhetoric.' },
      { factionId: 'f7', outcome: 'Win', reason: 'Successfully blocked all regulation. Free market framing prevailed.' },
      { factionId: 'f8', outcome: 'Partial Win', reason: 'Military AI deployment accelerated. Some autonomy concerns unresolved.' },
      { factionId: 'f9', outcome: 'Partial Loss', reason: 'Courts still deliberating. No definitive copyright resolution.' },
      { factionId: 'f10', outcome: 'Partial Win', reason: 'EU enforcement creating some constraints but limited to European market.' },
    ],
    triggerCluster: ['T1', 'T3', 'T7'],
    eoy2026Snapshot:
      'AI deployment accelerating with no federal guardrails. Corporate profits surging. Displacement visible but not yet politically decisive.',
    eoy2027Snapshot:
      'The Gold Rush is entrenched. Capital has captured most of the gains. The question is whether the 2028 election cycle creates the political conditions for change.',
  },
  {
    id: 'backlash',
    icon: '🔥',
    name: 'The Backlash',
    color: '#F43F5E',
    defaultProbability: 25,
    condition: 'Visible job losses before midterms + Democrats win Congress + major harm event',
    plainDescription:
      "Visible job losses trigger a political revolt. Democrats win Congress and pass worker protections. The tech industry faces its first real legislative reckoning.",
    narrative: [
      'The AI backlash began in summer 2026 when three Fortune 500 companies announced simultaneous layoffs totaling 45,000 workers, each explicitly citing AI replacement. The footage of workers leaving office buildings carrying boxes became the defining image of the midterm campaign. By November, AI displacement was the number one voter concern.',
      'Democrats swept the 2026 midterms, winning the House decisively and narrowly flipping the Senate. The mandate was clear: regulate AI, protect workers. By spring 2027, the first comprehensive federal AI legislation was signed into law — mandatory impact assessments, worker notification requirements, transition funding, and algorithmic transparency rules.',
      'The tech industry scrambled to adapt. Compliance costs rose significantly. Several AI startups pivoted or shut down. The largest companies absorbed the costs but faced slower deployment timelines and increased legal exposure. Stock prices for pure-play AI companies fell 20-30% from their peaks.',
      'For workers, the picture was mixed. The new law provided real protections — advance notice of AI deployment, mandatory retraining programs, and a new federal agency to monitor AI labor impacts. But the displacement that triggered the backlash had already occurred. The law was more about preventing further damage than reversing what had happened. The workers who lost jobs in 2026 were not made whole by legislation passed in 2027.',
    ],
    factionOutcomes: [
      { factionId: 'f1', outcome: 'Loss', reason: 'First real regulatory constraints. Political capture broken by voter backlash.' },
      { factionId: 'f2', outcome: 'Partial Win', reason: 'Safety standards incorporated into legislation. Enforcement mechanisms achieved.' },
      { factionId: 'f3', outcome: 'Partial Loss', reason: 'Open-source models face same compliance requirements as proprietary ones.' },
      { factionId: 'f4', outcome: 'Win', reason: 'Worker protections codified into law. Union model validated as template.' },
      { factionId: 'f5', outcome: 'Partial Win', reason: 'Massive reskilling funding. But effectiveness still unproven.' },
      { factionId: 'f6', outcome: 'Win', reason: 'Legislative agenda became law. Progressive AI regulation achieved.' },
      { factionId: 'f7', outcome: 'Loss', reason: 'Lost congressional majority. Deregulation agenda defeated at the ballot box.' },
      { factionId: 'f8', outcome: 'Draw', reason: 'Military AI carved out of civilian regulation. Autonomous weapons debate intensifies.' },
      { factionId: 'f9', outcome: 'Partial Win', reason: 'Copyright protections strengthened. Creator compensation frameworks established.' },
      { factionId: 'f10', outcome: 'Win', reason: 'US regulation converges toward EU standards. Brussels Effect validated.' },
    ],
    triggerCluster: ['T1', 'T4', 'T7'],
    eoy2026Snapshot:
      'Visible AI displacement dominating headlines. Midterm campaigns centered on AI. Public opinion shifting decisively against unrestricted deployment.',
    eoy2027Snapshot:
      'First federal AI law passed. Tech industry adjusting to new reality. Worker protections in place but displacement already occurred.',
  },
  {
    id: 'stalemate',
    icon: '⚖️',
    name: 'The Stalemate',
    color: '#14B8A6',
    defaultProbability: 40,
    condition: 'Congressional gridlock + EU becomes de facto regulator + courts and states fill the vacuum',
    plainDescription:
      "Washington gridlocks entirely. The EU becomes the de facto global regulator. Courts and a patchwork of state laws create a system nobody fully controls.",
    narrative: [
      'By January 2028, the United States still has no federal AI law. Not because anyone decided against it, but because Congress couldn\'t agree on anything. Three major bills were introduced. None received a floor vote. The Senate remained deadlocked. The result is governance by default — a system nobody designed and nobody controls.',
      'The EU AI Act became the de facto global standard. American tech companies, unwilling to maintain separate products for European and global markets, adopted EU compliance standards worldwide. The irony was not lost on anyone: the regulatory framework governing American AI was written in Brussels, not Washington.',
      'Courts filled part of the vacuum. Federal judges ruled on copyright, liability, and employment cases involving AI — creating precedent that functioned as informal regulation. But court rulings are slow, inconsistent across circuits, and create legal uncertainty that benefits nobody. Meanwhile, 44 states passed their own AI laws, creating a patchwork so complex that only the largest companies could navigate it.',
      'The stalemate produced no clean winners. Capital continued to benefit from AI deployment but faced increasing legal and compliance uncertainty. Workers received no federal protection but weren\'t hit by the catastrophic displacement some feared. The AI industry grew but slower than in the Gold Rush scenario, constrained by legal risk and regulatory complexity. Everyone was frustrated. Nobody was satisfied. The system muddled through.',
    ],
    factionOutcomes: [
      { factionId: 'f1', outcome: 'Partial Win', reason: 'No US regulation, but EU constraints and legal uncertainty slow deployment.' },
      { factionId: 'f2', outcome: 'Partial Win', reason: 'EU standards incorporate safety requirements. No US enforcement.' },
      { factionId: 'f3', outcome: 'Draw', reason: 'Open-source benefits from lack of US regulation but faces EU compliance costs.' },
      { factionId: 'f4', outcome: 'Partial Loss', reason: 'No federal protections. Contract-by-contract battles continue.' },
      { factionId: 'f5', outcome: 'Draw', reason: 'Reskilling programs exist but fragmented across states. No national strategy.' },
      { factionId: 'f6', outcome: 'Partial Loss', reason: 'Policy proposals ready but no legislative vehicle. Stalemate frustrates reform.' },
      { factionId: 'f7', outcome: 'Partial Win', reason: 'Successfully blocked federal regulation, but EU rules constrain anyway.' },
      { factionId: 'f8', outcome: 'Partial Win', reason: 'Military AI proceeds without civilian regulatory constraints.' },
      { factionId: 'f9', outcome: 'Draw', reason: 'Court rulings mixed. Some wins, some losses. No definitive resolution.' },
      { factionId: 'f10', outcome: 'Win', reason: 'Brussels Effect in full force. EU becomes the global AI regulator by default.' },
    ],
    triggerCluster: ['T6', 'T7', 'T9'],
    eoy2026Snapshot:
      'Congressional gridlock on AI regulation. EU AI Act enforcement beginning. State-level regulation accelerating. Legal uncertainty mounting.',
    eoy2027Snapshot:
      'No federal law. EU standards adopted globally by default. Courts creating precedent. Nobody satisfied with the status quo.',
  },
];
