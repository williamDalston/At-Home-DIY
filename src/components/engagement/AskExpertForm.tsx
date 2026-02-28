"use client";

import { useState } from "react";
import { askExpertSchema } from "@/lib/validators";
import { trackAskExpert } from "@/lib/analytics";

interface FieldErrors {
  name?: string;
  email?: string;
  question?: string;
}

export function AskExpertForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = askExpertSchema.safeParse({ name, email, question });
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/ask-expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setQuestion("");
        trackAskExpert();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gray-200 bg-green-50 p-6 text-center" aria-live="polite">
        <h3 className="text-lg font-bold text-green-800">Question Submitted!</h3>
        <p className="mt-2 text-sm text-green-700">
          Thanks for your question. Our experts will respond within 24-48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900">Ask an Expert</h3>
      <p className="mt-1 text-sm text-gray-600">
        Have a question about this topic? Our experts are here to help.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="expert-name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="expert-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "expert-name-error" : undefined}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {fieldErrors.name && (
              <p id="expert-name-error" className="mt-1 text-xs text-red-600" role="alert">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="expert-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="expert-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "expert-email-error" : undefined}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {fieldErrors.email && (
              <p id="expert-email-error" className="mt-1 text-xs text-red-600" role="alert">{fieldErrors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="expert-question" className="block text-sm font-medium text-gray-700">Your Question</label>
          <textarea
            id="expert-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            aria-invalid={!!fieldErrors.question}
            aria-describedby={fieldErrors.question ? "expert-question-error" : undefined}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {fieldErrors.question && (
            <p id="expert-question-error" className="mt-1 text-xs text-red-600" role="alert">{fieldErrors.question}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit Question"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
