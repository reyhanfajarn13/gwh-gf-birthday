// Efek suara ringan berbasis Web Audio (tanpa file audio).
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOptions = {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
  slideTo?: number;
};

function tone({ freq, duration = 0.16, type = "sine", gain = 0.08, delay = 0, slideTo }: ToneOptions) {
  const audio = getCtx();
  if (!audio) return;
  const start = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + duration);
  vol.gain.setValueAtTime(0.0001, start);
  vol.gain.exponentialRampToValueAtTime(gain, start + 0.015);
  vol.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(vol).connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Klik lembut saat memilih jawaban */
export function playSelect() {
  tone({ freq: 520, slideTo: 780, duration: 0.12, type: "triangle", gain: 0.06 });
}

/** Kilauan saat kartu kenangan / jawaban terbuka */
export function playReveal() {
  tone({ freq: 660, duration: 0.18, type: "sine", gain: 0.07 });
  tone({ freq: 880, duration: 0.2, type: "sine", gain: 0.06, delay: 0.09 });
  tone({ freq: 1180, duration: 0.26, type: "sine", gain: 0.05, delay: 0.18 });
}

/** Desis pendek saat menggosok voucher */
export function playScratch() {
  const audio = getCtx();
  if (!audio) return;
  const length = Math.floor(audio.sampleRate * 0.06);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2400;
  const vol = audio.createGain();
  vol.gain.value = 0.05;
  src.connect(filter).connect(vol).connect(audio.destination);
  src.start();
}

/** Fanfare kecil saat voucher terbuka */
export function playUnlock() {
  tone({ freq: 523, duration: 0.14, type: "triangle", gain: 0.07 });
  tone({ freq: 659, duration: 0.14, type: "triangle", gain: 0.07, delay: 0.1 });
  tone({ freq: 784, duration: 0.24, type: "triangle", gain: 0.07, delay: 0.2 });
  tone({ freq: 1047, duration: 0.3, type: "sine", gain: 0.06, delay: 0.3 });
}

/** Nada lembut saat jawaban salah */
export function playWrong() {
  tone({ freq: 300, slideTo: 180, duration: 0.22, type: "sine", gain: 0.05 });
  tone({ freq: 240, slideTo: 150, duration: 0.24, type: "triangle", gain: 0.04, delay: 0.1 });
}
