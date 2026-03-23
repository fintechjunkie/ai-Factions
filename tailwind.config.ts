import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07090F',
        surf: '#0C1018',
        card: '#111820',
        raised: '#161E2C',
        border: '#1A2535',
        faint: '#0F1420',
        text: '#E6DDD0',
        body: '#9A9080',
        muted: '#4A5570',
        gold: '#C9A84C',
        'gold-dim': '#C9A84C20',
        green: '#4ADE80',
        teal: '#14B8A6',
        red: '#F87171',
        amber: '#FBBF24',
        blue: '#60A5FA',
        purple: '#8B5CF6',
        pink: '#EC4899',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
