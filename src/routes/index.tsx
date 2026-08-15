import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { FinalMessage } from "@/components/journey/FinalMessage";
import { JourneyBoard } from "@/components/journey/JourneyBoard";
import { MusicPlayer } from "@/components/journey/MusicPlayer";
import { RewardsPage } from "@/components/journey/RewardsPage";
import { Sparkles } from "@/components/journey/Sparkles";
import { StopCard } from "@/components/journey/StopCard";
import { WelcomeScreen } from "@/components/journey/WelcomeScreen";
import { FINISH_MESSAGE, RECIPIENT_NAME, STOPS, VOUCHERS } from "@/data/journey";
import { bigCelebration } from "@/lib/celebrate";

const TITLE = `${RECIPIENT_NAME}'s Birthday Journey`;
const DESC =
  "A digital Monopoly board of 28 memory stops from the places we travelled together, ending with 8 special gift vouchers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "journey-ultah-v2";

type SaveState = {
  answers: (number | null)[];
  vouchers: boolean[];
};

const emptyState = (): SaveState => ({
  answers: STOPS.map(() => null),
  vouchers: VOUCHERS.map(() => false),
});

type Screen = "welcome" | "board" | "finish" | "rewards" | "final";

function Index() {
  const [state, setState] = useState<SaveState>(emptyState);
  const [loaded, setLoaded] = useState(false);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [openStop, setOpenStop] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SaveState;
        if (Array.isArray(parsed.answers) && Array.isArray(parsed.vouchers)) {
          const base = emptyState();
          setState({
            answers: base.answers.map((_, i) => parsed.answers[i] ?? null),
            vouchers: base.vouchers.map((_, i) => !!parsed.vouchers[i]),
          });
        }
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, loaded]);

  const answered = state.answers.map((a) => a !== null);
  const answeredCount = answered.filter(Boolean).length;
  const current = Math.min(answeredCount, STOPS.length - 1);
  const allDone = answeredCount === STOPS.length;

  const handleAnswer = useCallback((index: number, choice: number) => {
    setState((s) => {
      const answers = [...s.answers];
      answers[index] = choice;
      return { ...s, answers };
    });
  }, []);

  const handleNext = () => {
    const finishing = openStop === STOPS.length - 1;
    setOpenStop(null);
    if (finishing || allDone) {
      setScreen("finish");
      bigCelebration();
    }
  };

  const openVoucher = (i: number) =>
    setState((s) => {
      const vouchers = [...s.vouchers];
      vouchers[i] = true;
      return { ...s, vouchers };
    });

  const reset = () => {
    setState(emptyState());
    setScreen("welcome");
  };

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <Sparkles />
      <MusicPlayer />

      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("board")} hasProgress={answeredCount > 0} />
      )}

      {screen === "board" && (
        <JourneyBoard
          current={current}
          answered={answered}
          onOpen={(i) => setOpenStop(i)}
          center={
            <>
              <h1 className="font-display text-3xl leading-none text-gradient sm:text-4xl">
                {RECIPIENT_NAME}'s Birthday Journey
              </h1>
              <p className="text-[11px] font-semibold text-muted-foreground sm:text-xs">
                Stop {Math.min(answeredCount + 1, STOPS.length)} of {STOPS.length}
              </p>
              <div className="h-2 w-4/5 overflow-hidden rounded-full bg-card">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(answeredCount / STOPS.length) * 100}%` }}
                />
              </div>
              {allDone && (
                <button
                  type="button"
                  onClick={() => setScreen("rewards")}
                  className="rounded-full bg-primary px-5 py-2 font-display text-xl text-primary-foreground shadow-glow sm:px-8 sm:py-3 sm:text-2xl"
                >
                  Open the Gifts 🎁
                </button>
              )}
            </>
          }
        />
      )}

      {screen === "finish" && (
        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col items-center justify-center px-6 text-center">
          <div className="animate-pop-in rounded-[2rem] border border-gold/40 bg-card/85 p-8 shadow-card backdrop-blur">
            <span className="text-5xl">🎉</span>
            <h2 className="mt-3 font-display text-4xl text-gradient">Journey complete!</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{FINISH_MESSAGE}</p>
            <button
              type="button"
              onClick={() => setScreen("rewards")}
              className="mt-6 w-full rounded-full bg-primary px-6 py-4 font-display text-2xl text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
            >
              Open the Gifts 🎁
            </button>
          </div>
        </div>
      )}

      {screen === "rewards" && (
        <RewardsPage
          opened={state.vouchers}
          onOpen={openVoucher}
          onBack={() => setScreen("board")}
          onContinue={() => setScreen("final")}
        />
      )}

      {screen === "final" && <FinalMessage onReplay={reset} />}

      {openStop !== null && STOPS[openStop] && (
        <StopCard
          stop={STOPS[openStop]}
          index={openStop}
          answeredIndex={state.answers[openStop] ?? null}
          onAnswer={(choice) => handleAnswer(openStop, choice)}
          onNext={handleNext}
          onClose={() => setOpenStop(null)}
        />
      )}

      {screen !== "welcome" && (
        <button
          type="button"
          onClick={reset}
          className="fixed bottom-5 left-5 z-40 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur"
        >
          Restart
        </button>
      )}
    </main>
  );
}
