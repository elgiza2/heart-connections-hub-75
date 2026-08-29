/**
 * RegionStage — first onboarding panel.
 *
 * The visitor picks the edition they belong to. This is NOT just a UI language
 * switch: it also decides the billing gateway used for every future checkout
 * (Kashier — Vodafone Cash / local wallets / EGP cards — for the Arabic
 * edition, Dodo Payments — international cards & wallets — for the global one).
 */
import { Check, CreditCard, Globe, Smartphone, Wallet } from "lucide-react";
import type { PayRegion } from "@/lib/payRegion";

type Option = {
  id: PayRegion;
  badge: string;
  title: string;
  subtitle: string;
  dir: "rtl" | "ltr";
  methods: { icon: typeof Wallet; label: string }[];
};

const OPTIONS: Option[] = [
  {
    id: "arab",
    badge: "ع",
    title: "النسخة العربية",
    subtitle: "واجهة عربية بالكامل وطرق دفع محلية",
    dir: "rtl",
    methods: [
      { icon: Smartphone, label: "فودافون كاش" },
      { icon: Wallet, label: "المحافظ الإلكترونية" },
      { icon: CreditCard, label: "فيزا / ماستركارد بالجنيه" },
    ],
  },
  {
    id: "global",
    badge: "EN",
    title: "Global edition",
    subtitle: "English interface with worldwide payment methods",
    dir: "ltr",
    methods: [
      { icon: CreditCard, label: "Visa / Mastercard / Amex" },
      { icon: Wallet, label: "Apple Pay & Google Pay" },
      { icon: Globe, label: "International currencies" },
    ],
  },
];

export default function RegionStage({
  value,
  onChange,
}: {
  value: PayRegion;
  onChange: (region: PayRegion) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {OPTIONS.map((opt, i) => {
        const on = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            dir={opt.dir}
            aria-pressed={on}
            onClick={() => onChange(opt.id)}
            className="fs-up"
            style={{
              animationDelay: `${0.18 + i * 0.06}s`,
              textAlign: opt.dir === "rtl" ? "right" : "left",
              borderRadius: 20,
              padding: "16px 16px 14px",
              color: "#fff",
              cursor: "pointer",
              display: "block",
              width: "100%",
              border: on
                ? "1.5px solid rgba(255,255,255,0.85)"
                : "1px solid rgba(255,255,255,0.16)",
              background: on
                ? "linear-gradient(180deg, rgba(12,14,20,0.82) 0%, rgba(12,14,20,0.68) 100%)"
                : "linear-gradient(180deg, rgba(10,12,18,0.58) 0%, rgba(10,12,18,0.44) 100%)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              boxShadow: on
                ? "0 18px 40px -22px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.22)"
                : "0 12px 30px -24px rgba(0,0,0,0.7)",
              transition: "border-color .2s ease, background .25s ease, transform .12s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 40,
                  height: 40,
                  flex: "0 0 auto",
                  borderRadius: 14,
                  fontSize: opt.badge.length > 1 ? 13 : 18,
                  fontWeight: 700,
                  letterSpacing: opt.badge.length > 1 ? "0.02em" : 0,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {opt.badge}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {opt.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.72)",
                    marginTop: 3,
                    lineHeight: 1.4,
                  }}
                >
                  {opt.subtitle}
                </div>
              </div>

              <span
                aria-hidden
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 24,
                  height: 24,
                  flex: "0 0 auto",
                  borderRadius: 999,
                  background: on ? "#fff" : "transparent",
                  border: on ? "none" : "1.5px solid rgba(255,255,255,0.35)",
                  transition: "background .2s ease, border-color .2s ease",
                }}
              >
                {on && <Check size={14} strokeWidth={3} color="#0b0d12" />}
              </span>
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.10)",
                margin: "13px 0 11px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                justifyContent: "flex-start",
              }}
            >
              {opt.methods.map((m) => (
                <span
                  key={m.label}
                  dir={opt.dir}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 999,
                    padding: "6px 10px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.9)",
                    background: "rgba(255,255,255,0.09)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <m.icon size={13} strokeWidth={1.9} />
                  {m.label}
                </span>
              ))}
            </div>
          </button>
        );
      })}

      <p
        className="fs-up"
        style={{
          animationDelay: "0.34s",
          fontSize: 12,
          color: "rgba(255,255,255,0.62)",
          textAlign: "center",
          lineHeight: 1.55,
          marginTop: 2,
        }}
      >
        يحدد اختيارك لغة الموقع وطرق الدفع المتاحة لك
        <br />
        This sets your language and available payment methods
      </p>
    </div>
  );
}
