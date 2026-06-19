import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { name: "Himalayan Dawn",  mood: "Tibetan bowls · soft flute" },
  { name: "Palace Gardens",  mood: "Sitar · wind chimes" },
  { name: "Evening Ritual",  mood: "Meditation pads · bells" },
];

/**
 * Persistent ambient music player.
 * Tracks are placeholders — wire `audio.src` to real ambient files
 * (or generate them via the ElevenLabs Music API) when ready.
 * The UI is fully functional: play / pause / volume / mute / track cycle / visualizer.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.55);
  const [trackIdx, setTrackIdx] = useState(0);
  const [open, setOpen] = useState(false);

  // Visualizer bars react to a rough fake amplitude when playing
  const [bars, setBars] = useState<number[]>(Array.from({ length: 5 }, () => 0.3));
  useEffect(() => {
    if (!playing || muted) return;
    const id = setInterval(() => {
      setBars(Array.from({ length: 5 }, () => 0.25 + Math.random() * 0.75));
    }, 180);
    return () => clearInterval(id);
  }, [playing, muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = volume;
      a.muted = muted;
    }
  }, [volume, muted]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      setMuted(false);
      a.muted = false;
      a.play().catch(() => {
        // No source wired yet — keep UI "playing" so visualizer still animates
        setPlaying(true);
      });
      setPlaying(true);
    }
  };

  const track = TRACKS[trackIdx];

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Expanded panel */}
      {open && (
        <div className="glass mb-3 w-72 rounded-2xl p-4 text-ivory">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Now Playing</span>
            <button
              onClick={() => setOpen(false)}
              className="text-ivory/60 hover:text-gold"
              aria-label="Collapse"
            >
              ✕
            </button>
          </div>
          <div className="mb-3">
            <div className="font-display text-lg gold-text">{track.name}</div>
            <div className="text-xs text-ivory/60">{track.mood}</div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={() => setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length)}
              className="text-ivory/70 hover:text-gold"
              aria-label="Previous track"
            >
              ◀◀
            </button>
            <button
              onClick={toggle}
              className="gold-gradient flex h-9 w-9 items-center justify-center rounded-full text-indigo-night"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button
              onClick={() => setTrackIdx((i) => (i + 1) % TRACKS.length)}
              className="text-ivory/70 hover:text-gold"
              aria-label="Next track"
            >
              ▶▶
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              className="ml-auto text-ivory/70 hover:text-gold"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-[var(--gold)]"
            aria-label="Volume"
          />
          <p className="mt-3 text-[10px] leading-relaxed text-ivory/40">
            Connect your ambient tracks via the audio source to fill the palace with sound.
          </p>
        </div>
      )}

      {/* Pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass flex items-center gap-3 rounded-full pl-2 pr-4 py-2 text-ivory shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="gold-gradient flex h-9 w-9 items-center justify-center rounded-full text-indigo-night"
          aria-hidden
        >
          {playing && !muted ? "❚❚" : "▶"}
        </span>
        <span className="hidden flex-col text-left sm:flex">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">Ambient</span>
          <span className="font-display text-sm leading-none">{track.name}</span>
        </span>
        <span className="ml-1 flex h-6 items-end gap-[2px]" aria-hidden>
          {bars.map((b, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-gold-deep to-gold transition-[height] duration-200"
              style={{ height: `${(playing && !muted ? b : 0.2) * 22}px` }}
            />
          ))}
        </span>
      </button>

      {/* Silent placeholder audio — swap src with real track later */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        // Tiny silent WAV (data URI) — replace with real ambient track
        src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
      />
    </div>
  );
}
