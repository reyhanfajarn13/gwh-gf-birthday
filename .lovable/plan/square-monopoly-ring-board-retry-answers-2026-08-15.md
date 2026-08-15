# Square Monopoly Ring Board + Retry Answers

## 1. Board becomes a real Monopoly square

Replace the winding vertical path with a square ring: all 28 stops sit on the perimeter of a square (corners included), walked clockwise starting bottom-right, exactly like a Monopoly board.

- Tiles on the top/bottom edges are laid horizontally, tiles on the left/right edges vertically; the four corner tiles are larger.
- Each tile shows its place icon, the stop number, and a short place label; completed tiles get a gold check, the current tile pulses with the fairy marker, locked tiles stay dimmed with a lock.
- The empty middle holds the title, progress ("Stop 7 of 28"), and the "Open the Gifts" button once everything is answered.
- The board scales to the viewport width so it stays fully visible on a phone (square aspect ratio, tile text shrinks on small screens); a light zoom/pan is not needed.

## 2. Grouping by place

Stops keep their existing order but are visually grouped by country/place, Monopoly-property style:

- Each place group (Earth, South America, England x3, Scotland, Lake, Singapore x5, Australia x4, Japan x4, Malaysia x2, Thailand x2, Indonesia x3, Earth-finale) gets its own colour band drawn along the outer edge of its tiles, so Japan's 3 questions read as one property block, Singapore's 5 as another, and so on.
- The group name is printed once per band; individual tiles inside a band show only icon + number, keeping them readable.
- Group colours come from the existing lavender/pink/gold palette tokens — no new hardcoded colours.

## 3. Wrong answer = try again, sweetly

Current behaviour locks the answer on first pick. New behaviour:

- Picking a wrong option shakes that option gently, tints it soft pink, and shows a sweet line (rotating messages such as "Almost, sayang… try again 💜", "Not quite, but I still love you — one more try 🌸", "Hmm, close! Guess again, my love ✨").
- The wrong option stays visible but dimmed and disabled; the remaining options stay clickable until the correct one is chosen.
- Only the correct pick reveals the memory text, fires confetti + the reveal sound, and enables "Continue".
- The saved progress stores the correct answer once found, so a stop counts as done exactly as it does today.

## Technical notes

- `JourneyBoard.tsx` rewritten to compute perimeter tile positions from `STOPS.length` (percentage-based grid inside an `aspect-square` container) instead of the sine-wave layout; group bands derived by scanning consecutive stops sharing the same `city`.
- `StopCard.tsx` state changes from a single `choice` to `wrongPicks: number[]` plus `solved: boolean`; `onAnswer` is only called when the correct index is picked, so `src/routes/index.tsx` state logic and localStorage shape stay unchanged.
- Shake animation added as a keyframe in `src/styles.css`; wrong-answer sound reuses the existing `sfx.ts` helpers (short low blip) — no new dependencies.
- Content in `src/data/journey.ts` is untouched.
