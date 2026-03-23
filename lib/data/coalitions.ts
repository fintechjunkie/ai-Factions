import { Coalition } from '@/lib/types';

export const COALITIONS: Coalition[] = [
  {
    id: 'a',
    name: 'Pro-Deployment Coalition',
    color: '#FBBF24',
    members: ['f1', 'f7', 'f5', 'f8'],
    stability: 'Moderate',
    description:
      'The dominant power bloc in AI politics. United by the belief that AI deployment should proceed with minimal regulation. F1 provides the money and tech access, F7 provides the congressional votes, F8 provides the national security justification. F5 is a conditional member — they align on "let the market work" but could break toward the opposition if displacement becomes severe enough.',
    faultLines: [
      'F5 (Reskilling) is a swing member who could defect to the opposition if displacement becomes severe',
      'F8 (Security Hawks) could break if military AI failure creates a safety narrative that overrides the competition narrative',
      'Populist Republicans within F7 are increasingly anti-Big Tech, creating internal strain',
    ],
  },
  {
    id: 'b',
    name: 'Domestic Opposition Coalition',
    color: '#F43F5E',
    members: ['f4', 'f6', 'f9'],
    stability: 'High',
    description:
      'The opposition bloc fighting for worker protections, creator rights, and meaningful regulation. United by opposition to unrestricted AI deployment but divided on what the alternative should look like. F4 wants labor protections, F6 wants systemic reform, F9 wants copyright enforcement.',
    faultLines: [
      'F9 (Creative Rights) has narrower goals than F4/F6 — they want copyright enforcement, not necessarily broader regulation',
      'F4 and F6 disagree on the role of markets — labor wants a seat at the table, progressives want structural change',
    ],
  },
  {
    id: 'c',
    name: 'Global Governance Alliance',
    color: '#14B8A6',
    members: ['f2', 'f10'],
    stability: 'High',
    description:
      'The most durable cross-faction partnership. F2 (AI Safety) and F10 (International Regulatory Bloc) share a commitment to enforceable safety standards and operate largely outside US domestic politics. The EU provides the enforcement mechanism that F2\'s voluntary frameworks lack.',
    faultLines: [
      'F2 may face pressure to choose between working within the system (cooperating with F1) and supporting external regulation (F10)',
      'The alliance depends on EU enforcement credibility — if the EU underenforces, the partnership loses its leverage',
    ],
  },
];

export const ORPHAN_FACTION = {
  id: 'f3',
  description:
    'F3 (Open Source Advocates) is the political orphan. They oppose both F1\'s corporate concentration and F2\'s safety regulation, leaving them without a natural coalition home. They have strong technical influence but no reliable political allies.',
};
