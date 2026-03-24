import type { Metadata } from 'next';
import { Playfair_Display, JetBrains_Mono } from 'next/font/google';
import LayoutShell from '@/components/shared/LayoutShell';
import AudioToggle from '@/components/shared/AudioToggle';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Factions: The Simulation',
  description:
    'A two-mode interactive experience exploring AI\'s impact on society through 2028.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text font-serif antialiased">
        <LayoutShell>{children}</LayoutShell>
        <AudioToggle />
      </body>
    </html>
  );
}
