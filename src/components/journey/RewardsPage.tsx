import { useEffect } from "react";
import {
  ALL_UNLOCKED_MESSAGE,
  RECIPIENT_NAME,
  VOUCHERS,
  VOUCHER_VALIDITY,
} from "@/data/journey";
import { bigCelebration } from "@/lib/celebrate";
import { ScratchCard } from "./ScratchCard";

export function RewardsPage({
  opened,
  onOpen,
  onBack,
  onContinue,
}: {
  opened: boolean[];
  onOpen: (index: number) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const count = opened.filter(Boolean).length;
  const all = count === VOUCHERS.length;

  useEffect(() => {
    if (all) bigCelebration();
  }, [all]);

  return (
    <div className="relative z-10 mx-auto w-full max-w-lg px-5 pb-24 pt-10">
      <div className="text-center">
        <h1 className="font-display text-5xl text-gradient">Gifts for {RECIPIENT_NAME} 🎁</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Scratch each card to reveal your gift, one by one.
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          {VOUCHER_VALIDITY}
        </p>
        <p className="mt-3 inline-block rounded-full border border-gold/50 bg-card/80 px-4 py-1 text-xs font-semibold text-primary backdrop-blur">
          {count} of {VOUCHERS.length} opened
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {VOUCHERS.map((v, i) => (
          <ScratchCard key={i} voucher={v} opened={!!opened[i]} onOpen={() => onOpen(i)} />
        ))}
      </div>

      {all && (
        <div className="animate-pop-in mt-8 rounded-3xl border border-gold/50 bg-card/85 p-6 text-center backdrop-blur">
          <p className="font-display text-2xl leading-snug text-primary">{ALL_UNLOCKED_MESSAGE}</p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-4 w-full rounded-full bg-primary px-6 py-3 font-display text-xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
          >
            Open the last letter 💌
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mx-auto mt-8 block rounded-full border border-primary/40 bg-card/70 px-5 py-2 text-sm font-semibold text-primary backdrop-blur"
      >
        ← Revisit the journey
      </button>
    </div>
  );
}
