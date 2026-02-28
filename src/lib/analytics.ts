/**
 * GA4 custom event helpers.
 *
 * These fire gtag events when GA is loaded; they silently no-op otherwise,
 * so they are safe to call unconditionally on the client.
 */

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

function sendEvent({ action, category, label, value, ...rest }: GtagEvent) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}

// ── Form submissions ────────────────────────────────────────────────────

export function trackQuoteRequest(service?: string, city?: string) {
  sendEvent({
    action: "quote_request",
    category: "engagement",
    label: [service, city].filter(Boolean).join(" — ") || undefined,
  });
}

export function trackNewsletterSignup(variant: string) {
  sendEvent({
    action: "newsletter_signup",
    category: "engagement",
    label: variant,
  });
}

export function trackAskExpert() {
  sendEvent({
    action: "ask_expert_submit",
    category: "engagement",
  });
}

// ── Tool usage ──────────────────────────────────────────────────────────

export function trackToolUsage(tool: string, action: string = "calculate") {
  sendEvent({
    action: "tool_usage",
    category: "tools",
    label: tool,
    tool_action: action,
  });
}

// ── Navigation & discovery ──────────────────────────────────────────────

export function trackServiceLocationClick(service: string, location: string) {
  sendEvent({
    action: "service_location_click",
    category: "navigation",
    label: `${service} — ${location}`,
  });
}

export function trackRelatedPostClick(fromSlug: string, toSlug: string) {
  sendEvent({
    action: "related_post_click",
    category: "navigation",
    label: `${fromSlug} → ${toSlug}`,
  });
}
