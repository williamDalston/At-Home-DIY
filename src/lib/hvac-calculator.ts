import fs from "fs";
import path from "path";

export interface HvacData {
  climateZones: Record<
    string,
    { label: string; btuPerSqFt: number }
  >;
  insulationLevels: Record<
    string,
    { label: string; multiplier: number }
  >;
  systemTypes: Record<
    string,
    { label: string; costPerTon: number }
  >;
  btuPerTon: number;
}

export function getHvacData(): HvacData {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "hvac-calculator-data.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as HvacData;
}

export interface HvacInput {
  squareFeet: number;
  climateZone: string;
  insulation: string;
  systemType: string;
}

export interface HvacResult {
  btuRequired: number;
  tonsRequired: number;
  estimatedCost: number;
  lowEstimate: number;
  highEstimate: number;
}

export function calculateHvacSize(
  input: HvacInput,
  data: HvacData
): HvacResult {
  const climate = data.climateZones[input.climateZone];
  const insulation = data.insulationLevels[input.insulation];
  const system = data.systemTypes[input.systemType];

  if (!climate || !insulation || !system) {
    return {
      btuRequired: 0,
      tonsRequired: 0,
      estimatedCost: 0,
      lowEstimate: 0,
      highEstimate: 0,
    };
  }

  const btuRequired = Math.round(
    input.squareFeet * climate.btuPerSqFt * insulation.multiplier
  );
  const tonsRequired = Math.ceil((btuRequired / data.btuPerTon) * 2) / 2; // round up to nearest 0.5 ton
  const estimatedCost = Math.round(tonsRequired * system.costPerTon);

  return {
    btuRequired,
    tonsRequired,
    estimatedCost,
    lowEstimate: Math.round(estimatedCost * 0.85),
    highEstimate: Math.round(estimatedCost * 1.2),
  };
}
