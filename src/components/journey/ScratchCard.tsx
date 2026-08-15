import { useEffect, useRef, useState } from "react";
import { Gift } from "lucide-react";
import type { Voucher } from "@/data/journey";
import { burst } from "@/lib/celebrate";
import { playScratch, playUnlock } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export function ScratchCard({
  voucher,
  opened,
  onOpen,
  horizontal = false,
}: {
  voucher: Voucher;
  opened: boolean;
  onOpen: () => void;
  horizontal?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const lastSfx = useRef(0);
  const [revealed, setRevealed] = useState(opened);

  useEffect(() => {
    if (opened) setRevealed(true);
  }, [opened]);

  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#7c3aed");
    grad.addColorStop(0.5, "#c084fc");
    grad.addColorStop(1, "#f0abfc");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ scratch here ✦", rect.width / 2, rect.height / 2 + 6);
  }, [revealed]);

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    onOpen();
    playUnlock();
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) burst((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight);
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 22, 0, Math.PI * 2);
    ctx.fill();
    const now = Date.now();
    if (now - lastSfx.current > 70) {
      lastSfx.current = now;
      playScratch();
    }
    checkProgress(ctx, canvas);
  };

  const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 40) > 0.45) reveal();
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative select-none overflow-hidden rounded-3xl border border-gold/50 bg-card shadow-glow",
        !horizontal && "h-52",
        horizontal && "h-full w-full",
        revealed && "animate-pop-in",
      )}
    >
      <div
        className={cn(
          "flex h-full items-center",
          horizontal
            ? "flex-row gap-5 px-6 text-left"
            : "flex-col justify-center gap-1 px-4 text-center",
        )}
      >
        <span className={cn("leading-none", horizontal ? "shrink-0 text-5xl" : "text-3xl")}>
          {voucher.emoji}
        </span>
        <div className={horizontal ? undefined : "flex flex-col gap-1"}>
          <p className="font-display text-2xl leading-tight text-primary">{voucher.title}</p>
          <p className="text-[11px] leading-snug text-muted-foreground">{voucher.description}</p>
        </div>
      </div>

      {!revealed && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={(e) => {
              drawing.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratchAt(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => drawing.current && scratchAt(e.clientX, e.clientY)}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
          />
          <button
            type="button"
            onClick={reveal}
            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-card/85 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur"
          >
            <Gift className="h-3 w-3" /> open instantly
          </button>
        </>
      )}
    </div>
  );
}
