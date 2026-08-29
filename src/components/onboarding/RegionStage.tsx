/**
 * RegionStage — first onboarding panel.
 *
 * The visitor picks the edition they belong to. This is NOT just a UI language
 * switch: it also decides the billing gateway used for every future checkout
 * (Kashier — Vodafone Cash / local wallets / EGP cards — for the Arabic
 * edition, Dodo Payments — international cards & wallets — for the global one).
 *
 * Glass segmented switch + a live comparison sheet, so the two editions are
 * read side by side instead of as two competing blocks.
 */
import { Check, Coins, CreditCard, Globe, Languages, Smartphone } from "lucide-react";
import type { PayRegion } from "@/lib/payRegion";

type Edition = {
  id: PayRegion;
  tab: string;
  dir: "rtl" | "ltr";
  rows: { icon: typeof Globe; label: string; value: string }[];
  note: string;
};

const EDITIONS: Edition[] = [
  {
    id: "arab",
    tab: "العربية",
    dir: "rtl",
    rows: [
      { icon: Languages, label: "الواجهة", value: "عربي بالكامل" },
      { icon: Smartphone, label: "الدفع", value: "فودافون كاش والمحافظ" },
      { icon: CreditCard, label: "البطاقات", value: "فيزا / ماستركارد محلية" },
      { icon: Coins, label: "العملة", value: "الجنيه المصري (EGP)" },
    ],
    note: "يحدد اختيارك لغة الموقع وطرق الدفع المتاحة لك",
  },
  {
    id: "global",
    tab: "Global",
    dir: "ltr",
    rows: [
      { icon: Languages, label: "Interface", value: "English" },
      { icon: CreditCard, label: "Cards", value: "Visa / Mastercard / Amex" },
      { icon: Smartphone, label: "Wallets", value: "Apple Pay & Google Pay" },
      { icon: Globe, label: "Currency", value: "USD & international" },
    ],
    note: "This sets your language and available payment methods",
  },
];

export default function RegionStage({
  value,
  onChange,
}: {
  value: PayRegion;
  onChange: (region: PayRegion) => void;
}) {
  const activeIndex = Math.max(
    0,
    EDITIONS.findIndex((e) => e.id === value),
  );
  const active = EDITIONS[activeIndex] ?? EDITIONS[0];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* segmented glass switch */}
      <div
        className="fs-up fs-glass"
        role="group"
        aria-label="Edition"
        style={{
          animationDelay: "0.18s",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 999,
          padding: 5,
          overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        {EDITIONS.map((e) => {
          const on = e.id === active.id;
          return (
            <button
              key={e.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(e.id)}
              style={{
                position: "relative",
                zIndex: 1,
                border: 0,
                background: on ? "rgba(255,255,255,0.94)" : "transparent",
                boxShadow: on ? "0 8px 22px -12px rgba(0,0,0,0.9)" : "none",
                cursor: "pointer",
                padding: "11px 8px",
                borderRadius: 999,
                fontSize: 14.5,
                fontWeight: 650,
                letterSpacing: "-0.01em",
                color: on ? "#0b0d12" : "rgba(255,255,255,0.78)",
                transition: "color .28s ease, background .28s ease, box-shadow .28s ease",

                WebkitTapHighlightColor: "transparent",
              }}
            >
              {e.tab}
            </button>
          );
        })}
      </div>

      {/* comparison sheet for the active edition */}
      <div
        key={active.id}
        dir={active.dir}
        className="fs-up fs-glass"
        style={{
          animationDelay: "0.06s",
          borderRadius: 22,
          padding: "6px 16px 14px",
          color: "#fff",
          textAlign: active.dir === "rtl" ? "right" : "left",
        }}
      >
        {active.rows.map((r, i) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "13px 0",
              borderBottom:
                i === active.rows.length - 1 ? "none" : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "grid",
                placeItems: "center",
                width: 30,
                height: 30,
                flex: "0 0 auto",
                borderRadius: 10,
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <r.icon size={15} strokeWidth={1.8} color="rgba(255,255,255,0.92)" />
            </span>
            <span
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.6)",
                flex: "0 0 auto",
                minWidth: 74,
              }}
            >
              {r.label}
            </span>
            <span
              style={{
                fontSize: 13.5,
                fontWeight: 600,
                flex: 1,
                textAlign: active.dir === "rtl" ? "left" : "right",
              }}
            >
              {r.value}
            </span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            padding: "9px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.10)",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "grid",
              placeItems: "center",
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#fff",
              flex: "0 0 auto",
            }}
          >
            <Check size={12} strokeWidth={3} color="#0b0d12" />
          </span>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.88)" }}>{active.note}</span>
        </div>
      </div>
    </div>
  );
}
