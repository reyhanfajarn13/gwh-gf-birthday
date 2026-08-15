const CHARACTERS = [
  { emoji: "🧚", name: "Fairy Tale" },
  { emoji: "🧑‍🚀", name: "Astronaut" },
  { emoji: "👸", name: "Princess" },
];

export function CharacterSelect({ onSelect }: { onSelect: (character: string) => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
      <div className="animate-pop-in w-full rounded-[2rem] border border-gold/40 bg-card/80 p-5 shadow-card backdrop-blur sm:p-8">
        <p className="font-display text-xl text-accent-foreground sm:text-2xl">Choose your character</p>
        <div className="mx-auto my-3 h-px w-20 bg-gold/60 sm:my-4 sm:w-24" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Who will guide you through this journey?
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
          {CHARACTERS.map(({ emoji, name }) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onSelect(emoji)}
              className="flex flex-col items-center gap-2 rounded-2xl border border-gold/40 bg-secondary/50 px-2 py-4 transition-all hover:scale-105 hover:border-primary hover:bg-primary/10 active:scale-95 sm:gap-3 sm:px-3 sm:py-5"
            >
              <span className="text-4xl leading-none sm:text-5xl">{emoji}</span>
              <span className="text-xs font-semibold text-muted-foreground">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
