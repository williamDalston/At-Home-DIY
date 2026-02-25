import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "noreply@fixitfinder.com";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "leads@fixitfinder.com";

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
  return {
    subject: `New Lead: ${data.service} — ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(data.phone)}</td></tr>` : ""}
        <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${escapeHtml(data.service)}</td></tr>
        ${data.city ? `<tr><td style="padding:8px;font-weight:bold;">City</td><td style="padding:8px;">${escapeHtml(data.city)}</td></tr>` : ""}
        ${data.contactMethod ? `<tr><td style="padding:8px;font-weight:bold;">Preferred Contact</td><td style="padding:8px;">${escapeHtml(data.contactMethod)}</td></tr>` : ""}
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    `,
  };
}

/** Format a newsletter signup notification */
export function formatNewsletterEmail(email: string): SendEmailOptions {
  return {
    subject: "New Newsletter Subscriber",
    html: `<p>New newsletter subscriber: <strong>${escapeHtml(email)}</strong></p>`,
  };
}

/** Format an ask-expert question as an HTML email */
export function formatExpertQuestionEmail(data: {
  name: string;
  email: string;
  question: string;
}): SendEmailOptions {
  return {
    subject: `Expert Question from ${data.name}`,
    replyTo: data.email,
    html: `
      <h2>New Expert Question</h2>
      <p><strong>From:</strong> ${escapeHtml(data.name)} (<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>)</p>
      <h3>Question</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(data.question)}</p>
    `,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
