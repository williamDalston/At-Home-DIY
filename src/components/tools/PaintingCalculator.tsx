"use client";

import { useState } from "react";
import type { PaintingData } from "@/lib/painting-calculator";

interface PaintingCalculatorProps {
  data: PaintingData;
}

interface Result {
  gallonsNeeded: number;
  paintCost: number;
  prepCost: number;
  primerCost: number;
  laborCost: number;
  totalCost: number;
}

export function PaintingCalculator({ data }: PaintingCalculatorProps) {
  const [wallArea, setWallArea] = useState(800);
  const [paintType, setPaintType] = useState("eggshell");
  const [surfaceCondition, setSurfaceCondition] = useState("good");
  const [coats, setCoats] = useState(data.coatsDefault);
  const [includePrimer, setIncludePrimer] = useState(true);
  const [includeLabor, setIncludeLabor] = useState(true);
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const paint = data.paintTypes[paintType];
    const surface = data.surfaceConditions[surfaceCondition];
    if (!paint || !surface) return;

    const gallonsNeeded = Math.ceil((wallArea * coats) / paint.coverageSqFt);
    const paintCost = gallonsNeeded * paint.costPerGallon;
    const prepCost = wallArea * surface.prepCostPerSqFt;
    const primerCost = includePrimer ? wallArea * data.primerCostPerSqFt : 0;
    const laborCost = includeLabor ? wallArea * data.laborRatePerSqFt : 0;
    const totalCost = paintCost + prepCost + primerCost + laborCost;

    setResult({
      gallonsNeeded,
      paintCost: Math.round(paintCost),
      prepCost: Math.round(prepCost),
      primerCost: Math.round(primerCost),
      laborCost: Math.round(laborCost),
      totalCost: Math.round(totalCost),
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
          <label htmlFor="calc-paint-area" className="block text-sm font-medium text-gray-700">
            Total Wall Area (sq ft)
          </label>
          <input
            id="calc-paint-area"
            type="number"
            value={wallArea}
            onChange={(e) => setWallArea(Number(e.target.value))}
            min={50}
            max={10000}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex gap-2">
            {[400, 800, 1200, 2000].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setWallArea(size)}
                className={`rounded-md px-3 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                  wallArea === size
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
          <label htmlFor="calc-paint-type" className="block text-sm font-medium text-gray-700">
            Paint Type
          </label>
          <select
            id="calc-paint-type"
            value={paintType}
            onChange={(e) => setPaintType(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.paintTypes).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label} — {fmt(val.costPerGallon)}/gal
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-paint-surface" className="block text-sm font-medium text-gray-700">
            Surface Condition
          </label>
          <select
            id="calc-paint-surface"
            value={surfaceCondition}
            onChange={(e) => setSurfaceCondition(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.surfaceConditions).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-paint-coats" className="block text-sm font-medium text-gray-700">
            Number of Coats
          </label>
          <select
            id="calc-paint-coats"
            value={coats}
            onChange={(e) => setCoats(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 coat</option>
            <option value={2}>2 coats (recommended)</option>
            <option value={3}>3 coats</option>
          </select>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includePrimer}
              onChange={(e) => setIncludePrimer(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Include primer</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLabor}
              onChange={(e) => setIncludeLabor(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Include labor</span>
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
            Painting Cost Estimate
          </h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              {fmt(result.totalCost)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {result.gallonsNeeded} gallons of paint needed
          </p>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700">Breakdown</h4>
            <table className="mt-2 w-full text-sm">
              <thead className="sr-only">
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Paint ({result.gallonsNeeded} gal)</td>
                  <td className="py-2 text-right font-medium text-gray-900">
                    {fmt(result.paintCost)}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 text-gray-600">Surface Prep</td>
                  <td className="py-2 text-right font-medium text-gray-900">
                    {fmt(result.prepCost)}
                  </td>
                </tr>
                {result.primerCost > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Primer</td>
                    <td className="py-2 text-right font-medium text-gray-900">
                      {fmt(result.primerCost)}
                    </td>
                  </tr>
                )}
                {result.laborCost > 0 && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-600">Labor</td>
                    <td className="py-2 text-right font-medium text-gray-900">
                      {fmt(result.laborCost)}
                    </td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td className="py-2 text-gray-900">Total</td>
                  <td className="py-2 text-right text-gray-900">
                    {fmt(result.totalCost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Estimate based on national averages. Actual costs may vary by region and project specifics.
          </p>

          <div className="mt-6">
            <a
              href="/contact?service=painting"
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
