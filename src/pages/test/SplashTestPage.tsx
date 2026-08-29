/**
 * SplashTestPage — prototype of the native Android splash (2s).
 * Sequence: logo → silver light sweep → morph into the "megsy" wordmark → app.
 * Route: /test (design preview only, not part of the product flow).
 */
import { useCallback, useEffect, useState } from "react";

const DURATION = 2000;

export default function SplashTestPage() {
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const t = setTimeout(() => setDone(true), DURATION + 250);
    return () => clearTimeout(t);
  }, [runId]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <style>{`
        @keyframes megsy-logo-in {
          0%   { opacity: 0; transform: scale(.86); }
          18%  { opacity: 1; transform: scale(1); }
          52%  { opacity: 1; transform: scale(1); }
          66%  { opacity: 0; transform: scale(.92); }
          100% { opacity: 0; transform: scale(.92); }
        }
        @keyframes megsy-sweep {
          0%, 18%  { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
          26%      { opacity: 1; }
          52%      { transform: translateX(160%) skewX(-18deg); opacity: 0; }
          100%     { transform: translateX(160%) skewX(-18deg); opacity: 0; }
        }
        @keyframes megsy-word-in {
          0%, 58%  { opacity: 0; transform: translateY(10px) scale(.96); letter-spacing: .34em; }
          78%      { opacity: 1; transform: translateY(0) scale(1); letter-spacing: .16em; }
          100%     { opacity: 1; transform: translateY(0) scale(1); letter-spacing: .16em; }
        }
        @keyframes megsy-shine {
          0%, 60% { background-position: -220% 0; }
          100%    { background-position: 220% 0; }
        }
        @keyframes megsy-halo {
          0%   { opacity: 0; transform: scale(.7); }
          40%  { opacity: .5; transform: scale(1); }
          100% { opacity: .18; transform: scale(1.25); }
        }
        @media (prefers-reduced-motion: reduce) {
          .megsy-splash * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <div
        key={runId}
        className="megsy-splash absolute inset-0 grid place-items-center"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 20%, #D449F5 0%, #C527ED 42%, #8E11B0 100%)",
        }}
      >
        {/* soft halo behind the mark */}
        <div
          className="pointer-events-none absolute h-[46vmin] w-[46vmin] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,.35), transparent 65%)",
            filter: "blur(28px)",
            animation: `megsy-halo ${DURATION}ms ease-out forwards`,
          }}
        />

        {/* logo + silver sweep */}
        <div
          className="absolute"
          style={{ animation: `megsy-logo-in ${DURATION}ms cubic-bezier(.22,1,.36,1) forwards` }}
        >
          <div className="relative h-[30vmin] w-[30vmin] overflow-hidden">
            <svg viewBox="0 0 512 512" className="h-full w-full" aria-hidden="true">
              <g fill="#ffffff">
                <rect x="110" y="86" width="140" height="272" rx="34" transform="rotate(4 180 222)" />
                <rect x="266" y="146" width="140" height="288" rx="34" transform="rotate(4 336 290)" />
              </g>
            </svg>
            {/* clean silver light passing through the mark */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, transparent 38%, rgba(255,255,255,.15) 46%, rgba(226,232,240,.95) 50%, rgba(255,255,255,.15) 54%, transparent 62%)",
                mixBlendMode: "screen",
                filter: "blur(1px)",
                animation: `megsy-sweep ${DURATION}ms cubic-bezier(.4,0,.2,1) forwards`,
              }}
            />
          </div>
        </div>

        {/* wordmark */}
        <div
          className="absolute select-none text-[11vmin] font-semibold lowercase leading-none"
          style={{
            fontFamily: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
            animation: `megsy-word-in ${DURATION}ms cubic-bezier(.22,1,.36,1) forwards`,
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(100deg, #ffffff 40%, #e8ecf4 47%, #ffffff 54%, #ffffff 100%)",
              backgroundSize: "220% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: `megsy-shine ${DURATION}ms ease-out forwards`,
            }}
          >
            megsy
          </span>
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
          {done ? "انتهى — التطبيق يفتح هنا" : "جارٍ التشغيل…"} · 2s
        </span>
      </div>
    </div>
  );
}
