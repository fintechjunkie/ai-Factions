// Icon system for factions, events, and groups
// Using styled emoji + Lucide icon names for a game-like feel

export const FACTION_ICONS: Record<string, { emoji: string; label: string }> = {
  f1:  { emoji: '⚡', label: 'Accelerationists' },
  f2:  { emoji: '🛡️', label: 'AI Safety' },
  f3:  { emoji: '🔓', label: 'Open Source' },
  f4:  { emoji: '✊', label: 'Labor' },
  f5:  { emoji: '🔄', label: 'Reskilling' },
  f6:  { emoji: '🔥', label: 'Progressives' },
  f7:  { emoji: '🏛️', label: 'Laissez-Faire' },
  f8:  { emoji: '🎯', label: 'Security Hawks' },
  f9:  { emoji: '🎨', label: 'Creative Rights' },
  f10: { emoji: '🌐', label: 'International Bloc' },
};

export const EVENT_ICONS: Record<string, { emoji: string; glyph: string }> = {
  jobs:        { emoji: '💼', glyph: '⌘' },
  agi:         { emoji: '🧠', glyph: '◈' },
  china:       { emoji: '🌏', glyph: '◉' },
  harm:        { emoji: '⚠️', glyph: '⚠' },
  copyright:   { emoji: '⚖️', glyph: '§' },
  eu:          { emoji: '🇪🇺', glyph: '⊕' },
  election:    { emoji: '🗳️', glyph: '✦' },
  military:    { emoji: '🎖️', glyph: '◆' },
  legislation: { emoji: '📜', glyph: '¶' },
};

export const GROUP_ICONS: Record<string, { emoji: string }> = {
  billionaire:      { emoji: '👑' },
  investor:         { emoji: '📈' },
  tech_entrepreneur: { emoji: '🚀' },
  tech_worker:      { emoji: '💻' },
  knowledge_worker: { emoji: '🎓' },
  creative:         { emoji: '🎭' },
  tradesperson:     { emoji: '🔧' },
  service_worker:   { emoji: '🏪' },
  middle_manager:   { emoji: '📋' },
  gig_worker:       { emoji: '📱' },
  small_business:   { emoji: '🏬' },
  near_retirement:  { emoji: '⏳' },
  young_worker:     { emoji: '🌱' },
  union_public:     { emoji: '🏛️' },
};

export const OUTCOME_ICONS: Record<string, { emoji: string; color: string }> = {
  'Win':          { emoji: '▲', color: '#4ADE80' },
  'Partial Win':  { emoji: '△', color: '#34D399' },
  'Draw':         { emoji: '◇', color: '#4A5570' },
  'Partial Loss': { emoji: '▽', color: '#F87171' },
  'Loss':         { emoji: '▼', color: '#EF4444' },
};

export const SCENARIO_ICONS: Record<string, { emoji: string; glyph: string }> = {
  gold:      { emoji: '🚀', glyph: '◈' },
  backlash:  { emoji: '🔥', glyph: '◉' },
  stalemate: { emoji: '⚖️', glyph: '◎' },
};
