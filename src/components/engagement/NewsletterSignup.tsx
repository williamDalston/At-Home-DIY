"use client";

import { useState } from "react";
import { newsletterSchema } from "@/lib/validators";

interface NewsletterSignupProps {
  variant?: "inline" | "banner" | "footer";
}

export function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setFieldError(result.error.issues[0].message);
      return;
    }

    setFieldError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for confirmation.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const idSuffix = variant;
  const inputId = `newsletter-email-${idSuffix}`;
  const errorId = `newsletter-error-${idSuffix}`;
  const hasError = !!fieldError || status === "error";

  if (variant === "footer") {
    return (
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
          Newsletter
        </h4>
        <p className="mt-2 text-sm text-gray-600">
          Get DIY tips and home improvement deals in your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2" noValidate>
          <label htmlFor={inputId} className="sr-only">Email address</label>
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Join"}
          </button>
        </form>
        {fieldError && (
          <p id={errorId} className="mt-2 text-xs text-red-600" role="alert">{fieldError}</p>
        )}
        {status === "success" && (
          <p className="mt-2 text-xs text-green-600" role="alert">{message}</p>
        )}
        {status === "error" && (
          <p id={errorId} className="mt-2 text-xs text-red-600" role="alert">{message}</p>
        )}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="rounded-xl bg-blue-50 p-6 sm:p-8">
        <div className="mx-auto max-w-xl text-center">
          <h3 className="text-xl font-bold text-gray-900">
            Stay Up to Date
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get weekly DIY tips, cost-saving guides, and exclusive deals delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center" noValidate>
            <label htmlFor={inputId} className="sr-only">Email address</label>
            <input
              id={inputId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:w-72"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
          {fieldError && (
            <p id={errorId} className="mt-3 text-sm text-red-600" role="alert">{fieldError}</p>
          )}
          {status === "success" && (
            <p className="mt-3 text-sm text-green-600" role="alert">{message}</p>
          )}
          {status === "error" && (
            <p id={errorId} className="mt-3 text-sm text-red-600" role="alert">{message}</p>
          )}
          <p className="mt-3 text-xs text-gray-400">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // inline variant
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900">
        Get DIY Tips in Your Inbox
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        Weekly guides, cost-saving tips, and project inspiration.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-3" noValidate>
        <label htmlFor={inputId} className="sr-only">Email address</label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {fieldError && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">{fieldError}</p>
      )}
      {status === "success" && (
        <p className="mt-2 text-sm text-green-600" role="alert">{message}</p>
      )}
      {status === "error" && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">{message}</p>
      )}
    </div>
  );
}
