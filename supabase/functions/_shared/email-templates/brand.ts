/** Megsy branded email shell — luxury dark aesthetic (Instrument Serif headline,
 *  pure black canvas, white pill CTA). Used for every outgoing email: code
 *  verification, notifications, and plain user/AI mail. */

export interface BrandEmailInput {
  /** Serif headline at the top of the card. */
  title: string;
  /** Optional short line under the headline. */
  preheader?: string | null;
  /** Main body — plain text (newlines become paragraphs) or raw HTML. */
  bodyHtml?: string | null;
  bodyText?: string | null;
  /** Big monospaced verification code, when applicable. */
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
        `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);">${esc(
          p,
        ).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");
}

export function renderBrandEmail(input: BrandEmailInput): string {
  const body =
    input.bodyHtml && input.bodyHtml.trim()
      ? input.bodyHtml
      : textToHtml(input.bodyText || "");

  const codeBlock = input.code
    ? `<div style="margin:8px 0 28px;padding:20px 24px;border:1px solid rgba(255,255,255,0.18);border-radius:16px;background:#0a0a0a;text-align:center;">
         <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:34px;letter-spacing:10px;color:#ffffff;font-weight:600;">${esc(
           input.code,
         )}</div>
       </div>`
    : "";

  const cta =
    input.ctaUrl && input.ctaLabel
      ? `<a href="${esc(input.ctaUrl)}" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#000000;font-size:15px;font-weight:500;text-decoration:none;border-radius:999px;">${esc(
          input.ctaLabel,
        )}</a>`
      : "";

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
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#000000;border:1px solid rgba(255,255,255,0.12);border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:26px 32px;border-bottom:1px solid rgba(255,255,255,0.10);">
                <span style="color:#ffffff;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.02em;">Megsy</span>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 32px 44px;">
                <h1 style="margin:0 0 18px;font-family:'Instrument Serif',Georgia,'Times New Roman',serif;font-weight:400;color:#ffffff;font-size:40px;line-height:1.05;">${esc(
                  input.title,
                )}</h1>
                ${
                  input.preheader
                    ? `<p style="margin:0 0 24px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.7);">${esc(
                        input.preheader,
                      )}</p>`
                    : ""
                }
                <div style="font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;">${body}</div>
                ${codeBlock}
                ${cta}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid rgba(255,255,255,0.10);">
                <p style="margin:0;font-family:ui-sans-serif,system-ui,sans-serif;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.45);">${esc(
                  input.footerNote || "Sent by Megsy · megsyai.com",
                )}</p>
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
    bodyText: "",
    code,
    footerNote: "If you did not request this code, you can safely ignore this email.",
  });
}
