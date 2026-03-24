'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full bg-[#0a0e14] border border-gold/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-gold/60 hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]"
      title={playing ? 'Mute' : 'Play ambient audio'}
    >
      <span className="text-base">
        {playing ? '🔊' : '🔇'}
      </span>
    </button>
  );
}
