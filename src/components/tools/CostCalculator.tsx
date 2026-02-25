"use client";

import { useState } from "react";
import type { CalculatorData } from "@/lib/calculator";

interface CostCalculatorProps {
  data: CalculatorData;
}

interface Result {
  lowEstimate: number;
  average: number;
  highEstimate: number;
  breakdown: {
    materials: number;
    labor: number;
    removal: number;
    total: number;
  };
}

export function CostCalculator({ data }: CostCalculatorProps) {
  const [area, setArea] = useState(1500);
  const [material, setMaterial] = useState("asphalt");
  const [pitch, setPitch] = useState("medium");
  const [stories, setStories] = useState("1");
  const [removeOld, setRemoveOld] = useState(true);
  const [region, setRegion] = useState("average");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const mat = data.materials[material];
    const pit = data.pitchMultipliers[pitch];
    const sto = data.storyMultipliers[stories];
    const reg = data.regionalAdjustments[region];

    if (!mat || !pit || !sto || !reg) return;

    const baseMaterials = area * mat.baseCostPerSqFt * pit.multiplier * reg.multiplier;
    const labor = baseMaterials * 0.6 * sto.multiplier;
    const removal = removeOld ? area * data.removalCostPerSqFt : 0;
    const total = baseMaterials + labor + removal;

    setResult({
      lowEstimate: Math.round(total * 0.85),
      average: Math.round(total),
      highEstimate: Math.round(total * 1.2),
      breakdown: {
        materials: Math.round(baseMaterials),
        labor: Math.round(labor),
        removal: Math.round(removal),
        total: Math.round(total),
      },
    });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-roof-area" className="block text-sm font-medium text-gray-700">
            Roof Area (sq ft)
          </label>
          <input
            id="calc-roof-area"
            type="number"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            min={100}
            max={10000}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex gap-2">
            {[1000, 1500, 2000, 2500].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setArea(size)}
                className={`rounded-md px-3 py-1 text-xs font-medium ${
                  area === size
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="calc-roof-material" className="block text-sm font-medium text-gray-700">
            Roofing Material
          </label>
          <select
            id="calc-roof-material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.materials).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-roof-pitch" className="block text-sm font-medium text-gray-700">
            Roof Pitch
          </label>
          <select
            id="calc-roof-pitch"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.pitchMultipliers).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-roof-stories" className="block text-sm font-medium text-gray-700">
            Number of Stories
          </label>
          <select
            id="calc-roof-stories"
            value={stories}
            onChange={(e) => setStories(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.storyMultipliers).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-roof-region" className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <select
            id="calc-roof-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.regionalAdjustments).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="removeOld"
            checked={removeOld}
            onChange={(e) => setRemoveOld(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="removeOld" className="text-sm font-medium text-gray-700">
            Remove old roof
          </label>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Calculate Estimate
      </button>

      {result && (
        <div className="rounded-xl border border-gray-200 bg-white p-6" aria-live="polite">
          <h3 className="text-xl font-bold text-gray-900">
            Estimated Cost Range
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {fmt(result.lowEstimate)} — {fmt(result.highEstimate)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Average estimate: {fmt(result.average)}
          </p>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700">Breakdown</h4>
            <table className="mt-2 w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Materials</td>
                  <td className="py-2 text-right font-medium text-gray-900">
                    {fmt(result.breakdown.materials)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Labor</td>
                  <td className="py-2 text-right font-medium text-gray-900">
                    {fmt(result.breakdown.labor)}
                  </td>
                </tr>
                {result.breakdown.removal > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Old Roof Removal</td>
                    <td className="py-2 text-right font-medium text-gray-900">
                      {fmt(result.breakdown.removal)}
                    </td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td className="py-2 text-gray-900">Total</td>
                  <td className="py-2 text-right text-gray-900">
                    {fmt(result.breakdown.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            This is an estimate based on national averages. Actual costs may vary. Get an exact quote from a local professional.
          </p>

          <div className="mt-6">
            <a
              href="/contact?service=roofing"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get a Professional Quote
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
