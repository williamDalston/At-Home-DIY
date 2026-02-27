"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import type { Checklist } from "@/lib/project-checklist";

const STORAGE_KEY = "project-planner-checked";

function loadChecked(): Record<string, Set<number>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: Record<string, number[]> = JSON.parse(raw);
    const result: Record<string, Set<number>> = {};
    for (const [key, arr] of Object.entries(parsed)) {
      result[key] = new Set(arr);
    }
    return result;
  } catch {
    return {};
  }
}

function saveChecked(checked: Record<string, Set<number>>) {
  try {
    const serializable: Record<string, number[]> = {};
    for (const [key, set] of Object.entries(checked)) {
      serializable[key] = Array.from(set);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch {
    // localStorage unavailable
  }
}

interface ProjectPlannerProps {
  checklists: Checklist[];
}

const emptySubscribe = () => () => {};

export function ProjectPlanner({ checklists }: ProjectPlannerProps) {
  const [selectedId, setSelectedId] = useState(checklists[0]?.id ?? "");
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [checked, setChecked] = useState<Record<string, Set<number>>>(() =>
    typeof window !== "undefined" ? loadChecked() : {}
  );

  const currentChecklist = checklists.find((c) => c.id === selectedId);
  const currentChecked = checked[selectedId] ?? new Set<number>();
  const progress = currentChecklist
    ? (currentChecked.size / currentChecklist.items.length) * 100
    : 0;

  const persistChecked = useCallback((next: Record<string, Set<number>>) => {
    saveChecked(next);
    return next;
  }, []);

  const toggleItem = (index: number) => {
    setChecked((prev) => {
      const current = new Set(prev[selectedId] ?? []);
      if (current.has(index)) {
        current.delete(index);
      } else {
        current.add(index);
      }
      const next = { ...prev, [selectedId]: current };
      return persistChecked(next);
    });
  };

  const resetChecklist = () => {
    setChecked((prev) => {
      const next = { ...prev, [selectedId]: new Set<number>() };
      return persistChecked(next);
    });
  };

  if (!isClient) return null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Choose a Project
        </label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:max-w-md"
        >
          {checklists.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {currentChecklist && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {currentChecklist.title}
            </h3>
            <span className="text-sm text-gray-500">
              {currentChecked.size}/{currentChecklist.items.length} completed
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <ul className="mt-6 space-y-2">
            {currentChecklist.items.map((item, i) => {
              const isChecked = currentChecked.has(i);
              return (
                <li key={i}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50 ${
                      isChecked ? "bg-green-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(i)}
                      className="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span
                      className={`text-sm ${
                        isChecked
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex gap-4">
            <button
              onClick={resetChecklist}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Reset Checklist
            </button>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Find a Contractor
            </a>
          </div>

          {progress === 100 && (
            <div className="mt-4 rounded-lg bg-green-100 p-4 text-center">
              <p className="font-semibold text-green-800">
                All tasks completed! Your project checklist is done.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
