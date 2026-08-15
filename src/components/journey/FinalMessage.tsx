import { FINAL_MESSAGE, RECIPIENT_NAME } from "@/data/journey";

export function FinalMessage({ onReplay }: { onReplay: () => void }) {
  const paragraphs = FINAL_MESSAGE.split("\n\n");

  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="animate-pop-in w-full rounded-[2.5rem] border border-gold/40 bg-card/90 p-8 shadow-card backdrop-blur sm:p-12">
        <span className="text-6xl">💌</span>
        <h2 className="mt-4 font-display text-4xl text-gradient sm:text-5xl">
          For {RECIPIENT_NAME}
        </h2>

        <div className="mt-6 space-y-4 text-left">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-foreground/90 sm:text-base"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={onReplay}
          className="mt-8 w-full rounded-full bg-primary px-6 py-4 font-display text-2xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
        >
          Play again from the start 💜
        </button>
      </div>
    </div>
  );
}
