/**
 * SplashTestPage — prototype of the native Android splash (~2.2s).
 *
 * Beats:
 *  0.00s  deep purple bloom breathes open
 *  0.10s  the two slabs fly in from opposite edges and lock into the mark
 *  0.55s  a silver specular band travels *through* the mark (masked to its shape)
 *  1.05s  mark lifts + dissolves, wordmark wipes up behind it
 *  1.65s  single gloss pass, then the app opens
 *
 * Route: /test (design preview only).
 */
import { useCallback, useEffect, useState } from "react";

const DURATION = 2200;

export default function SplashTestPage() {
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    const t = setTimeout(() => setDone(true), DURATION + 150);
    return () => clearTimeout(t);
  }, [runId]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#2A0136]">
      <style>{`
        .ms-splash { --e: cubic-bezier(.16,1,.3,1); }

        @keyframes ms-bg {
          0%   { transform: scale(1.25); opacity: 0; }
          22%  { transform: scale(1);    opacity: 1; }
          100% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes ms-bloom {
          0%   { opacity: 0;  transform: scale(.6); }
          30%  { opacity: .8; transform: scale(1); }
          70%  { opacity: .45; transform: scale(1.15); }
          100% { opacity: .7; transform: scale(1.05); }
        }
        /* slabs fly in, overshoot, settle */
        @keyframes ms-in-l {
          0%   { transform: translate(-70%, 22%) rotate(-18deg); opacity: 0; }
          45%  { transform: translate(2%, -1%)   rotate(2deg);   opacity: 1; }
          60%  { transform: translate(0, 0)      rotate(0deg);   opacity: 1; }
          100% { transform: translate(0, 0)      rotate(0deg);   opacity: 1; }
        }
        @keyframes ms-in-r {
          0%   { transform: translate(70%, -22%) rotate(18deg);  opacity: 0; }
          45%  { transform: translate(-2%, 1%)   rotate(-2deg);  opacity: 1; }
          60%  { transform: translate(0, 0)      rotate(0deg);   opacity: 1; }
          100% { transform: translate(0, 0)      rotate(0deg);   opacity: 1; }
        }
        /* whole mark: settle, then lift away */
        @keyframes ms-mark {
          0%,44%  { opacity: 1; transform: scale(1)    translateY(0); filter: blur(0); }
          58%     { opacity: 0; transform: scale(1.18) translateY(-9%); filter: blur(7px); }
          100%    { opacity: 0; transform: scale(1.18) translateY(-9%); filter: blur(7px); }
        }
        /* impact ring when the slabs lock */
        @keyframes ms-ring {
          0%   { opacity: 0;  transform: scale(.55); }
          10%  { opacity: .55; }
          100% { opacity: 0;  transform: scale(1.9); }
        }
        /* wordmark wipe */
        @keyframes ms-word {
          0%   { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateY(16px); letter-spacing: .3em; }
          100% { clip-path: inset(0 0 -12% 0); opacity: 1; transform: translateY(0);    letter-spacing: .02em; }
        }
        @keyframes ms-gloss {
          0%   { transform: translateX(-160%) skewX(-14deg); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateX(160%)  skewX(-14deg); opacity: 0; }
        }
        @keyframes ms-underline {
          0%   { transform: scaleX(0); opacity: 0; }
          60%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: .75; }
        }
        .ms-word {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          text-shadow: 0 6px 26px rgba(58,2,80,.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-splash *, .ms-splash { animation-duration: .01ms !important; animation-delay: 0ms !important; }
        }
      `}</style>

      <div key={runId} className="ms-splash absolute inset-0 grid place-items-center">
        {/* background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 90% at 50% 16%, #E56BFF 0%, #C527ED 38%, #7A0C9B 70%, #3A0250 100%)",
            animation: `ms-bg ${DURATION}ms var(--e) forwards`,
          }}
        />
        {/* soft bloom behind the logo */}
        <div
          className="pointer-events-none absolute h-[58vmin] w-[58vmin] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,.55), transparent 65%)",
            filter: "blur(44px)",
            animation: `ms-bloom ${DURATION}ms var(--e) forwards`,
          }}
        />
        {/* impact ring */}
        <div
          className="pointer-events-none absolute h-[34vmin] w-[34vmin] rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,.7)",
            opacity: 0,
            animation: `ms-ring 900ms var(--e) 520ms forwards`,
          }}
        />

        {/* ── Logo mark with masked specular sweep ─────────────── */}
        <svg
          viewBox="0 0 512 512"
          className="absolute h-[30vmin] w-[30vmin]"
          aria-hidden="true"
          style={{ animation: `ms-mark ${DURATION}ms var(--e) forwards` }}
        >
          <defs>
            <linearGradient id="ms-silver" x1="0" y1="0" x2="1" y2="0">
              <stop offset="34%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="45%" stopColor="#eef3ff" stopOpacity=".5" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#c8d3e8" stopOpacity=".8" />
              <stop offset="66%" stopColor="#ffffff" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-1.3 0; 1.3 0"
                begin="0.55s"
                dur="0.75s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3 0 0.1 1"
              />
            </linearGradient>
            <mask id="ms-mask">
              <g fill="#fff">
                <rect x="110" y="86" width="140" height="272" rx="34" />
                <rect x="266" y="146" width="140" height="288" rx="34" />
              </g>
            </mask>
            <filter id="ms-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#3A0250" floodOpacity=".35" />
            </filter>
          </defs>

          <g filter="url(#ms-soft)">
            <g style={{ animation: `ms-in-l ${DURATION}ms var(--e) forwards` }}>
              <rect x="110" y="86" width="140" height="272" rx="34" fill="#fff" />
            </g>
            <g style={{ animation: `ms-in-r ${DURATION}ms var(--e) forwards` }}>
              <rect x="266" y="146" width="140" height="288" rx="34" fill="#fff" />
            </g>
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
        <div className="absolute flex flex-col items-center">
          <div className="relative overflow-hidden px-2">
            <span
              className="ms-word block select-none font-semibold leading-none"
              style={{
                fontFamily: '"Space Grotesk", "DM Sans", system-ui, sans-serif',
                fontSize: "13vmin",
                opacity: 0,
                animation: `ms-word 720ms var(--e) 1050ms forwards`,
              }}
            >
              megsy
            </span>
            <span
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)",
                mixBlendMode: "overlay",
                animation: `ms-gloss 650ms cubic-bezier(.4,0,.2,1) 1650ms both`,
              }}
            />
          </div>
          <span
            className="mt-3 h-px w-[26vmin] origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)",
              opacity: 0,
              animation: `ms-underline 700ms var(--e) 1400ms forwards`,
            }}
          />
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
          {done ? "انتهى — التطبيق يفتح فورًا" : "جارٍ التشغيل…"} · 2.2s
        </span>
      </div>
    </div>
  );
}
