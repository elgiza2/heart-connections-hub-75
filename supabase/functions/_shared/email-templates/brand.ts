/** Megsy branded email shell — luxury dark aesthetic:
 *  full-bleed motion hero (HTML5 video with animated-GIF/poster fallback),
 *  frosted-glass content card, Instrument Serif headline, white pill CTA
 *  and a full navigation footer. Used for every outgoing email. */

const SITE = "https://megsyai.com";
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4";
const HERO_GIF = `${SITE}/email/hero.gif`;
const HERO_POSTER = `${SITE}/email/hero-poster.jpg`;

export interface BrandEmailInput {
  title: string;
  preheader?: string | null;
  bodyHtml?: string | null;
  bodyText?: string | null;
  code?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  footerNote?: string | null;
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function textToHtml(text: string) {
  return text
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.72);">${esc(
          p,
        ).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");
}

const FOOTER_LINKS: Array<[string, string]> = [
  ["Home", `${SITE}/`],
  ["Chat", `${SITE}/chat`],
  ["Pricing", `${SITE}/pricing`],
  ["Support", `${SITE}/settings`],
];

export function renderBrandEmail(input: BrandEmailInput): string {
  const body =
    input.bodyHtml && input.bodyHtml.trim() ? input.bodyHtml : textToHtml(input.bodyText || "");

  const codeBlock = input.code
    ? `<div style="margin:6px 0 28px;padding:20px 24px;border:1px solid rgba(255,255,255,0.22);border-radius:16px;background:rgba(255,255,255,0.06);text-align:center;">
         <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:34px;letter-spacing:10px;color:#ffffff;font-weight:600;">${esc(
           input.code,
         )}</div>
       </div>`
    : "";

  const cta =
    input.ctaUrl && input.ctaLabel
      ? `<a href="${esc(
          input.ctaUrl,
        )}" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#000000;font-size:15px;font-weight:500;text-decoration:none;border-radius:999px;">${esc(
          input.ctaLabel,
        )}</a>`
      : "";

  const footerNav = FOOTER_LINKS.map(
    ([label, href]) =>
      `<a href="${href}" style="color:rgba(255,255,255,0.62);text-decoration:none;font-size:13px;padding:0 10px;">${label}</a>`,
  ).join('<span style="color:rgba(255,255,255,0.18);">|</span>');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    <title>${esc(input.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#000000;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(
      input.preheader || input.title,
    )}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:32px 16px 40px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

            <!-- motion hero: real video where supported, animated GIF elsewhere -->
            <tr>
              <td style="border-radius:26px 26px 0 0;overflow:hidden;background:#000000;">
                <a href="${SITE}" style="text-decoration:none;display:block;">
                  <video src="${HERO_VIDEO}" poster="${HERO_POSTER}" autoplay muted loop playsinline width="600" style="display:block;width:100%;height:260px;object-fit:cover;border:0;">
                    <img src="${HERO_GIF}" width="600" alt="Megsy" style="display:block;width:100%;height:260px;object-fit:cover;border:0;" />
                  </video>
                </a>
              </td>
            </tr>

            <!-- glass card -->
            <tr>
              <td style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-top:0;border-radius:0 0 26px 26px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:24px 32px 0;">
                      <span style="color:#ffffff;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;font-size:19px;font-weight:600;letter-spacing:-0.02em;">Megsy</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px 32px 40px;">
                      <h1 style="margin:0 0 16px;font-family:'Instrument Serif',Georgia,'Times New Roman',serif;font-weight:400;color:#ffffff;font-size:40px;line-height:1.05;">${esc(
                        input.title,
                      )}</h1>
                      ${
                        input.preheader
                          ? `<p style="margin:0 0 22px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.72);">${esc(
                              input.preheader,
                            )}</p>`
                          : ""
                      }
                      <div style="font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;">${body}</div>
                      ${codeBlock}
                      ${cta}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td align="center" style="padding:28px 24px 8px;">
                <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:2;">${footerNav}</div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 24px 0;">
                <p style="margin:0 0 6px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:12px;line-height:1.7;color:rgba(255,255,255,0.42);">${esc(
                  input.footerNote || "You are receiving this email because you have a Megsy account.",
                )}</p>
                <p style="margin:0;font-family:ui-sans-serif,system-ui,sans-serif;font-size:12px;color:rgba(255,255,255,0.32);">© ${new Date().getFullYear()} Megsy · <a href="${SITE}" style="color:rgba(255,255,255,0.5);text-decoration:none;">megsyai.com</a></p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Verification / OTP email. */
export function renderCodeEmail(code: string, purpose = "Verify your email") {
  return renderBrandEmail({
    title: purpose,
    preheader: "Use the code below to continue. It expires shortly.",
    code,
    footerNote: "If you did not request this code, you can safely ignore this email.",
  });
}
