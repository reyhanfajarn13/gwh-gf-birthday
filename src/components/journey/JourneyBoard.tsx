import type { ReactNode } from "react";
import { Check, Lock } from "lucide-react";
import { STOPS } from "@/data/journey";
import { cn } from "@/lib/utils";

const SIZE = 8; // 8 x 8 grid -> 28 perimeter tiles

type Cell = { row: number; col: number; edge: "bottom" | "left" | "top" | "right" };

/** Clockwise ring starting at the bottom-right corner, like a Monopoly board. */
function cellFor(i: number): Cell {
  if (i <= 7) return { row: 8, col: 8 - i, edge: "bottom" };
  if (i <= 13) return { row: 15 - i, col: 1, edge: "left" };
  if (i <= 21) return { row: 1, col: i - 13, edge: "top" };
  return { row: i - 20, col: 8, edge: "right" };
}

const GROUP_TINTS = [
  "var(--lavender)",
  "var(--blush)",
  "var(--gold)",
  "color-mix(in oklab, var(--primary) 35%, white)",
  "color-mix(in oklab, var(--blush) 60%, var(--gold))",
];

/** Index of the colour group for every stop (consecutive stops sharing a city). */
function groupIndexes() {
  let g = -1;
  let prev = "";
  return STOPS.map((s) => {
    if (s.city !== prev) {
      g += 1;
      prev = s.city;
    }
    return g;
  });
}

const GROUPS = groupIndexes();
const FIRST_OF_GROUP = STOPS.map((_, i) => i === 0 || GROUPS[i] !== GROUPS[i - 1]);

export function JourneyBoard({
  current,
  answered,
  character,
  onOpen,
  center,
}: {
  current: number;
  answered: boolean[];
  character: string;
  onOpen: (index: number) => void;
  center?: ReactNode;
}) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-2xl px-2 pb-24 pt-3 sm:px-6">
      <div
        className="relative grid aspect-square w-full gap-[2px] rounded-[1.5rem] border-2 border-gold/50 bg-card/70 p-[2px] shadow-card backdrop-blur sm:gap-1 sm:p-2"
        style={{
          gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${SIZE}, minmax(0, 1fr))`,
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-2 rounded-[1rem] bg-secondary/40 px-3 text-center"
          style={{ gridColumn: "2 / 8", gridRow: "2 / 8" }}
        >
          {center}
        </div>

        {STOPS.map((stop, i) => {
          const { row, col, edge } = cellFor(i);
          const done = answered[i];
          const isCurrent = i === current;
          const locked = i > current;
          const tint = GROUP_TINTS[(GROUPS[i] ?? 0) % GROUP_TINTS.length];

          return (
            <div
              key={i}
              style={{ gridColumn: col, gridRow: row }}
              className="relative"
            >
              <button
                type="button"
                disabled={locked}
                onClick={() => onOpen(i)}
                className={cn(
                  "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md border bg-card p-0.5 transition-transform",
                  edge === "bottom" && "pb-1.5",
                  edge === "top" && "pt-1.5",
                  edge === "left" && "pl-1.5",
                  edge === "right" && "pr-1.5",
                  done && "border-gold bg-gold-soft",
                  isCurrent && !done && "border-primary shadow-glow",
                  !done && !isCurrent && "border-border",
                  locked ? "cursor-not-allowed opacity-50" : "hover:scale-[1.06] active:scale-95",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute",
                    edge === "bottom" && "inset-x-0 bottom-0 h-1.5",
                    edge === "top" && "inset-x-0 top-0 h-1.5",
                    edge === "left" && "inset-y-0 left-0 w-1.5",
                    edge === "right" && "inset-y-0 right-0 w-1.5",
                  )}
                  style={{ background: tint }}
                />

                {isCurrent && (
                  <span className="absolute inset-0 animate-ping rounded-md border-2 border-primary/40" />
                )}

                <span className="text-[9px] font-bold leading-none text-muted-foreground">
                  {done ? <Check className="h-2.5 w-2.5 text-gold" /> : i + 1}
                </span>
                <span className="text-base leading-none sm:text-xl" aria-hidden>
                  {locked ? (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  ) : stop.flag ? (
                    <img src={stop.flag} alt={stop.city} className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
                  ) : (
                    stop.icon
                  )}
                </span>
                <span
                  className={cn(
                    "w-full truncate px-0.5 text-[7px] font-semibold leading-tight sm:text-[9px]",
                    isCurrent ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {locked || !FIRST_OF_GROUP[i] ? "" : stop.city}
                </span>
              </button>

              {isCurrent && (
                <span className="pointer-events-none absolute -top-5 -right-1 z-10 animate-float-soft text-4xl">
                  {character}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
