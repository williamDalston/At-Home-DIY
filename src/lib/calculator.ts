import fs from "fs";
import path from "path";

export interface CalculatorData {
  materials: Record<
    string,
    { label: string; baseCostPerSqFt: number; description: string }
  >;
  pitchMultipliers: Record<string, { label: string; multiplier: number }>;
  storyMultipliers: Record<string, { label: string; multiplier: number }>;
  regionalAdjustments: Record<string, { label: string; multiplier: number }>;
  removalCostPerSqFt: number;
}

export function getCalculatorData(): CalculatorData {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "calculator-data.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CalculatorData;
}

export interface CalculatorInput {
  area: number;
  material: string;
  pitch: string;
  stories: string;
  removeOld: boolean;
  region: string;
}

export interface CalculatorResult {
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

export function calculateRoofingCost(
  input: CalculatorInput,
  data: CalculatorData
): CalculatorResult {
  const material = data.materials[input.material];
  const pitch = data.pitchMultipliers[input.pitch];
  const stories = data.storyMultipliers[input.stories];
  const region = data.regionalAdjustments[input.region];

  if (!material || !pitch || !stories || !region) {
    return {
      lowEstimate: 0,
      average: 0,
      highEstimate: 0,
      breakdown: { materials: 0, labor: 0, removal: 0, total: 0 },
    };
  }

  const baseMaterials =
    input.area * material.baseCostPerSqFt * pitch.multiplier * region.multiplier;
  const labor = baseMaterials * 0.6 * stories.multiplier;
  const removal = input.removeOld ? input.area * data.removalCostPerSqFt : 0;
  const total = baseMaterials + labor + removal;

  return {
    lowEstimate: Math.round(total * 0.85),
    average: Math.round(total),
    highEstimate: Math.round(total * 1.2),
    breakdown: {
      materials: Math.round(baseMaterials),
      labor: Math.round(labor),
      removal: Math.round(removal),
      total: Math.round(total),
    },
  };
}
