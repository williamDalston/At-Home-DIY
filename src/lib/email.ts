import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "info@alstonanalytics.com";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "info@alstonanalytics.com";
const SITE_URL = process.env.SITE_URL || "https://www.fixitfinder.space";

interface SendEmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send an email via Resend. Falls back to console.log if RESEND_API_KEY is not set.
 * Returns true if the email was sent (or logged) successfully.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  if (!resend) {
    console.log("[Email stub — set RESEND_API_KEY to send real emails]");
    console.log(`  To: ${ADMIN_EMAIL}`);
    console.log(`  Subject: ${options.subject}`);
    console.log(`  Reply-To: ${options.replyTo || "n/a"}`);
    console.log(`  Body: ${options.html.replace(/<[^>]+>/g, " ").trim().slice(0, 200)}...`);
    return true;
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  if (error) {
    console.error("[Email error]", error);
    return false;
  }

  return true;
}

function brandedWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#2563eb,#14b8a6);border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;">
          <a href="${SITE_URL}" style="color:#ffffff;font-size:22px;font-weight:700;text-decoration:none;letter-spacing:-0.5px;">FixIt Finder</a>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:#ffffff;padding:32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
          ${content}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">
            &copy; ${new Date().getFullYear()} FixIt Finder &middot;
            <a href="${SITE_URL}" style="color:#2563eb;text-decoration:none;">fixitfinder.space</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Format a contact form submission as an HTML email */
export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  city?: string;
  message: string;
  contactMethod?: string;
}): SendEmailOptions {
  const rows = [
    { label: "Name", value: escapeHtml(data.name) },
    { label: "Email", value: `<a href="mailto:${escapeHtml(data.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(data.email)}</a>` },
    ...(data.phone ? [{ label: "Phone", value: escapeHtml(data.phone) }] : []),
    { label: "Service", value: `<span style="display:inline-block;background:#eff6ff;color:#1d4ed8;padding:2px 10px;border-radius:12px;font-size:13px;font-weight:600;">${escapeHtml(data.service)}</span>` },
    ...(data.city ? [{ label: "City / ZIP", value: escapeHtml(data.city) }] : []),
    ...(data.contactMethod ? [{ label: "Preferred Contact", value: escapeHtml(data.contactMethod) }] : []),
  ];

  const tableRows = rows
    .map(
      (r) =>
        `<tr>
          <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#6b7280;white-space:nowrap;border-bottom:1px solid #f3f4f6;">${r.label}</td>
          <td style="padding:10px 12px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${r.value}</td>
        </tr>`
    )
    .join("");

  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111827;">New Lead Received</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">A new contact form submission has arrived.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      ${tableRows}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #2563eb;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;color:#374151;white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.message)}</p>
    </div>`;

  return {
    subject: `New Lead: ${data.service} — ${data.name}`,
    replyTo: data.email,
    html: brandedWrapper(content),
  };
}

/** Format a newsletter signup notification */
export function formatNewsletterEmail(email: string): SendEmailOptions {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111827;">New Subscriber</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">Someone just subscribed to the newsletter.</p>
    <div style="padding:16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;text-align:center;">
      <p style="margin:0;font-size:16px;font-weight:600;color:#166534;">${escapeHtml(email)}</p>
    </div>`;

  return {
    subject: "New Newsletter Subscriber",
    html: brandedWrapper(content),
  };
}

/** Format an ask-expert question as an HTML email */
export function formatExpertQuestionEmail(data: {
  name: string;
  email: string;
  question: string;
}): SendEmailOptions {
  const content = `
    <h2 style="margin:0 0 4px;font-size:20px;color:#111827;">Expert Question</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">A homeowner submitted a question.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#6b7280;border-bottom:1px solid #f3f4f6;">From</td>
        <td style="padding:10px 12px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#6b7280;">Email</td>
        <td style="padding:10px 12px;font-size:14px;color:#111827;"><a href="mailto:${escapeHtml(data.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(data.email)}</a></td>
      </tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #14b8a6;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Question</p>
      <p style="margin:0;font-size:14px;color:#374151;white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.question)}</p>
    </div>`;

  return {
    subject: `Expert Question from ${data.name}`,
    replyTo: data.email,
    html: brandedWrapper(content),
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
