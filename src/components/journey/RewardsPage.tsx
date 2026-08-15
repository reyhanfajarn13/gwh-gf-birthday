import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  ALL_UNLOCKED_MESSAGE,
  RECIPIENT_NAME,
  VOUCHERS,
  VOUCHER_VALIDITY,
} from "@/data/journey";
import { bigCelebration } from "@/lib/celebrate";
import { cn } from "@/lib/utils";
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
  const [selected, setSelected] = useState<number | null>(null);
  const count = opened.filter(Boolean).length;
  const all = count === VOUCHERS.length;

  useEffect(() => {
    if (all) bigCelebration();
  }, [all]);

  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col px-5 py-8">
      {/* Header */}
      <div className="shrink-0 text-center">
        <h1 className="font-display text-4xl text-gradient sm:text-5xl">
          Gifts for {RECIPIENT_NAME} 🎁
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap a gift to reveal it, one by one.
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          {VOUCHER_VALIDITY}
        </p>
        <p className="mt-2 inline-block rounded-full border border-gold/50 bg-card/80 px-4 py-1 text-xs font-semibold text-primary backdrop-blur">
          {count} of {VOUCHERS.length} opened
        </p>
      </div>

      {/* Grid — fills all remaining vertical space */}
      <div className="mt-5 grid flex-1 grid-cols-2 grid-rows-4 gap-3 sm:grid-cols-4 sm:grid-rows-2">
        {VOUCHERS.map((v, i) => {
          const isOpened = !!opened[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border p-3 transition-transform hover:scale-[1.04] active:scale-95",
                isOpened
                  ? "border-gold/50 bg-gold-soft"
                  : "border-primary/40 bg-primary/10",
              )}
            >
              <span className="text-3xl leading-none sm:text-4xl">{isOpened ? v.emoji : "🎁"}</span>
              <p className="w-full truncate text-center text-[10px] font-semibold leading-tight text-muted-foreground">
                {isOpened ? v.title : "Tap to reveal"}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-5 shrink-0 space-y-3 text-center">
        {all && (
          <div className="animate-pop-in rounded-3xl border border-gold/50 bg-card/85 p-5 backdrop-blur">
            <p className="font-display text-xl leading-snug text-primary">{ALL_UNLOCKED_MESSAGE}</p>
            <button
              type="button"
              onClick={onContinue}
              className="mt-3 w-full rounded-full bg-primary px-6 py-3 font-display text-xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
            >
              Open the last letter 💌
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onBack}
          className="inline-block rounded-full border border-primary/40 bg-card/70 px-5 py-2 text-sm font-semibold text-primary backdrop-blur"
        >
          ← Revisit the journey
        </button>
      </div>

      {/* Voucher modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative h-36 w-full max-w-sm animate-pop-in sm:h-44 sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close voucher"
              onClick={() => setSelected(null)}
              className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow backdrop-blur"
            >
              <X className="h-4 w-4" />
            </button>
            <ScratchCard
              key={selected}
              voucher={VOUCHERS[selected]!}
              opened={!!opened[selected]}
              onOpen={() => onOpen(selected!)}
              horizontal
            />
          </div>
        </div>
      )}
    </div>
  );
}
