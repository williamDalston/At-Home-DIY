"use client";

import { useState, useSyncExternalStore } from "react";

function getConsent() {
  if (typeof window === "undefined") return "unknown";
  return localStorage.getItem("cookie-consent") ?? "";
}

const emptySubscribe = () => () => {};

export function CookieConsent() {
  const consent = useSyncExternalStore(emptySubscribe, getConsent, () => "unknown");
  const [dismissed, setDismissed] = useState(false);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setDismissed(true);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setDismissed(true);
  };

  if (dismissed || consent === "unknown" || consent !== "") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row">
        <p className="flex-1 text-sm text-gray-600">
          We use cookies to improve your experience and analyze site traffic.
          Read our{" "}
          <a href="/privacy-policy" className="underline hover:text-blue-600">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
