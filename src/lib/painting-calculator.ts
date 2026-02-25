import fs from "fs";
import path from "path";

export interface PaintingData {
  paintTypes: Record<
    string,
    { label: string; costPerGallon: number; coverageSqFt: number }
  >;
  surfaceConditions: Record<
    string,
    { label: string; prepCostPerSqFt: number }
  >;
  laborRatePerSqFt: number;
  primerCostPerSqFt: number;
  coatsDefault: number;
}

export function getPaintingData(): PaintingData {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "painting-calculator-data.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as PaintingData;
}

export interface PaintingInput {
  wallArea: number;
  paintType: string;
  surfaceCondition: string;
  coats: number;
  includePrimer: boolean;
  includeLabor: boolean;
}

export interface PaintingResult {
  gallonsNeeded: number;
  paintCost: number;
  prepCost: number;
  primerCost: number;
  laborCost: number;
  totalCost: number;
}

export function calculatePaintingCost(
  input: PaintingInput,
  data: PaintingData
): PaintingResult {
  const paint = data.paintTypes[input.paintType];
  const surface = data.surfaceConditions[input.surfaceCondition];

  if (!paint || !surface) {
    return {
      gallonsNeeded: 0,
      paintCost: 0,
      prepCost: 0,
      primerCost: 0,
      laborCost: 0,
      totalCost: 0,
    };
  }

  const gallonsNeeded = Math.ceil(
    (input.wallArea * input.coats) / paint.coverageSqFt
  );
  const paintCost = gallonsNeeded * paint.costPerGallon;
  const prepCost = input.wallArea * surface.prepCostPerSqFt;
  const primerCost = input.includePrimer
    ? input.wallArea * data.primerCostPerSqFt
    : 0;
  const laborCost = input.includeLabor
    ? input.wallArea * data.laborRatePerSqFt
    : 0;
  const totalCost = paintCost + prepCost + primerCost + laborCost;

  return {
    gallonsNeeded,
    paintCost: Math.round(paintCost),
    prepCost: Math.round(prepCost),
    primerCost: Math.round(primerCost),
    laborCost: Math.round(laborCost),
    totalCost: Math.round(totalCost),
  };
}
