import { Faction } from '@/lib/types';

export const FACTIONS: Faction[] = [
  {
    id: 'f1',
    code: 'F1',
    name: 'Accelerationists',
    category: 'tech',
    posture: 'Offensive',
    color: '#FBBF24',
    primaryWeapon: 'Political capture + lobbying',
    voices: [
      { name: 'Sam Altman', role: 'CEO, OpenAI' },
      { name: 'Marc Andreessen', role: 'Venture Capitalist, a16z' },
      { name: 'Elon Musk', role: 'CEO, xAI / Tesla' },
    ],
    stance:
      'AI must be deployed as fast as possible. Regulation is a death sentence for American competitiveness. The benefits to humanity are so large that slowing down is the real risk.',
    message:
      'Build faster, regulate later. America must win the AI race or lose everything.',
    tactics: [
      'Massive lobbying spending in Congress ($100M+ annually)',
      'Executive order access — direct influence on White House AI policy',
      'Funding friendly think tanks and research to shape the Overton window',
      'Using China threat narrative to justify deregulation',
    ],
    manipulation:
      'Frame all regulation as "anti-innovation" and "helping China." Fund studies showing AI benefits while downplaying displacement. Control narrative through media investments and tech press relationships.',
    opponents: ['f2', 'f4', 'f6', 'f9'],
    allies: ['f7', 'f8'],
    eoy2026:
      'Dominant position. Executive orders favor deployment. No meaningful federal regulation passed. EU enforcement creates the only real constraint.',
    eoy2027:
      'Position depends heavily on midterm outcomes. If GOP holds, accelerationists maintain control. If Democrats flip chambers, the first real legislative battles begin.',
    keyFact:
      'F1 has spent more on AI lobbying than all opposing factions combined. Their political access is unmatched, but their position depends on keeping AI displacement invisible to voters.',
  },
  {
    id: 'f2',
    code: 'F2',
    name: 'AI Safety Establishment',
    category: 'tech',
    posture: 'Defensive',
    color: '#60A5FA',
    primaryWeapon: 'Technical authority + institutional legitimacy',
    voices: [
      { name: 'Dario Amodei', role: 'CEO, Anthropic' },
      { name: 'Yoshua Bengio', role: 'AI Researcher, Turing Award Winner' },
      { name: 'Center for AI Safety', role: 'Research Organization' },
    ],
    stance:
      'AI capabilities are advancing faster than alignment research. Existential and catastrophic risks are real and underinvested. Voluntary commitments are insufficient without enforcement mechanisms.',
    message:
      'The technology is powerful and the risks are real. We need enforceable safety standards before capabilities outrun our ability to control them.',
    tactics: [
      'Publishing technical safety research to build intellectual authority',
      'Engaging directly with policymakers as "responsible" industry voice',
      'Building international safety frameworks (UK AI Safety Summit model)',
      'Alliance with F10 on global governance standards',
    ],
    manipulation:
      'Position as the "reasonable middle" between accelerationists and anti-tech voices. Use technical complexity to maintain gatekeeping authority over what counts as "safe."',
    opponents: ['f1', 'f3'],
    allies: ['f10'],
    eoy2026:
      'Growing influence through institutional legitimacy but limited policy wins. Safety testing frameworks adopted voluntarily but without enforcement teeth.',
    eoy2027:
      'Best positioned to gain if a major AI harm event occurs. The F2-F10 alliance is the most durable cross-faction partnership.',
    keyFact:
      'F2\'s strongest position is their alliance with F10 (International Regulatory Bloc). This is the most durable cross-faction partnership because it doesn\'t depend on US domestic politics.',
  },
  {
    id: 'f3',
    code: 'F3',
    name: 'Open Source Advocates',
    category: 'tech',
    posture: 'Swing',
    color: '#34D399',
    primaryWeapon: 'Distributed development + developer community',
    voices: [
      { name: 'Meta AI (LLaMA)', role: 'Open-weight model provider' },
      { name: 'Hugging Face', role: 'Open-source AI platform' },
      { name: 'Yann LeCun', role: 'Chief AI Scientist, Meta' },
    ],
    stance:
      'AI power should be distributed, not concentrated in a few companies. Open models prevent monopolistic control. Both safety regulation and corporate capture threaten open development.',
    message:
      'Open-source AI is the best defense against both corporate monopoly and government overreach.',
    tactics: [
      'Releasing open-weight models that match proprietary performance',
      'Building developer communities and ecosystems around open tools',
      'Lobbying against regulations that would require licensing or registration',
      'Framing open-source as democratization vs corporate concentration',
    ],
    manipulation:
      'Conflate "open-source" with "democratization" even when released by trillion-dollar companies. Use developer community sentiment to create grassroots-appearing opposition to regulation.',
    opponents: ['f2'],
    allies: [],
    eoy2026:
      'Strong technical position — open models closing the gap with proprietary ones. Politically orphaned — opposed by both safety advocates and corporations who want moats.',
    eoy2027:
      'F3 is the true political orphan. They oppose both F1\'s corporate concentration and F2\'s safety regulation. No natural coalition home.',
    keyFact:
      'F3 is the political orphan — they have no natural coalition. They oppose both corporate concentration (F1) and safety regulation (F2), leaving them without reliable allies.',
  },
  {
    id: 'f4',
    code: 'F4',
    name: 'Organized Labor',
    category: 'labor',
    posture: 'Defensive',
    color: '#F87171',
    primaryWeapon: 'Collective bargaining + strike authority',
    voices: [
      { name: 'AFL-CIO', role: 'Largest US labor federation' },
      { name: 'SAG-AFTRA', role: 'Entertainment unions (post-AI strike)' },
      { name: 'Teamsters', role: 'Transportation and logistics union' },
    ],
    stance:
      'AI deployment decisions cannot be made unilaterally by management. Workers must have a seat at the table. AI-specific protections must be written into contracts and legislation.',
    message:
      'Workers built the economy AI is automating. They deserve a voice in how it changes and a share of the gains.',
    tactics: [
      'Writing AI-specific clauses into collective bargaining agreements',
      'Strategic strikes and work actions targeting AI displacement',
      'Coalition building with F6 (Progressives) for legislative action',
      'Public campaigns highlighting worker displacement stories',
    ],
    manipulation:
      'Emphasize the most sympathetic displacement stories. Frame all AI deployment as threatening to workers even when it augments rather than replaces. Use strike threat as political leverage.',
    opponents: ['f1', 'f7'],
    allies: ['f6', 'f9'],
    eoy2026:
      'Winning at the bargaining table — SAG-AFTRA deal becomes the template. Losing in Congress — no federal legislation passed.',
    eoy2027:
      'Position depends entirely on midterm outcomes. If Democrats win chambers, labor gets its first real legislative window. If not, they remain limited to contract-by-contract battles.',
    keyFact:
      'Labor\'s power is concentrated in unionized sectors. The vast majority of workers affected by AI have no union representation and no collective bargaining leverage.',
  },
  {
    id: 'f5',
    code: 'F5',
    name: 'Reskilling & Adaptation Camp',
    category: 'labor',
    posture: 'Swing',
    color: '#A78BFA',
    primaryWeapon: 'Institutional credibility + bipartisan appeal',
    voices: [
      { name: 'World Economic Forum', role: 'International policy forum' },
      { name: 'LinkedIn / Microsoft', role: 'Workforce development platforms' },
      { name: 'Community colleges', role: 'Workforce training infrastructure' },
    ],
    stance:
      'The transition is inevitable — the question is whether workers are prepared for it. Massive investment in reskilling, education reform, and transition support can make AI a net positive for workers.',
    message:
      'We can\'t stop the wave, but we can teach people to surf. The answer is investment in human capital.',
    tactics: [
      'Promoting reskilling programs and workforce development funding',
      'Building bipartisan support by avoiding anti-tech framing',
      'Partnering with companies on "responsible transition" frameworks',
      'Publishing research on skills gaps and training effectiveness',
    ],
    manipulation:
      'Use the "just reskill" narrative to deflect from structural problems. Frame displacement as an individual skills problem rather than a systemic power imbalance. Provide political cover for inaction on regulation.',
    opponents: [],
    allies: ['f4', 'f6'],
    eoy2026:
      'Lots of programs announced, limited evidence of effectiveness. The "reskilling" narrative serves as political cover for both parties.',
    eoy2027:
      'F5 is the swing vote. They can align with F1 ("reskilling is the answer, no regulation needed") or with F4/F6 ("reskilling plus regulation"). Which way they break determines legislative outcomes.',
    keyFact:
      'F5 is the swing vote in AI politics. Whether they align with accelerationists ("reskilling is enough") or labor ("reskilling plus regulation") determines the legislative outcome.',
  },
  {
    id: 'f6',
    code: 'F6',
    name: 'Progressive Reformers',
    category: 'politics',
    posture: 'Offensive',
    color: '#EC4899',
    primaryWeapon: 'Legislative proposals + grassroots mobilization',
    voices: [
      { name: 'Sen. Elizabeth Warren', role: 'US Senator, Massachusetts' },
      { name: 'Rep. Alexandria Ocasio-Cortez', role: 'US Representative, New York' },
      { name: 'AI Now Institute', role: 'Policy research organization' },
    ],
    stance:
      'AI is accelerating inequality that was already at crisis levels. Without aggressive intervention — taxes, regulation, worker protections — the AI era will produce a permanent underclass.',
    message:
      'This isn\'t a technology problem, it\'s a power problem. The same billionaires who broke the economy are now automating what\'s left.',
    tactics: [
      'Introducing comprehensive AI regulation bills in Congress',
      'Grassroots organizing and public campaigns on AI displacement',
      'Coalition with F4 (Labor) and F9 (Creative Rights) for legislative action',
      'Using committee hearings to create public accountability moments',
    ],
    manipulation:
      'Frame AI as a billionaire power grab even when benefits are widely distributed. Use the most extreme displacement scenarios to justify sweeping legislation. Conflate legitimate innovation with exploitation.',
    opponents: ['f1', 'f7'],
    allies: ['f4', 'f9'],
    eoy2026:
      'Strong rhetoric, limited legislative success. Coalition with F4 and F9 is solid but lacks the votes to pass anything.',
    eoy2027:
      'The midterms are everything. If Democrats flip chambers, F6 goes from opposition to agenda-setting. If not, they remain a vocal minority.',
    keyFact:
      'F6 has the policy proposals ready — what they lack is the votes. The 2026 midterms determine whether progressive AI regulation is possible or remains theoretical.',
  },
  {
    id: 'f7',
    code: 'F7',
    name: 'Laissez-Faire Conservatives',
    category: 'politics',
    posture: 'Defensive',
    color: '#F97316',
    primaryWeapon: 'Congressional majority + deregulation ideology',
    voices: [
      { name: 'Heritage Foundation', role: 'Conservative think tank' },
      { name: 'Chamber of Commerce', role: 'Business lobbying organization' },
      { name: 'Republican congressional leadership', role: 'Majority caucus' },
    ],
    stance:
      'The free market will sort out AI better than government bureaucrats. Regulation kills innovation and hands advantages to China. American tech dominance is a national security asset.',
    message:
      'Government should get out of the way and let American innovation win. Every regulation is a gift to Beijing.',
    tactics: [
      'Blocking all AI regulation bills in Congress',
      'Framing any regulation as "anti-business" and "pro-China"',
      'Using committee control to prevent votes on labor protection bills',
      'Promoting voluntary industry commitments as alternative to legislation',
    ],
    manipulation:
      'Invoke "free market" principles while supporting corporate subsidies and monopolistic behavior. Use China threat to justify deregulation. Frame any worker protection as "socialist."',
    opponents: ['f4', 'f6'],
    allies: ['f1'],
    eoy2026:
      'Successfully blocking all federal AI legislation. Facing growing pressure from populist wing of own party who see tech as cultural enemy.',
    eoy2027:
      'Coalition with F1 is strong but faces strain from populist Republicans who distrust Silicon Valley. The "broligarch" narrative is splitting the conservative base.',
    keyFact:
      'F7\'s blocking power in Congress is the single biggest reason the US has no AI law. But their coalition is fracturing as populist Republicans turn against Big Tech.',
  },
  {
    id: 'f8',
    code: 'F8',
    name: 'National Security Hawks',
    category: 'politics',
    posture: 'Swing',
    color: '#64748B',
    primaryWeapon: 'Classified briefings + bipartisan security consensus',
    voices: [
      { name: 'Pentagon / DoD', role: 'US Department of Defense' },
      { name: 'NSA / Intelligence Community', role: 'US intelligence agencies' },
      { name: 'Bipartisan defense hawks', role: 'Congressional defense committees' },
    ],
    stance:
      'AI is the defining military and intelligence technology of this era. Whoever leads in AI leads militarily. All other considerations — safety, labor, ethics — are secondary to national security.',
    message:
      'AI superiority is non-negotiable. The country that leads in AI leads the world. Everything else is a luxury we can afford once we\'re safe.',
    tactics: [
      'Using classified threat briefings to shape congressional priorities',
      'Directing defense spending toward AI procurement and development',
      'Building bipartisan consensus around China competition narrative',
      'Recruiting tech talent into military and intelligence applications',
    ],
    manipulation:
      'Use classification authority to control what information reaches the public and Congress. Invoke existential national security threats to override all other policy considerations. Frame AI safety concerns as naive or unpatriotic.',
    opponents: ['f2'],
    allies: ['f1'],
    eoy2026:
      'Growing influence as China competition intensifies. AI military deployments creating both success stories and controversy.',
    eoy2027:
      'F8 is the hinge faction. Their position on regulation determines whether security concerns are used to justify acceleration (F1 alliance) or constraint (F2 alliance).',
    keyFact:
      'F8 is the hinge faction. If they frame AI risk as "we need to move faster than China," they reinforce F1. If they frame it as "autonomous weapons need guardrails," they enable F2.',
  },
  {
    id: 'f9',
    code: 'F9',
    name: 'Creative Rights Coalition',
    category: 'industry',
    posture: 'Offensive',
    color: '#EC4899',
    primaryWeapon: 'Litigation + moral authority',
    voices: [
      { name: 'Authors Guild', role: 'Writers\' organization' },
      { name: 'Recording Industry (RIAA)', role: 'Music industry association' },
      { name: 'Visual artists\' collectives', role: 'Artist organizations' },
    ],
    stance:
      'AI companies stole the creative work of millions of artists, writers, and musicians to build their products. Courts must enforce copyright law. Creators deserve compensation.',
    message:
      'They took our work without asking, without paying, and without permission. The law is on our side.',
    tactics: [
      '70+ active federal lawsuits against AI companies for copyright infringement',
      'Building public sympathy through creator stories and advocacy campaigns',
      'Coalition with F4 (Labor) and F6 (Progressives) for legislative support',
      'International coordination on creator rights frameworks',
    ],
    manipulation:
      'Frame all AI-generated content as "stolen" even when legal questions are genuinely complex. Use the most sympathetic creator stories to build public support. Conflate corporate AI training with individual piracy.',
    opponents: ['f1', 'f3'],
    allies: ['f4', 'f6'],
    eoy2026:
      'Copyright litigation reaching critical decisions. Summer 2026 rulings could be the most consequential legal decisions of the AI era.',
    eoy2027:
      'F9 and F10 operate outside F1\'s political advantages. Courts and international regulators can\'t be lobbied the same way Congress can.',
    keyFact:
      'The copyright litigation is the one battlefield where F1\'s political spending doesn\'t apply. Federal judges can\'t be lobbied. This is where the creative rights fight will be won or lost.',
  },
  {
    id: 'f10',
    code: 'F10',
    name: 'International Regulatory Bloc',
    category: 'global',
    posture: 'Offensive',
    color: '#14B8A6',
    primaryWeapon: 'Market access leverage + legal enforcement',
    voices: [
      { name: 'European Commission', role: 'EU executive body' },
      { name: 'EU AI Act enforcement bodies', role: 'Regulatory agencies' },
      { name: 'UK AI Safety Institute', role: 'Government safety body' },
    ],
    stance:
      'AI companies operating in regulated markets must comply with human rights, transparency, and safety standards. The EU AI Act is the floor, not the ceiling.',
    message:
      'If you want to sell AI in Europe, you follow European rules. No exceptions, no negotiations.',
    tactics: [
      'EU AI Act enforcement beginning August 2026 with penalties up to 7% of global revenue',
      'Building enforcement capacity and technical expertise for AI regulation',
      'Coordinating with other jurisdictions (UK, Canada, Japan) on standards harmonization',
      'Using market access as leverage — comply or lose 450M customers',
    ],
    manipulation:
      'Frame regulation as inevitable and resistance as futile. Use Brussels Effect to set global standards before democratic debate occurs in other countries. Present compliance as easier than it is to deter opposition.',
    opponents: ['f1', 'f7'],
    allies: ['f2'],
    eoy2026:
      'EU AI Act enforcement begins. First major fines expected. US companies making compliance decisions that will shape global AI development.',
    eoy2027:
      'If EU enforces aggressively, the Brussels Effect makes European standards the de facto global baseline regardless of what the US does.',
    keyFact:
      'F10 operates outside the American political system entirely. EU enforcement can\'t be blocked by US lobbying, executive orders, or congressional inaction. This is the one constraint F1 cannot buy their way around.',
  },
];
