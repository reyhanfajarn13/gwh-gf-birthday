import { FINAL_MESSAGE, RECIPIENT_NAME } from "@/data/journey";

export function FinalMessage({ onReplay }: { onReplay: () => void }) {
  const paragraphs = FINAL_MESSAGE.split("\n\n");

  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-20">
      <div className="animate-pop-in w-full rounded-[2rem] border border-gold/40 bg-card/90 p-5 shadow-card backdrop-blur sm:rounded-[2.5rem] sm:p-12">
        <span className="text-5xl sm:text-6xl">💌</span>
        <h2 className="mt-3 font-display text-3xl text-gradient sm:mt-4 sm:text-5xl">
          For {RECIPIENT_NAME}
        </h2>

        <div className="mt-4 space-y-3 text-left sm:mt-6 sm:space-y-4">
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
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-display text-xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95 sm:mt-8 sm:py-4 sm:text-2xl"
        >
          Play again from the start 💜
        </button>
      </div>
    </div>
  );
}
