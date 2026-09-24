import type { Song, Ambience } from "@/data/songs";

// ─── Playback engine ─────────────────────────────────────────────────────────
// Streams each song's real recording, with a looping scene ambience bed
// (fireplace / winter wind / music box) faded in underneath, so the
// snow-globe atmosphere carries through every scene.

const AMBIENCE_SRC: Record<Ambience, string> = {
  fireplace: "/assets/audio/fireplace.mp3",
  "winter-wind": "/assets/audio/winter-wind.mp3",
  "music-box": "/assets/audio/music-box.mp3",
};

class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  private song: Song | null = null;
  playing = false;
  private ambienceEl: HTMLAudioElement | null = null;
  private ambienceKind: Ambience | null = null;
  private onTick: ((elapsed: number, duration: number) => void) | null = null;
  private onEnded: (() => void) | null = null;

  private detachAudio() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.onended = null;
    this.audio.ontimeupdate = null;
    this.audio = null;
  }

  setOnTick(cb: ((elapsed: number, duration: number) => void) | null) {
    this.onTick = cb;
  }

  setOnEnded(cb: (() => void) | null) {
    this.onEnded = cb;
  }

  get currentSong() {
    return this.song;
  }

  async play(song: Song) {
    this.detachAudio();
    this.song = song;
    const el = new Audio(song.audio);
    el.preload = "auto";
    el.ontimeupdate = () => {
      if (this.onTick && Number.isFinite(el.duration)) {
        this.onTick(el.currentTime, el.duration);
      }
    };
    el.onended = () => {
      this.playing = false;
      this.fadeAmbience(0);
      if (this.onEnded) this.onEnded();
    };
    this.audio = el;
    this.playing = true;
    this.startAmbience(song.ambience);
    try {
      await el.play();
    } catch {
      this.playing = false;
    }
  }

  pause() {
    if (!this.playing || !this.audio) return;
    this.audio.pause();
    this.playing = false;
    this.fadeAmbience(0);
  }

  async resume() {
    if (!this.song || this.playing || !this.audio) return;
    this.playing = true;
    this.fadeAmbience(0.16);
    try {
      await this.audio.play();
    } catch {
      this.playing = false;
    }
  }

  stop() {
    this.playing = false;
    this.song = null;
    this.detachAudio();
    this.stopAmbience();
  }

  startAmbience(kind: Ambience) {
    if (this.ambienceKind === kind && this.ambienceEl) {
      this.fadeAmbience(0.16);
      return;
    }
    this.stopAmbience();
    this.ambienceKind = kind;
    const el = new Audio(AMBIENCE_SRC[kind]);
    el.loop = true;
    el.volume = 0;
    el.play().catch(() => {});
    this.ambienceEl = el;
    this.fadeAmbience(0.16);
  }

  private fadeAmbience(target: number) {
    const el = this.ambienceEl;
    if (!el) return;
    const from = el.volume;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      el.volume = Math.max(0, Math.min(1, from + (target - from) * p));
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
