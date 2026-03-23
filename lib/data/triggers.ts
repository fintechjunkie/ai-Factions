import { Trigger } from '@/lib/types';

export const TRIGGERS: Trigger[] = [
  {
    id: 'T1',
    name: 'Mass Visible Displacement',
    probability: 'HIGH',
    probabilityPct: 70,
    description:
      'AI-driven layoffs become front-page news. Multiple Fortune 500 companies announce simultaneous cuts explicitly citing AI replacement. The displacement moves from abstract economic trend to visceral political issue.',
    beneficiaries: ['f4', 'f6', 'f9'],
    casualties: ['f1', 'f7'],
    groupImpacts: [
      { groupId: 'service_worker', direction: 'negative', magnitude: 'large', reason: 'Direct displacement in call centers, retail, and food service' },
      { groupId: 'middle_manager', direction: 'negative', magnitude: 'large', reason: 'AI coordination tools flatten management layers' },
      { groupId: 'knowledge_worker', direction: 'negative', magnitude: 'medium', reason: 'Junior professional roles eliminated at scale' },
      { groupId: 'young_worker', direction: 'negative', magnitude: 'large', reason: 'Entry-level pipeline collapses' },
      { groupId: 'union_public', direction: 'positive', magnitude: 'medium', reason: 'Public sympathy strengthens union bargaining position' },
    ],
    timingMatters:
      'If mass layoffs become visible BEFORE the November 2026 midterms, they become a voting issue that could flip congressional control. After midterms, the political window for legislative response doesn\'t reopen until 2028.',
    reassessmentTrigger: true,
  },
  {
    id: 'T2',
    name: 'AGI Announcement or Demonstration',
    probability: 'MEDIUM',
    probabilityPct: 35,
    description:
      'A major AI lab claims to have achieved artificial general intelligence, or demonstrates a system with capabilities that credibly approach it. Whether or not the claim is scientifically valid, the announcement reshapes every faction\'s calculus.',
    beneficiaries: ['f1', 'f2', 'f8'],
    casualties: ['f5', 'f4'],
    groupImpacts: [
      { groupId: 'billionaire', direction: 'positive', magnitude: 'large', reason: 'AGI narrative drives massive capital inflows to AI companies' },
      { groupId: 'tech_entrepreneur', direction: 'positive', magnitude: 'large', reason: 'New capabilities create new markets and opportunities' },
      { groupId: 'service_worker', direction: 'negative', magnitude: 'large', reason: 'AGI narrative accelerates automation investment decisions' },
      { groupId: 'knowledge_worker', direction: 'negative', magnitude: 'large', reason: 'Professional roles seen as automatable within years, not decades' },
      { groupId: 'creative', direction: 'negative', magnitude: 'medium', reason: 'AGI-level systems make human creative work seem even more substitutable' },
    ],
    timingMatters:
      'An AGI claim before midterms could either accelerate backlash (if framed as threatening) or accelerate the race narrative (if framed as national security imperative). The framing battle is more important than the technical reality.',
    reassessmentTrigger: true,
  },
  {
    id: 'T3',
    name: 'China AI Parity or Shock',
    probability: 'MEDIUM',
    probabilityPct: 45,
    description:
      'China demonstrates AI capabilities that match or exceed US frontier models, or deploys AI in a military/intelligence context that shocks US policymakers. The competitive dynamic shifts from "US leads" to "race" or "behind."',
    beneficiaries: ['f1', 'f8'],
    casualties: ['f2', 'f6', 'f4'],
    groupImpacts: [
      { groupId: 'tech_worker', direction: 'positive', magnitude: 'small', reason: 'Increased defense and AI spending creates tech jobs' },
      { groupId: 'billionaire', direction: 'negative', magnitude: 'small', reason: 'Geopolitical uncertainty creates market volatility' },
      { groupId: 'investor', direction: 'negative', magnitude: 'medium', reason: 'Trade tensions and tech war fears depress markets' },
      { groupId: 'tradesperson', direction: 'positive', magnitude: 'small', reason: 'Defense infrastructure buildout creates demand' },
    ],
    timingMatters:
      'A China AI shock before midterms strengthens the "no regulation, full speed ahead" argument. After midterms, it becomes a bipartisan national security issue that could either accelerate or constrain AI deployment depending on framing.',
    reassessmentTrigger: true,
  },
  {
    id: 'T4',
    name: 'Major AI Harm Event',
    probability: 'MEDIUM',
    probabilityPct: 40,
    description:
      'An AI system causes serious, visible harm — deaths, financial catastrophe, election manipulation, or a dramatic failure of autonomous systems. The event is attributable to AI specifically, not just "technology."',
    beneficiaries: ['f2', 'f6', 'f4'],
    casualties: ['f1', 'f7', 'f3'],
    groupImpacts: [
      { groupId: 'tech_entrepreneur', direction: 'negative', magnitude: 'large', reason: 'Regulatory backlash increases compliance costs and liability' },
      { groupId: 'investor', direction: 'negative', magnitude: 'medium', reason: 'AI sector reprices on regulatory and liability risk' },
      { groupId: 'creative', direction: 'positive', magnitude: 'small', reason: 'Public sympathy for human creation vs AI increases' },
      { groupId: 'union_public', direction: 'positive', magnitude: 'medium', reason: 'Harm event strengthens case for worker protections and oversight' },
    ],
    timingMatters:
      'A major harm event before midterms makes AI regulation a central campaign issue. After midterms, it strengthens the hand of whichever faction controls Congress but doesn\'t create the same electoral urgency.',
    reassessmentTrigger: true,
  },
  {
    id: 'T5',
    name: 'Copyright Ruling',
    probability: 'HIGH',
    probabilityPct: 80,
    description:
      'Federal courts rule on whether AI training on copyrighted material constitutes fair use. Multiple cases are expected to reach decision in summer 2026. The outcome determines whether AI companies must license training data or can continue using it freely.',
    beneficiaries: ['f9'],
    casualties: ['f1', 'f3'],
    groupImpacts: [
      { groupId: 'creative', direction: 'positive', magnitude: 'large', reason: 'Licensing requirements restore some income and market value for creators' },
      { groupId: 'tech_entrepreneur', direction: 'negative', magnitude: 'medium', reason: 'Licensing costs significantly increase the cost of training AI models' },
      { groupId: 'small_business', direction: 'neutral', magnitude: 'small', reason: 'Impact depends on whether licensing costs are passed through to AI tool pricing' },
    ],
    timingMatters:
      'Copyright rulings are on a court timeline, not a political timeline. They cannot be influenced by elections, lobbying, or executive orders. This is the one arena where F1\'s political spending is irrelevant.',
    reassessmentTrigger: false,
  },
  {
    id: 'T6',
    name: 'EU Aggressive Enforcement',
    probability: 'MEDIUM',
    probabilityPct: 55,
    description:
      'The EU AI Act enforcement begins in August 2026. If enforcers issue major fines (billions of dollars) against American tech companies, it forces global compliance regardless of US domestic politics.',
    beneficiaries: ['f10', 'f2'],
    casualties: ['f1', 'f7'],
    groupImpacts: [
      { groupId: 'tech_entrepreneur', direction: 'negative', magnitude: 'medium', reason: 'EU compliance costs burden startups disproportionately' },
      { groupId: 'knowledge_worker', direction: 'positive', magnitude: 'small', reason: 'Compliance requirements create demand for legal and policy expertise' },
      { groupId: 'creative', direction: 'positive', magnitude: 'small', reason: 'EU transparency requirements expose AI training data usage' },
    ],
    timingMatters:
      'EU enforcement operates on its own timeline. Early aggressive enforcement (late 2026) sets the tone. If first fines are large, it signals serious intent and forces rapid compliance decisions.',
    reassessmentTrigger: false,
  },
  {
    id: 'T7',
    name: '2026 Midterm Shift',
    probability: 'MEDIUM',
    probabilityPct: 40,
    description:
      'Democrats flip one or both chambers of Congress in the November 2026 midterms. This would create the first real legislative window for AI regulation, worker protections, and accountability measures.',
    beneficiaries: ['f4', 'f6', 'f9'],
    casualties: ['f1', 'f7'],
    groupImpacts: [
      { groupId: 'service_worker', direction: 'positive', magnitude: 'medium', reason: 'Worker protection legislation becomes possible' },
      { groupId: 'young_worker', direction: 'positive', magnitude: 'medium', reason: 'Entry-level job preservation mandates and training programs' },
      { groupId: 'union_public', direction: 'positive', magnitude: 'large', reason: 'Pro-labor legislation strengthens collective bargaining position' },
      { groupId: 'billionaire', direction: 'negative', magnitude: 'small', reason: 'Regulatory costs and potential tax changes on AI profits' },
      { groupId: 'tech_entrepreneur', direction: 'negative', magnitude: 'medium', reason: 'New compliance requirements increase costs for AI companies' },
    ],
    timingMatters:
      'The midterms ARE the timing event. Everything before them is campaigning. Everything after them is legislating (or not). The window between January 2027 inauguration and the 2028 presidential campaign is narrow.',
    reassessmentTrigger: true,
  },
  {
    id: 'T8',
    name: 'Military AI Escalation',
    probability: 'MEDIUM',
    probabilityPct: 50,
    description:
      'US military AI deployment produces either a dramatic success or a dramatic failure. Success reinforces F1/F8 alliance and the national security justification for acceleration. Failure forces a public reckoning on autonomous weapons.',
    beneficiaries: ['f8'],
    casualties: ['f2'],
    groupImpacts: [
      { groupId: 'tech_worker', direction: 'positive', magnitude: 'small', reason: 'Defense AI contracts create high-paying technical roles' },
      { groupId: 'tradesperson', direction: 'positive', magnitude: 'small', reason: 'Military infrastructure maintenance and construction' },
      { groupId: 'investor', direction: 'neutral', magnitude: 'small', reason: 'Defense AI spending is positive for defense stocks but creates sector uncertainty' },
    ],
    timingMatters:
      'Military AI events are largely outside electoral timing. But a dramatic success or failure close to midterms could shape the national security framing of the AI debate.',
    reassessmentTrigger: false,
  },
  {
    id: 'T9',
    name: 'Federal AI Legislation',
    probability: 'LOW',
    probabilityPct: 20,
    description:
      'Congress passes a comprehensive federal AI law. This would require either a bipartisan compromise (unlikely) or a Democratic congressional majority (depends on T7). The content of the law matters as much as its existence.',
    beneficiaries: ['f4', 'f6', 'f2'],
    casualties: ['f1', 'f7'],
    groupImpacts: [
      { groupId: 'service_worker', direction: 'positive', magnitude: 'large', reason: 'Federal worker protections and transition support' },
      { groupId: 'young_worker', direction: 'positive', magnitude: 'medium', reason: 'Training mandates and entry-level role preservation' },
      { groupId: 'tech_entrepreneur', direction: 'negative', magnitude: 'medium', reason: 'Compliance costs and deployment restrictions' },
      { groupId: 'union_public', direction: 'positive', magnitude: 'medium', reason: 'Federal recognition of AI bargaining rights' },
      { groupId: 'near_retirement', direction: 'positive', magnitude: 'medium', reason: 'Transition support and early retirement bridge programs' },
    ],
    timingMatters:
      'Federal legislation requires T7 (midterm shift) as a prerequisite. Even with a Democratic majority, the window between January 2027 and the 2028 campaign season is extremely narrow.',
    reassessmentTrigger: true,
  },
];
