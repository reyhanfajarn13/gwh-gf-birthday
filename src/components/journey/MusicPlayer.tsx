import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { MUSIC_SRC } from "@/data/journey";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.4;
    el.play().then(() => setPlaying(true)).catch(() => {
      // Browser blocked autoplay — play on very first touch/click/key
      setPlaying(false);
      const resume = () => {
        el.play().then(() => setPlaying(true)).catch(() => {});
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("keydown", resume);
      };
      window.addEventListener("pointerdown", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
    });
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Turn music off" : "Play music"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-card/80 text-primary shadow-glow backdrop-blur transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Music className="h-5 w-5 animate-pulse" />
        ) : (
          <VolumeX className="h-5 w-5 opacity-70" />
        )}
      </button>
    </>
  );
}
