"use client";

import { useState } from "react";
import type { EnergyQuizData } from "@/lib/energy-quiz";
import { trackToolUsage } from "@/lib/analytics";

interface EnergyQuizProps {
  data: EnergyQuizData;
}

interface QuizResult {
  totalScore: number;
  title: string;
  tips: string[];
  estimatedAnnualSavings: number;
}

export function EnergyQuiz({ data }: EnergyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions = data.questions;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      trackToolUsage("energy-savings-quiz", "complete");
      const totalScore = Object.values(newAnswers).reduce((sum, s) => sum + s, 0);
      for (const rec of Object.values(data.recommendations)) {
        if (totalScore >= rec.range[0] && totalScore <= rec.range[1]) {
          setResult({ ...rec, totalScore });
          return;
        }
      }
      const high = data.recommendations.high;
      setResult({ ...high, totalScore });
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  if (result) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6" aria-live="polite">
        <h3 className="text-2xl font-bold text-gray-900">{result.title}</h3>
        <p className="mt-2 text-sm text-gray-500">
          Your score: {result.totalScore} / {questions.length * 4}
        </p>

        <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
          <p className="text-sm text-gray-600">Estimated Annual Savings Potential</p>
          <p className="text-3xl font-bold text-green-600">
            {fmt(result.estimatedAnnualSavings)}
          </p>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900">
            Recommendations
          </h4>
          <ul className="mt-3 space-y-3">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {i + 1}
                </span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={restart}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Retake Quiz
          </button>
          <a
            href="/contact?service=hvac"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Energy Audit Quote
          </a>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-xl font-bold text-gray-900">
          {question.question}
        </h3>

        <div className="mt-6 space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(question.id, option.score)}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          &larr; Previous question
        </button>
      )}
    </div>
  );
}
