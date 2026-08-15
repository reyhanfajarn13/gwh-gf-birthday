const STARS = [
  { top: "8%", left: "12%", size: 10, delay: "0s" },
  { top: "18%", left: "78%", size: 14, delay: "0.6s" },
  { top: "34%", left: "6%", size: 8, delay: "1.2s" },
  { top: "46%", left: "88%", size: 12, delay: "0.3s" },
  { top: "62%", left: "16%", size: 9, delay: "1.6s" },
  { top: "74%", left: "72%", size: 13, delay: "0.9s" },
  { top: "88%", left: "34%", size: 8, delay: "2s" },
  { top: "26%", left: "44%", size: 7, delay: "1.4s" },
];

export function Sparkles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle text-gold"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: s.delay,
          }}
        >
          ✦
        </span>
      ))}
      <span className="absolute right-6 top-10 animate-float-soft text-4xl opacity-40">🌙</span>
      <span className="absolute left-4 top-40 animate-float-soft text-3xl opacity-30 [animation-delay:1.5s]">
        ☁️
      </span>
      <span className="absolute bottom-24 right-10 animate-float-soft text-3xl opacity-30 [animation-delay:2.2s]">
        ☁️
      </span>
    </div>
  );
}
