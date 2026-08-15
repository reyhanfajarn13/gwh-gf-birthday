import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import type { Stop } from "@/data/journey";
import { STOPS } from "@/data/journey";
import { burst } from "@/lib/celebrate";
import { playReveal, playSelect, playWrong } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import placeholderMemory from "@/assets/placeholder-memory.jpg";

const SWEET_LINES = [
  "Almost, my love… try again 💜",
  "Not quite, but I still love you — one more try 🌸",
  "Hmm, so close! Guess again, sayang ✨",
  "Wrong one, cutie. Your heart knows the answer 💫",
];

export function StopCard({
  stop,
  index,
  answeredIndex,
  onAnswer,
  onNext,
  onClose,
}: {
  stop: Stop;
  index: number;
  answeredIndex: number | null;
  onAnswer: (choice: number) => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const [wrong, setWrong] = useState<number[]>([]);
  const [shaking, setShaking] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [solved, setSolved] = useState(answeredIndex !== null);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    setSolved(answeredIndex !== null);
    setWrong([]);
    setShaking(null);
    setNote(null);
    setPhotoOpen(false);
  }, [answeredIndex, index]);

  useEffect(() => {
    playReveal();
  }, [index]);

  const isLast = index === STOPS.length - 1;

  const pick = (i: number) => {
    if (solved || wrong.includes(i)) return;
    if (i === stop.correctIndex) {
      setSolved(true);
      setNote(null);
      onAnswer(i);
      playSelect();
      window.setTimeout(playReveal, 140);
      burst(0.5, 0.45);
      return;
    }
    setWrong((w) => [...w, i]);
    setShaking(i);
    setNote(SWEET_LINES[wrong.length % SWEET_LINES.length] ?? SWEET_LINES[0]!);
    playWrong();
    window.setTimeout(() => setShaking(null), 480);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-primary/25 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      {/* Perspective wrapper for 3D flip */}
      <div className="animate-pop-in relative w-full max-w-md" style={{ perspective: "1200px" }}>
        {/* Flip container */}
        <div
          className={cn(
            "relative w-full transition-[transform] duration-700 ease-in-out",
            solved && "[transform:rotateY(180deg)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ── FRONT FACE: placeholder photo + question ── */}
          <div
            className="[backface-visibility:hidden] max-h-[95dvh] w-full overflow-y-auto rounded-t-[2rem] border border-gold/50 bg-card shadow-card sm:rounded-[2rem]"
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="relative">
              <img
                src={placeholderMemory}
                alt={`Stop ${index + 1}`}
                loading="lazy"
                className="h-44 w-full object-cover sm:h-52"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close card"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/85 text-foreground backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                <span aria-hidden className="text-base leading-none">
                  {stop.flag ? (
                    <img src={stop.flag} alt={stop.city} className="h-4 w-4 object-contain" />
                  ) : (
                    stop.icon
                  )}
                </span>
                Stop {index + 1} · {stop.city}
              </span>
            </div>

            <div className="p-5">
              <h2 className="font-display text-3xl leading-snug text-primary">{stop.question}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Keep guessing until you find the right one — then the memory appears.
              </p>

              <div className="mt-4 space-y-2">
                {stop.options.map((opt, i) => {
                  const isWrong = wrong.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => pick(i)}
                      disabled={solved || isWrong}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-all",
                        !solved &&
                          !isWrong &&
                          "border-border bg-secondary/50 hover:border-primary/60 hover:bg-secondary",
                        isWrong && "border-blush bg-blush/25 text-muted-foreground opacity-70",
                        shaking === i && "animate-shake-soft",
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-base text-primary">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isWrong && <span aria-hidden>💔</span>}
                    </button>
                  );
                })}
              </div>

              {note && (
                <p
                  key={wrong.length}
                  className="animate-pop-in mt-4 rounded-2xl border border-blush/60 bg-blush/20 px-4 py-3 text-center font-display text-2xl text-primary"
                  aria-live="polite"
                >
                  {note}
                </p>
              )}
            </div>
          </div>

          {/* ── BACK FACE: full photo reveal + memory + continue ── */}
          <div
            className="[backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0 overflow-hidden rounded-t-[2rem] border border-gold/50 shadow-card sm:rounded-[2rem]"
            style={{ WebkitBackfaceVisibility: "hidden" }}
          >
            <img
              src={stop.photo}
              alt={`Memory in ${stop.city}`}
              className="h-full w-full cursor-zoom-in object-cover"
              onClick={() => setPhotoOpen(true)}
            />
            {/* gradient overlay for readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* top controls */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close card"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <span aria-hidden className="text-base leading-none">
                {stop.flag ? (
                  <img src={stop.flag} alt={stop.city} className="h-4 w-4 object-contain" />
                ) : (
                  stop.icon
                )}
              </span>
              Stop {index + 1} · {stop.city}
            </span>

            {/* bottom: memory text + continue button */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-display text-2xl text-white drop-shadow">
                {wrong.length === 0 ? "Exactly right! 💜" : "There it is! You remembered 💜"}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/85 drop-shadow">
                {stop.memory}
              </p>
              <button
                type="button"
                onClick={onNext}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-4 font-display text-2xl text-white backdrop-blur-sm transition-transform hover:bg-white/30 active:scale-95"
              >
                <Heart className="h-5 w-5" />
                {isLast ? "Finish the Journey" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPhotoOpen(false)}
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(false)}
            aria-label="Close photo"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={stop.photo}
            alt={`Memory in ${stop.city}`}
            className="max-h-[90dvh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
