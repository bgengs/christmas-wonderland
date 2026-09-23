import type { Song, Ambience } from "@/data/songs";

// ─── Generative music-box engine ─────────────────────────────────────────────
// Renders each song's original arrangement live: plucked melody through a
// generated hall reverb over a soft pad, plus a looping scene ambience bed.

const AMBIENCE_SRC: Record<Ambience, string> = {
  fireplace: "/assets/audio/fireplace.mp3",
  "winter-wind": "/assets/audio/winter-wind.mp3",
  "music-box": "/assets/audio/music-box.mp3",
};

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private reverb: ConvolverNode | null = null;
  private timer: number | null = null;
  private noteIdx = 0;
  private nextTime = 0;
  private measureBeat = 0;
  private song: Song | null = null;
  private startedAt = 0;
  private pausedAt = 0;
  playing = false;
  private ambienceEl: HTMLAudioElement | null = null;
  private ambienceKind: Ambience | null = null;
  private onTick: ((elapsed: number, loopDur: number) => void) | null = null;

  private ensureCtx() {
    if (this.ctx) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.85;
    this.master.connect(this.ctx.destination);
    // Generated hall impulse — 2.8s exponential decay noise
    const rate = this.ctx.sampleRate;
    const len = Math.floor(rate * 2.8);
    const impulse = this.ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
    }
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = impulse;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.5;
    this.reverb.connect(wet);
    wet.connect(this.master);
  }

  private freq(midi: number) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private pluck(midi: number, t: number, vel = 1) {
    if (!this.ctx || !this.master || !this.reverb) return;
    const f = this.freq(midi);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.24 * vel, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 2.2);
    const o1 = this.ctx.createOscillator();
    o1.type = "triangle";
    o1.frequency.value = f;
    const o2 = this.ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = f * 2;
    const g2 = this.ctx.createGain();
    g2.gain.value = 0.35;
    o1.connect(g);
    o2.connect(g2);
    g2.connect(g);
    g.connect(this.master);
    g.connect(this.reverb);
    o1.start(t);
    o2.start(t);
    o1.stop(t + 2.4);
    o2.stop(t + 2.4);
  }

  private pad(chord: number[], t: number, dur: number) {
    if (!this.ctx || !this.master || !this.reverb) return;
    for (const midi of chord) {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + dur * 0.3);
      g.gain.linearRampToValueAtTime(0.0001, t + dur * 1.05);
      const o = this.ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = this.freq(midi - 12);
      o.connect(g);
      g.connect(this.master);
      g.connect(this.reverb);
      o.start(t);
      o.stop(t + dur * 1.1);
    }
  }

  private loopDuration(song: Song) {
    const beats = song.melody.reduce((a, [, b]) => a + b, 0);
    return (beats / song.tempo) * 60;
  }

  private schedule = () => {
    if (!this.ctx || !this.song || !this.playing) return;
    const song = this.song;
    const spb = 60 / song.tempo; // seconds per beat
    const ahead = this.ctx.currentTime + 0.4;
    while (this.nextTime < ahead) {
      const [midi, beats] = song.melody[this.noteIdx];
      // accent the first note of each measure-group lightly
      this.pluck(midi, this.nextTime, this.noteIdx % 4 === 0 ? 1 : 0.82);
      if (this.measureBeat % 4 === 0) {
        const chord = song.chords[Math.floor(this.measureBeat / 4) % song.chords.length];
        this.pad(chord, this.nextTime, spb * 4);
      }
      this.measureBeat += beats;
      this.nextTime += beats * spb;
      this.noteIdx = (this.noteIdx + 1) % song.melody.length;
    }
    if (this.onTick && this.ctx) {
      this.onTick(this.pausedAt + (this.ctx.currentTime - this.startedAt), this.loopDuration(song));
    }
  };

  setOnTick(cb: ((elapsed: number, loopDur: number) => void) | null) {
    this.onTick = cb;
  }

  get currentSong() {
    return this.song;
  }

  async play(song: Song) {
    this.ensureCtx();
    if (this.ctx!.state === "suspended") await this.ctx!.resume();
    this.stopScheduler();
    this.song = song;
    this.noteIdx = 0;
    this.measureBeat = 0;
    this.pausedAt = 0;
    this.nextTime = this.ctx!.currentTime + 0.1;
    this.startedAt = this.ctx!.currentTime;
    this.playing = true;
    this.timer = window.setInterval(this.schedule, 90);
    this.schedule();
    this.startAmbience(song.ambience);
  }

  pause() {
    if (!this.playing || !this.ctx) return;
    this.pausedAt += this.ctx.currentTime - this.startedAt;
    this.playing = false;
    this.stopScheduler();
    this.fadeAmbience(0.0);
  }

  async resume() {
    if (!this.song || this.playing) return;
    this.ensureCtx();
    if (this.ctx!.state === "suspended") await this.ctx!.resume();
    this.nextTime = this.ctx!.currentTime + 0.1;
    this.startedAt = this.ctx!.currentTime;
    this.playing = true;
    this.timer = window.setInterval(this.schedule, 90);
    this.fadeAmbience(0.22);
  }

  stop() {
    this.playing = false;
    this.song = null;
    this.pausedAt = 0;
    this.stopScheduler();
    this.stopAmbience();
  }

  private stopScheduler() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  startAmbience(kind: Ambience) {
    if (this.ambienceKind === kind && this.ambienceEl) {
      this.fadeAmbience(0.22);
      return;
    }
    this.stopAmbience();
    this.ambienceKind = kind;
    const el = new Audio(AMBIENCE_SRC[kind]);
    el.loop = true;
    el.volume = 0;
    el.play().catch(() => {});
    this.ambienceEl = el;
    this.fadeAmbience(0.22);
  }

  private fadeAmbience(target: number) {
    const el = this.ambienceEl;
    if (!el) return;
    const from = el.volume;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      el.volume = from + (target - from) * p;
      if (p < 1 && this.ambienceEl === el) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  stopAmbience() {
    if (this.ambienceEl) {
      this.ambienceEl.pause();
      this.ambienceEl = null;
    }
    this.ambienceKind = null;
  }
}

export const engine = new MusicEngine();
