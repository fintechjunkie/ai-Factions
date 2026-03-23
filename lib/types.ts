// ── FACTIONS ──────────────────────────────────────────────────────
export interface Faction {
  id: string;
  code: string;
  name: string;
  category: 'tech' | 'labor' | 'politics' | 'industry' | 'global';
  posture: 'Offensive' | 'Defensive' | 'Swing';
  color: string;
  primaryWeapon: string;
  voices: Voice[];
  stance: string;
  message: string;
  tactics: string[];
  manipulation: string;
  opponents: string[];
  allies: string[];
  eoy2026: string;
  eoy2027: string;
  keyFact: string;
}

export interface Voice {
  name: string;
  role: string;
}

// ── POWER MATRIX ─────────────────────────────────────────────────
export interface MatrixPairing {
  f1: string;
  f2: string;
  alignment: 'natural_ally' | 'conditional' | 'natural_enemy';
  leverage: 'high' | 'medium' | 'low';
  dynamic: string;
  keyVariable: string;
}

// ── COALITIONS ────────────────────────────────────────────────────
export interface Coalition {
  id: string;
  name: string;
  color: string;
  members: string[];
  stability: 'High' | 'Moderate' | 'Low';
  description: string;
  faultLines: string[];
}

// ── ANALYTICAL TRIGGERS (World mode) ─────────────────────────────
export interface Trigger {
  id: string;
  name: string;
  probability: 'HIGH' | 'MEDIUM' | 'LOW';
  probabilityPct: number;
  description: string;
  beneficiaries: string[];
  casualties: string[];
  groupImpacts: GroupImpact[];
  timingMatters: string;
  reassessmentTrigger: boolean;
}

export interface GroupImpact {
  groupId: string;
  direction: 'positive' | 'negative' | 'neutral';
  magnitude: 'large' | 'medium' | 'small';
  reason: string;
}

// ── GAME EVENTS (Play mode) ────────────────────────────────────────
export interface GameEvent {
  id: string;
  icon: string;
  title: string;
  body: string[];
  choiceQ: string;
  choices: Choice[];
  textQ: string;
  relatedFactionIds: string[];
  relatedTriggerIds: string[];
}

export interface Choice {
  v: string;
  label: string;
  desc: string;
}

// ── GROUPS ────────────────────────────────────────────────────────
export interface Group {
  id: string;
  name: string;
  desc: string;
  color: string;
  baseScore: number;
  fullDescription: string;
  goldRush: ScenarioScore;
  backlash: ScenarioScore;
  stalemate: ScenarioScore;
  representedBy: string[];
  keyRisk: string;
  keyOpportunity: string;
}

export interface ScenarioScore {
  score: number;
  headline: string;
  mechanism: string;
}

// ── SCENARIOS ────────────────────────────────────────────────────
export interface Scenario {
  id: 'gold' | 'backlash' | 'stalemate';
  icon: string;
  name: string;
  color: string;
  defaultProbability: number;
  condition: string;
  plainDescription: string;
  narrative: string[];
  factionOutcomes: FactionOutcome[];
  triggerCluster: string[];
  eoy2026Snapshot: string;
  eoy2027Snapshot: string;
}

export interface FactionOutcome {
  factionId: string;
  outcome: 'Win' | 'Partial Win' | 'Draw' | 'Partial Loss' | 'Loss';
  reason: string;
}

// ── SIMULATION RESULT (from API) ──────────────────────────────────
export interface SimulationResult {
  dominantScenario: 'gold' | 'backlash' | 'stalemate';
  probabilities: { gold: number; backlash: number; stalemate: number };
  stateOfUnion: string[];
  keyInsight: string;
  chosenGroupNarrative: string;
  groups: SimGroupResult[];
  factions: SimFactionResult[];
}

export interface SimGroupResult {
  id: string;
  score: number;
  headline: string;
  note: string;
}

export interface SimFactionResult {
  code: string;
  name: string;
  outcome: 'Win' | 'Partial Win' | 'Draw' | 'Partial Loss' | 'Loss';
  reason: string;
}

// ── PLAYER STATE ─────────────────────────────────────────────────
export interface PlayerResponse {
  choice: string;
  text: string;
}

// ── WORLD PANEL ──────────────────────────────────────────────────
export type WorldPanelContext =
  | { type: 'faction'; id: string }
  | { type: 'trigger'; id: string }
  | { type: 'group'; id: string }
  | { type: 'scenario'; id: 'gold' | 'backlash' | 'stalemate' }
  | { type: 'oracle'; preload?: string };
