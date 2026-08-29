/**
 * SplashTestPage — prototype of the native Android splash (~2s).
 *
 * Technique (borrowed from the SVG "wordmark reveal + specular sweep" pattern):
 * the silver light is a gradient band masked to the logo geometry itself, so it
 * travels *through* the mark instead of sitting on a rectangle above it.
 *
 * Sequence: logo settles -> silver specular sweep -> slabs collapse into the
 * "megsy" wordmark (staggered letters + gloss pass) -> app.
 * Route: /test (design preview only).
 */
import { useCallback, useEffect, useState } from "react";

const DURATION = 2000;
const LETTERS = ["m", "e", "g", "s", "y"];

export default function SplashTestPage() {
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const t = setTimeout(() => setDone(true), DURATION + 200);
    return () => clearTimeout(t);
  }, [runId]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <style>{`
        @keyframes ms-mark {
          0%   { opacity: 0; transform: scale(.9) translateY(6px); }
          14%  { opacity: 1; transform: scale(1) translateY(0); }
          54%  { opacity: 1; transform: scale(1) translateY(0); }
          64%  { opacity: 0; transform: scale(1.06) translateY(-6px); }
          100% { opacity: 0; transform: scale(1.06) translateY(-6px); }
        }
        @keyframes ms-slab-l {
          0%, 54% { transform: translateX(0) rotate(4deg); }
          64%     { transform: translateX(6%) rotate(0deg); }
          100%    { transform: translateX(6%) rotate(0deg); }
        }
        @keyframes ms-slab-r {
          0%, 54% { transform: translateX(0) rotate(4deg); }
          64%     { transform: translateX(-6%) rotate(0deg); }
          100%    { transform: translateX(-6%) rotate(0deg); }
        }
        @keyframes ms-letter {
          0%   { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes ms-gloss {
          0%   { transform: translateX(-130%) skewX(-16deg); }
          100% { transform: translateX(130%) skewX(-16deg); }
        }
        @keyframes ms-halo {
          0%   { opacity: 0; transform: scale(.75); }
          35%  { opacity: .55; transform: scale(1); }
          100% { opacity: .22; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-splash * { animation-duration: .01ms !important; }
        }
      `}</style>

      <div
        key={runId}
        className="ms-splash absolute inset-0 grid place-items-center"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 18%, #DA57F8 0%, #C527ED 45%, #7C0D9C 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute h-[52vmin] w-[52vmin] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,.4), transparent 66%)",
            filter: "blur(34px)",
            animation: `ms-halo ${DURATION}ms ease-out forwards`,
          }}
        />

        {/* ── Logo mark with masked specular sweep ─────────────── */}
        <svg
          viewBox="0 0 512 512"
          className="absolute h-[32vmin] w-[32vmin]"
          aria-hidden="true"
          style={{ animation: `ms-mark ${DURATION}ms cubic-bezier(.22,1,.36,1) forwards` }}
        >
          <defs>
            <linearGradient id="ms-silver" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="38%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="47%" stopColor="#f2f5fb" stopOpacity=".55" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="53%" stopColor="#cdd6e6" stopOpacity=".85" />
              <stop offset="62%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-1.2 0; 1.2 0"
                keyTimes="0; 1"
                begin="0.3s"
                dur="0.85s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </linearGradient>
            <mask id="ms-mask">
              <g fill="#fff">
                <rect x="110" y="86" width="140" height="272" rx="34" />
                <rect x="266" y="146" width="140" height="288" rx="34" />
              </g>
            </mask>
          </defs>

          <g
            style={{
              transformOrigin: "180px 222px",
              animation: `ms-slab-l ${DURATION}ms cubic-bezier(.65,0,.35,1) forwards`,
            }}
          >
            <rect x="110" y="86" width="140" height="272" rx="34" fill="#fff" />
          </g>
          <g
            style={{
              transformOrigin: "336px 290px",
              animation: `ms-slab-r ${DURATION}ms cubic-bezier(.65,0,.35,1) forwards`,
            }}
          >
            <rect x="266" y="146" width="140" height="288" rx="34" fill="#fff" />
          </g>

          {/* silver band, clipped to the mark */}
          <rect
            x="-256"
            y="-256"
            width="1024"
            height="1024"
            fill="url(#ms-silver)"
            mask="url(#ms-mask)"
            style={{ mixBlendMode: "screen" }}
          />
        </svg>

        {/* ── Wordmark ─────────────────────────────────────────── */}
        <div
          className="absolute flex select-none items-baseline overflow-hidden"
          style={{ height: "1.2em", fontSize: "12vmin" }}
        >
          <div className="relative flex">
            {LETTERS.map((ch, i) => (
              <span
                key={ch + i}
                className="block font-semibold leading-none text-white"
                style={{
                  fontFamily: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
                  letterSpacing: "0.02em",
                  opacity: 0,
                  animation: `ms-letter 420ms cubic-bezier(.22,1,.36,1) forwards`,
                  animationDelay: `${1180 + i * 60}ms`,
                }}
              >
                {ch}
              </span>
            ))}
            {/* gloss pass over the finished wordmark */}
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)",
                mixBlendMode: "overlay",
                animation: `ms-gloss 620ms cubic-bezier(.4,0,.2,1) 1500ms both`,
              }}
            />
          </div>
        </div>
      </div>

      {/* preview controls (test page only) */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2">
        <button
          onClick={replay}
          className="rounded-full bg-background/85 px-5 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur transition hover:opacity-90"
        >
          إعادة التشغيل
        </button>
        <span className="text-xs text-white/70">
          {done ? "انتهى — التطبيق يفتح فورًا" : "جارٍ التشغيل…"} · 2s
        </span>
      </div>
    </div>
  );
}
