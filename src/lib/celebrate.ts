import confetti from "canvas-confetti";

const COLORS = ["#a855f7", "#e9a8ff", "#f9c8e0", "#f6d98a", "#fff6e5"];

export function burst(x = 0.5, y = 0.6) {
  confetti({
    particleCount: 60,
    spread: 70,
    startVelocity: 30,
    scalar: 0.9,
    origin: { x, y },
    colors: COLORS,
  });
}

export function bigCelebration() {
  const end = Date.now() + 1600;
  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
