import { RECIPIENT_NAME, WELCOME_MESSAGE, STOPS } from "@/data/journey";

export function WelcomeScreen({ onStart, hasProgress }: { onStart: () => void; hasProgress: boolean }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-6 py-12 text-center">
      <div className="animate-pop-in rounded-[2rem] border border-gold/40 bg-card/80 p-8 shadow-card backdrop-blur">
        <p className="font-display text-2xl text-accent-foreground">Happy birthday</p>
        <h1 className="mt-1 font-display text-5xl leading-tight text-gradient">
          {RECIPIENT_NAME}'s Birthday Journey
        </h1>
        <div className="mx-auto my-5 h-px w-24 bg-gold/60" />
        <p className="text-sm leading-relaxed text-muted-foreground">{WELCOME_MESSAGE}</p>

        <button
          type="button"
          onClick={onStart}
          className="mt-7 w-full rounded-full bg-primary px-6 py-4 font-display text-2xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
        >
          {hasProgress ? "Continue the Journey" : "Start the Journey"}
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          {STOPS.length} memory stops
        </p>
      </div>
    </div>
  );
}
