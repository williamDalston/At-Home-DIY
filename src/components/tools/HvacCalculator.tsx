"use client";

import { useState } from "react";
import type { HvacData } from "@/lib/hvac-calculator";

interface HvacCalculatorProps {
  data: HvacData;
}

interface Result {
  btuRequired: number;
  tonsRequired: number;
  estimatedCost: number;
  lowEstimate: number;
  highEstimate: number;
}

export function HvacCalculator({ data }: HvacCalculatorProps) {
  const [squareFeet, setSquareFeet] = useState(1500);
  const [climateZone, setClimateZone] = useState("mixed");
  const [insulation, setInsulation] = useState("average");
  const [systemType, setSystemType] = useState("central-ac");
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    const climate = data.climateZones[climateZone];
    const ins = data.insulationLevels[insulation];
    const system = data.systemTypes[systemType];
    if (!climate || !ins || !system) return;

    const btuRequired = Math.round(
      squareFeet * climate.btuPerSqFt * ins.multiplier
    );
    const tonsRequired = Math.ceil((btuRequired / data.btuPerTon) * 2) / 2;
    const estimatedCost = Math.round(tonsRequired * system.costPerTon);

    setResult({
      btuRequired,
      tonsRequired,
      estimatedCost,
      lowEstimate: Math.round(estimatedCost * 0.85),
      highEstimate: Math.round(estimatedCost * 1.2),
    });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  const fmtNum = (n: number) =>
    new Intl.NumberFormat("en-US").format(n);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-hvac-sqft" className="block text-sm font-medium text-gray-700">
            Home Square Footage
          </label>
          <input
            id="calc-hvac-sqft"
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(Number(e.target.value))}
            min={200}
            max={10000}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex gap-2">
            {[1000, 1500, 2000, 3000].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSquareFeet(size)}
                className={`rounded-md px-3 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                  squareFeet === size
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {fmtNum(size)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="calc-hvac-climate" className="block text-sm font-medium text-gray-700">
            Climate Zone
          </label>
          <select
            id="calc-hvac-climate"
            value={climateZone}
            onChange={(e) => setClimateZone(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.climateZones).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-hvac-insulation" className="block text-sm font-medium text-gray-700">
            Insulation Level
          </label>
          <select
            id="calc-hvac-insulation"
            value={insulation}
            onChange={(e) => setInsulation(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.insulationLevels).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="calc-hvac-system" className="block text-sm font-medium text-gray-700">
            System Type
          </label>
          <select
            id="calc-hvac-system"
            value={systemType}
            onChange={(e) => setSystemType(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(data.systemTypes).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label} — {fmt(val.costPerTon)}/ton
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Calculate HVAC Size & Cost
      </button>

      {result && (
        <div className="rounded-xl border border-gray-200 bg-white p-6" aria-live="polite">
          <h3 className="text-xl font-bold text-gray-900">
            HVAC Sizing Results
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-sm text-gray-600">BTU Required</p>
              <p className="text-2xl font-bold text-blue-600">
                {fmtNum(result.btuRequired)}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-sm text-gray-600">System Size</p>
              <p className="text-2xl font-bold text-blue-600">
                {result.tonsRequired} ton
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-sm text-gray-600">Est. Cost</p>
              <p className="text-2xl font-bold text-blue-600">
                {fmt(result.estimatedCost)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Cost range: {fmt(result.lowEstimate)} — {fmt(result.highEstimate)}
            </p>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            This is an estimate based on typical sizing calculations. A professional HVAC contractor should perform a Manual J load calculation for your specific home.
          </p>

          <div className="mt-6">
            <a
              href="/contact?service=hvac"
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
