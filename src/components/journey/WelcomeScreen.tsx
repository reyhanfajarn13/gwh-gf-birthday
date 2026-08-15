import { RECIPIENT_NAME, WELCOME_MESSAGE, STOPS } from "@/data/journey";

export function WelcomeScreen({ onStart, hasProgress }: { onStart: () => void; hasProgress: boolean }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
      <div className="animate-pop-in w-full rounded-[2rem] border border-gold/40 bg-card/80 p-5 shadow-card backdrop-blur sm:p-8">
        <p className="font-display text-xl text-accent-foreground sm:text-2xl">Happy birthday</p>
        <h1 className="mt-1 font-display text-4xl leading-tight text-gradient sm:text-5xl">
          {RECIPIENT_NAME}'s Birthday Journey
        </h1>
        <div className="mx-auto my-4 h-px w-20 bg-gold/60 sm:my-5 sm:w-24" />
        <p className="text-sm leading-relaxed text-muted-foreground">{WELCOME_MESSAGE}</p>

        <button
          type="button"
          onClick={onStart}
          className="mt-5 w-full rounded-full bg-primary px-6 py-3 font-display text-xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95 sm:mt-7 sm:py-4 sm:text-2xl"
        >
          {hasProgress ? "Continue the Journey" : "Start the Journey"}
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          {STOPS.length} memory stops
        </p>
      </div>
    </div>
  );
}
