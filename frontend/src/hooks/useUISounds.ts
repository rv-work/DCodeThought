"use client";

/**
 * Step 1: Globally extend the Window interface.
 * This ensures TypeScript knows about webkitAudioContext
 * without needing manual casting (as CustomWindow) everywhere.
 */
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export function useUISounds() {
  /**
   * Helper to safely retrieve the AudioContext class.
   * Checks for SSR (window existence) and vendor prefixes.
   */
  const getAudioContextClass = () => {
    if (typeof window === "undefined") return null;
    return window.AudioContext || window.webkitAudioContext;
  };

  const playPop = async () => {
    try {
      const AudioContextClass = getAudioContextClass();
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();

      // Essential for Chrome/Safari: resume context if it's suspended
      if (ctx.state === "suspended") await ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);

      // Cleanup: Close context after sound finishes to save memory
      setTimeout(() => ctx.close(), 200);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  };

  const playLevelUp = async () => {
    try {
      const AudioContextClass = getAudioContextClass();
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();

      if (ctx.state === "suspended") await ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";

      // Arpeggio: A4 -> C#5 -> E5
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      setTimeout(() => ctx.close(), 500);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  };

  return { playPop, playLevelUp };
}
